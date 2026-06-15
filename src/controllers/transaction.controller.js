const transactionModel = require("../models/transaction.model")
const accountModel = require("../models/account.model")
const mongoose = require("mongoose")
const ledgerModel = require("../models/ledger.model")
const emailService = require("../services/email.service")


/**
 * - create a new transaction
 * THE 10 - STEP TRANSFER FLOW
 * 1. validate request
 * 2.validate idempotency key
 * 3.check account status
 * 4.Derive sender balance from ledger
 * 5. Create transaction with PENDING status
 * 6. Create DEBIT entry in ledger
 * 7. Create CREDIT entry in ledger
 * 8.  Mark transaction as COMPLETED
 * 9. Commit MongoDB session
 * 10. Send response / send email notification
 */

async function createTransaction(req,res){

    const session = await mongoose.startSession()

    try{

        /**
         * 1. validate request
         */

        const {fromAccount,toAccount,amount,idempotencyKey} = req.body

        if(!fromAccount || !toAccount || !amount || !idempotencyKey){
            return res.status(400).json({
                message:"Missing required fields: fromAccount, toAccount, amount and idempotencyKey are required",
            })
        }

        const fromUserAccount = await accountModel.findOne({
            _id:fromAccount,
        })

        const toUserAccount = await accountModel.findOne({
            _id:toAccount,
        })

        if(!fromUserAccount || !toUserAccount){
            return res.status(404).json({
                message:"Invalid fromAccount or toAccount, account not found",
            })
        }

        /**
         * 2. validate idempotency key
         */

        const isTransactionAlreadyExists = await transactionModel.findOne({
            idempotencyKey: idempotencyKey
        })

        if(isTransactionAlreadyExists){

            if(isTransactionAlreadyExists.status === "COMPLETED"){
                return res.status(200).json({
                    message:"Transaction already Processed",
                    transaction:isTransactionAlreadyExists
                })
            }

            if(isTransactionAlreadyExists.status === "PENDING"){
                return res.status(202).json({
                    message:"Transaction is still being processed, please wait for a while",
                    transaction:isTransactionAlreadyExists
                })
            }

            if(isTransactionAlreadyExists.status === "FAILED"){
                return res.status(500).json({
                    message:"Transaction failed, please try again",
                    transaction:isTransactionAlreadyExists
                })
            }

            if(isTransactionAlreadyExists.status === "REVERSED"){
                return res.status(500).json({
                    message:"Transaction has been reversed, please try again",
                    transaction:isTransactionAlreadyExists
                })
            }
        }

        /**
         * 3. check account status
         */

        if(fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE"){
            return res.status(400).json({
                message:"Both fromAccount and toAccount must be ACTIVE to process the transaction",
            })
        }

        /**
         * 4. Derive sender balance from ledger
         */

        const balance = await fromUserAccount.getBalance()

        if(balance < amount){
            return res.status(400).json({
                message:`Insufficient balance . Current balance is ${balance} but transaction amount is ${amount}`,
            })
        }

        /**
         * 5. Create transaction with PENDING status
         */

        session.startTransaction()

        const transactions = await transactionModel.create([{
            fromAccount: fromAccount,
            toAccount: toAccount,
            amount: amount,
            idempotencyKey: idempotencyKey,
            status: "PENDING",
        }], { session })

        const transaction = transactions[0]

        /**
         * 6. Create DEBIT entry in ledger
         */

        await ledgerModel.create([{
            account: fromAccount,
            amount: amount,
            transaction: transaction._id,
            type: "DEBIT",
        }], { session })

         await (async () => {
          return new Promise((resolve) => setTimeout(resolve, 1000))
         })();

        /**
         * 7. Create CREDIT entry in ledger
         */

        await ledgerModel.create([{
            account: toAccount,
            amount: amount,
            transaction: transaction._id,
            type: "CREDIT",
        }], { session })

        /**
         * 8. Mark transaction as COMPLETED
         */

        transaction.status = "COMPLETED"

        await transaction.save({ session })

        /**
         * 9. Commit MongoDB session
         */

        await session.commitTransaction()

        session.endSession()

        /**
         * 10. Send response / send email notification
         */

        await emailService.sendTransactionEmail(
            req.user.email,
            req.user.name,
            req.body.amount,
            fromUserAccount.currency,
            toUserAccount._id
        )

        return res.status(201).json({
            message:"Transaction processed successfully",
            transaction:transaction,
        })

    } catch(error){

        await session.abortTransaction()

        session.endSession()

        console.log(error)

        return res.status(500).json({
            message:"Transaction failed",
            error:error.message,
        })
    }
}

async function createInitialFundsTransaction(req,res){

    const {toAccount,amount,idempotencyKey} = req.body

    if(!toAccount || !amount || !idempotencyKey){
        return res.status(400).json({
            message:"Missing required fields: toAccount, amount and idempotencyKey are required",
        })
    }

    const toUserAccount = await accountModel.findOne({
        _id:toAccount,
    })

    if(!toUserAccount){
        return res.status(404).json({
            message:"Invalid toAccount, account not found",
        })
    }

    const fromUserAccount = await accountModel.findOne({
        user:req.user._id,
    })

    if(!fromUserAccount){
        return res.status(404).json({
            message:"System account not found for this user",
        })
    }

    const session = await mongoose.startSession()

    try{

        session.startTransaction()

        const transaction = await transactionModel.create([{
            fromAccount:fromUserAccount._id,
            toAccount:toAccount,
            amount:amount,
            idempotencyKey:idempotencyKey,
            status:"PENDING",
        }], {session})

        const createdTransaction = transaction[0]

        await ledgerModel.create([{
            account:fromUserAccount._id,
            transaction: createdTransaction._id,
            amount:amount,
            type:"DEBIT",
        }], {session})

        await ledgerModel.create([{
            account:toAccount,
            transaction: createdTransaction._id,
            amount:amount,
            type:"CREDIT",
        }], {session})

        createdTransaction.status = "COMPLETED"

        await createdTransaction.save({session})

        await session.commitTransaction()

        session.endSession()

        return res.status(201).json({
            message:"Initial funds transaction processed successfully",
            transaction:createdTransaction,
        })

    } catch(error){

        await session.abortTransaction()

        session.endSession()

        console.log(error)

        return res.status(500).json({
            message:"Initial funds transaction failed",
            error:error.message,
        })
    }
}

async function getTransactions(req, res) {
    try {

        const accounts = await accountModel.find({
            user: req.user._id,
        });

        const accountIds = accounts.map(account => account._id);

        const transactions = await transactionModel.find({
            $or: [
                { fromAccount: { $in: accountIds } },
                { toAccount: { $in: accountIds } }
            ]
        })
        .sort({ createdAt: -1 });

        return res.status(200).json({
            transactions,
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = {
    createTransaction,
    createInitialFundsTransaction,
    getTransactions,
}


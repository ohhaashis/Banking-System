const accountModel = require("../models/account.model")

async function createAccountController(req,res){

    try{

        const user = req.user
        const { name } = req.body

        const account = await accountModel.create({
            user: user._id,
            name: name
        })

        return res.status(201).json({
            account
        })

    }catch(error){

        return res.status(500).json({
            message:error.message
        })
    }
}

async function getAccountsController(req, res) {

    try {

        const accounts = await accountModel.find({
            user: req.user._id,
        })

        return res.status(200).json({
            accounts,
        })

    } catch (error) {

        return res.status(500).json({
            message: error.message,
        })
    }
}

async function getAccountBalanceController(req, res) {

    try {

        const { accountId } = req.params

        const account = await accountModel.findOne({
            _id: accountId,
            user: req.user._id,
        })

        if (!account) {
            return res.status(404).json({
                message: "Account not found for this user",
            })
        }

        const balance = await account.getBalance()

        return res.status(200).json({
            accountId: account._id,
            balance,
        })

    } catch (error) {

        return res.status(500).json({
            message: error.message,
        })
    }
}

module.exports = {
    createAccountController,
    getAccountsController,
    getAccountBalanceController,
}
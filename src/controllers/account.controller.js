const accountModel = require("../models/account.model");


async function createAccountController(req,res){ const user = req.user; const account = await accountModel.create({ user:user._id, }); res.status(201).json({ account }); }

async function getAccountsController(req,res){ try{ const accounts = await accountModel.find(); return res.status(200).json({ accounts }); }catch(error){ return res.status(500).json({ message:error.message }); } }

async function getAccountBalanceController(req,res){
    const {accountId} = req.params

    const account = await accountModel.findOne({
        _id:accountId,
        user:req.user._id,
    })

    if(!account){
        return res.status(404).json({
            message:"Account not found for this user",
        })
    }

    const balance = await account.getBalance();

    res.status(200).json({
        accountId:account._id,
        balance:balance,
    })
}

module.exports = {
    createAccountController,
    getAccountsController,
    getAccountBalanceController,
}
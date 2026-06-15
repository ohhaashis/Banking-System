const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const emailService = require("../services/email.service")
const tokenBlacklistModel = require("../models/blacklist.model")

async function authMiddleware(req,res,next){

    const token =
        req.cookies.token ||
        req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access, token is missing",
        })
    }

    const isBlacklisted = await tokenBlacklistModel.findOne({
        token:token,
    })

    if(isBlacklisted){
        return res.status(401).json({
            message:"Unauthorized access, invalid token",
        })
    }

    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.userId)

        if(!user){
            return res.status(401).json({
                message:"Unauthorized access, user not found",
            })
        }

        req.user = user

        return next()

    }catch(err){

        console.error("Error in auth middleware",err)

        return res.status(401).json({
            message:"Unauthorized access, invalid token",
        })
    }
}

async function authSystemUserMiddleware(req,res,next){

    const token =
        req.cookies.token ||
        req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access, token is missing",
        })
    }

    const isBlacklisted = await tokenBlacklistModel.findOne({
        token:token,
    })

    if(isBlacklisted){
        return res.status(401).json({
            message:"Unauthorized access, invalid token",
        })
    }

    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel
            .findById(decoded.userId)
            .select("+systemUser")

        if(!user){
            return res.status(401).json({
                message:"Unauthorized access, user not found",
            })
        }

        if(!user.systemUser){
            return res.status(403).json({
                message:"Forbidden access, only system users can perform this action",
            })
        }

        req.user = user

        return next()

    }catch(err){

        console.error("Error in auth system user middleware",err)

        return res.status(401).json({
            message:"Unauthorized access, invalid token",
        })
    }
}

module.exports = {
    authMiddleware,
    authSystemUserMiddleware
}
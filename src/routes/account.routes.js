const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const router = express.Router()
const accountController = require("../controllers/account.controller")

/**
 * -POST /api/accounts/
 * -create new account for logged in user
 * - Protected Route
 */
router.post("/",authMiddleware.authMiddleware,accountController.createAccountController);

router.get( "/", authMiddleware.authMiddleware, accountController.getAccountsController );

router.get("/balance/:accountId", authMiddleware.authMiddleware, accountController.getAccountBalanceController);

module.exports = router
const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const transactionController = require("../controllers/transaction.controller")

const transactionRoutes = Router();

transactionRoutes.get(
    "/",
    authMiddleware.authMiddleware,
    transactionController.getTransactions
);

/**
 * -POST /api/transactions/
 * -create new transaction for logged in user
 */

transactionRoutes.post("/",authMiddleware.authMiddleware, transactionController.createTransaction);

/**
 * -POST /api/transactions/system/initial-funds
 * -create initial funds transaction for system user
 */

transactionRoutes.post("/system/initial-funds", authMiddleware.authSystemUserMiddleware, transactionController.createInitialFundsTransaction);

module.exports = transactionRoutes;
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const authRouter = require("./routes/auth.routes.js")
const accountRouter = require("./routes/account.routes.js")
const transactionRouter = require("./routes/transaction.routes.js")

const app = express()



app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get("/",(req,res)=>{
    res.send("Welcome to the Banking Ledger System")
})

app.get("/api", (req, res) => {
    res.json({
        message: "Backend Connected Successfully"
    })
})

app.use("/api/auth",authRouter)
app.use("/api/accounts",accountRouter)
app.use("/api/transactions",transactionRouter)

module.exports = app
import { Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Transfer from "./pages/Transfer"
import Transactions from "./pages/Transaction"
import CreateAccount from "./pages/CreateAccount"
import Accounts from "./pages/Accounts"

function App() {

  return (

    <Routes>

      <Route path="/" element={<Dashboard />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/transfer" element={<Transfer />} />
      <Route path="/accounts" element={<Accounts />} />

      <Route path="/transactions" element={<Transactions />} />
      <Route path="/create-account" element={<CreateAccount />} />

    </Routes>

  )
}

export default App
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {

    const navigate = useNavigate();

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        fetchAccounts();
    }, []);

    async function fetchAccounts() {

        try {

            const response = await api.get("/accounts");

            const accountsData = response.data.accounts;

            const accountsWithBalance = await Promise.all(
                accountsData.map(async (account) => {

                    try {

                        const balanceResponse = await api.get(
                            `/accounts/balance/${account._id}`
                        );

                        return {
                            ...account,
                            balance: balanceResponse.data.balance,
                        };

                    } catch {

                        return {
                            ...account,
                            balance: 0,
                        };
                    }
                })
            );

            setAccounts(accountsWithBalance);

        } catch (error) {

            console.log(error);
        }
    }

    async function handleLogout() {

        try {

            await api.post("/auth/logout");

            alert("Logged Out Successfully");

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert("Logout Failed");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-green-950 to-black text-white p-8">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-10">

                    <div>
                        <h1 className="text-5xl font-bold text-green-400">
                            Banking Dashboard
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Manage your accounts and transactions
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg font-semibold transition"
                    >
                        Logout
                    </button>

                </div>

                {/* Stats Card */}
                <div className="bg-gray-900 border border-green-700 rounded-2xl p-6 shadow-lg mb-8">

                    <h2 className="text-2xl font-bold text-green-900">
                        Total Accounts
                    </h2>

                    <p className="text-5xl font-bold mt-3">
                        {accounts.length}
                    </p>

                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-4 gap-5 mb-10">

                    <button
                        onClick={() => navigate("/create-account")}
                        className="bg-green-600 hover:bg-green-900 p-5 rounded-xl font-semibold text-lg transition"
                    >
                        Create Account
                    </button>

                    <button
                        onClick={() => navigate("/accounts")}
                        className="bg-green-600 hover:bg-green-900 p-5 rounded-xl font-semibold text-lg transition"
                    >
                        My Accounts
                    </button>

                    <button
                        onClick={() => navigate("/transfer")}
                        className="bg-green-600 hover:bg-green-900 p-5 rounded-xl font-semibold text-lg transition"
                    >
                        Transfer Money
                    </button>

                    <button
                        onClick={() => navigate("/transactions")}
                        className="bg-green-600 hover:bg-green-900 p-5 rounded-xl font-semibold text-lg transition"
                    >
                        Transactions
                    </button>

                </div>

                {/* Accounts Section */}
                <h2 className="text-3xl font-bold mb-6 text-green-900">
                    My Accounts
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {accounts.map((account) => (

                        <div
                            key={account._id}
                            className="bg-gray-900 border border-green-700 rounded-2xl p-6 shadow-lg hover:scale-105 transition"
                        >

                            <h3 className="text-2xl font-bold text-green-900 mb-4">
                                {account.name}
                            </h3>

                            <div className="space-y-2">

                                <p>
                                    <span className="font-semibold">
                                        Status:
                                    </span>{" "}
                                    {account.status}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Balance:
                                    </span>{" "}
                                    ₹{account.balance}
                                </p>

                                <p className="text-gray-400 text-sm break-all">
                                    {account._id}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </div>
    );
}

export default Dashboard;
import { useEffect, useState } from "react";
import api from "../services/api";

function Transactions() {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    async function fetchTransactions() {

        try {

            const response = await api.get("/transactions");

            setTransactions(response.data.transactions);

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message);
        }
    }

    return (

        <div className="min-h-screen bg-[#020b2d] px-6 py-10">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">

                    <h1 className="text-5xl font-bold text-green-600">
                        Transaction History
                    </h1>

                    <p className="text-gray-400 mt-3">
                        View all money transfers and account activities
                    </p>

                </div>

                {/* Summary Card */}
                <div className="bg-[#0d183d] border border-green-500/30 rounded-3xl p-6 mb-10 shadow-xl">

                    <h2 className="text-xl font-semibold text-gray-300">
                        Total Transactions
                    </h2>

                    <p className="text-5xl font-bold text-green-400 mt-3">
                        {transactions.length}
                    </p>

                </div>

                {/* Empty State */}
                {transactions.length === 0 ? (

                    <div className="bg-[#0d183d] border border-green-500/30 rounded-3xl p-10 text-center shadow-xl">

                        <h2 className="text-3xl font-bold text-green-700">
                            No Transactions Found
                        </h2>

                        <p className="text-gray-400 mt-3">
                            Your transaction history will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {transactions.map((transaction) => (

                            <div
                                key={transaction._id}
                                className="bg-[#0d183d] border border-green-500/30 rounded-3xl p-6 shadow-xl hover:scale-105 transition duration-300"
                            >

                                <div className="flex justify-between items-center mb-4">

                                    <h3 className="text-2xl font-bold text-emerald-400">
                                        ₹{transaction.amount}
                                    </h3>

                                    <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-semibold">
                                        {transaction.status}
                                    </span>

                                </div>

                                <div className="space-y-4">

                                    <div>

                                        <p className="font-semibold text-white mb-1">
                                            From Account
                                        </p>

                                        <p className="text-xs text-gray-400 break-all bg-[#18264f] p-3 rounded-lg">
                                            {transaction.fromAccount}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="font-semibold text-white mb-1">
                                            To Account
                                        </p>

                                        <p className="text-xs text-gray-400 break-all bg-[#18264f] p-3 rounded-lg">
                                            {transaction.toAccount}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="font-semibold text-white mb-1">
                                            Date
                                        </p>

                                        <p className="text-gray-300">
                                            {new Date(
                                                transaction.createdAt
                                            ).toLocaleString()}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Transactions;
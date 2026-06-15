import { useState } from "react";
import api from "../services/api";

function Transfer() {

    const [fromAccount, setFromAccount] = useState("");
    const [toAccount, setToAccount] = useState("");
    const [amount, setAmount] = useState("");

    async function handleTransfer(e) {

        e.preventDefault();

        try {

            const response = await api.post("/transactions", {
                fromAccount,
                toAccount,
                amount: Number(amount),
                idempotencyKey: Date.now().toString()
            });

            alert(response.data.message);

            console.log(response.data);

            setFromAccount("");
            setToAccount("");
            setAmount("");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Transfer Failed"
            );
        }
    }

    return (

        <div className="min-h-screen bg-[#020b2d] flex items-center justify-center px-4">

            <div className="w-full max-w-2xl bg-[#0d183d] border border-emerald-500/30 rounded-3xl p-10 shadow-2xl">

                <div className="text-center mb-8">

                    <h1 className="text-5xl font-bold text-green-500">
                        Transfer Money
                    </h1>

                    <p className="text-gray-400 mt-3">
                        Securely transfer funds between accounts
                    </p>

                </div>

                <form
                    onSubmit={handleTransfer}
                    className="space-y-6"
                >

                    <div>

                        <label className="block text-gray-300 mb-2 font-medium">
                            From Account ID
                        </label>

                        <input
                            type="text"
                            placeholder="Enter sender account ID"
                            value={fromAccount}
                            onChange={(e) =>
                                setFromAccount(e.target.value)
                            }
                            className="w-full bg-[#1a274d] border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                        />

                    </div>

                    <div>

                        <label className="block text-gray-300 mb-2 font-medium">
                            To Account ID
                        </label>

                        <input
                            type="text"
                            placeholder="Enter receiver account ID"
                            value={toAccount}
                            onChange={(e) =>
                                setToAccount(e.target.value)
                            }
                            className="w-full bg-[#1a274d] border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                        />

                    </div>

                    <div>

                        <label className="block text-gray-300 mb-2 font-medium">
                            Amount
                        </label>

                        <input
                            type="number"
                            placeholder="Enter transfer amount"
                            value={amount}
                            onChange={(e) =>
                                setAmount(e.target.value)
                            }
                            className="w-full bg-[#1a274d] border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-900 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg"
                    >
                        Transfer Money
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Transfer;
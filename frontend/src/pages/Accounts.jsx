import { useEffect, useState } from "react";
import api from "../services/api";

function Accounts() {

    const [accounts, setAccounts] = useState([]);
    const [balances, setBalances] = useState({});

    useEffect(() => {

        async function loadAccounts() {

            try {

                const res = await api.get("/accounts");

                setAccounts(res.data.accounts);

                const balanceObj = {};

                for (const account of res.data.accounts) {

                    const balanceRes = await api.get(
                        `/accounts/balance/${account._id}`
                    );

                    balanceObj[account._id] =
                        balanceRes.data.balance;
                }

                setBalances(balanceObj);

            } catch (error) {

                console.log(error);
            }
        }

        loadAccounts();

    }, []);

    return (

        <div className="min-h-screen bg-[#020b2d] px-6 py-10">

            <div className="max-w-7xl mx-auto">

                {/* Page Header */}
                <div className="text-center mb-10">

                    <h1 className="text-5xl font-bold text-green-600">
                        My Accounts
                    </h1>

                    <p className="text-gray-400 mt-3">
                        View and manage all your banking accounts
                    </p>

                </div>

                {/* Total Accounts Card */}
                <div className="bg-[#0d183d] border border-green-500/30 rounded-3xl p-6 mb-10 shadow-xl">

                    <h2 className="text-xl font-semibold text-gray-300">
                        Total Accounts
                    </h2>

                    <p className="text-5xl font-bold text-green-400 mt-3">
                        {accounts.length}
                    </p>

                </div>

                {/* Accounts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {accounts.map((account) => (

                        <div
                            key={account._id}
                            className="bg-[#0d183d] border border-green-500/30 rounded-3xl p-6 shadow-xl hover:scale-105 transition duration-300"
                        >

                            <div className="flex justify-between items-center mb-4">

                                <h3 className="text-2xl font-bold text-green-400">
                                    {account.name}
                                </h3>

                                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                                    {account.status}
                                </span>

                            </div>

                            <div className="space-y-3">

                                <p className="text-gray-300">
                                    <span className="font-semibold text-white">
                                        Currency:
                                    </span>{" "}
                                    {account.currency}
                                </p>

                                <p className="text-gray-300">
                                    <span className="font-semibold text-white">
                                        Balance:
                                    </span>{" "}
                                    ₹{balances[account._id] || 0}
                                </p>

                                <div>
                                    <p className="font-semibold text-white mb-1">
                                        Account ID
                                    </p>

                                    <p className="text-xs text-gray-400 break-all bg-[#18264f] p-3 rounded-lg">
                                        {account._id}
                                    </p>
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Empty State */}
                {accounts.length === 0 && (

                    <div className="text-center mt-20">

                        <h2 className="text-3xl font-bold text-green-400">
                            No Accounts Found
                        </h2>

                        <p className="text-gray-400 mt-3">
                            Create your first account to get started.
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Accounts;
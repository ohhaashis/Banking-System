import { useState } from "react";
import api from "../services/api";

function CreateAccount() {

    const [name, setName] = useState("");
    const [balance, setBalance] = useState("");

    async function handleCreate(e) {

        e.preventDefault();

        try {

            const response = await api.post("/accounts", {
                name,
                balance
            });

            alert("Account Created");

            console.log(response.data);

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message);
        }
    }

    return (

        <div className="min-h-screen bg-[#020b2d] flex items-center justify-center px-4">

            <div className="w-full max-w-xl bg-[#0d183d] border border-emerald-500/30 rounded-3xl p-10 shadow-2xl">

                <div className="text-center mb-8">

                    <h1 className="text-5xl font-bold text-green-600">
                        Create Account
                    </h1>

                    <p className="text-gray-400 mt-3">
                        Open a new banking account
                    </p>

                </div>

                <form
                    onSubmit={handleCreate}
                    className="space-y-6"
                >

                    <div>

                        <label className="block text-gray-300 mb-2 font-medium">
                            Account Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter account name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#1a274d] border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                        />

                    </div>

                    <div>

                        <label className="block text-gray-300 mb-2 font-medium">
                            Initial Balance
                        </label>

                        <input
                            type="number"
                            placeholder="Enter initial balance"
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                            className="w-full bg-[#1a274d] border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-900 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg"
                    >
                        Create Account
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateAccount;
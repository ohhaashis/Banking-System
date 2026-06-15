import { useState } from "react"
import api from "../services/api"

function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleRegister(e) {

        e.preventDefault()

        try {

            const response = await api.post("/auth/register", {
                name,
                email,
                password
            })

            alert(response.data.message)

            setName("")
            setEmail("")
            setPassword("")

        } catch (error) {

            console.log(error)

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            )
        }
    }

    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <form
                    onSubmit={handleRegister}
                    className="bg-slate-900 border border-green-500/30 rounded-2xl shadow-2xl p-8"
                >

                    <div className="text-center mb-8">

                        <h1 className="text-4xl font-bold text-green-400">
                            Register
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Create your banking account
                        </p>

                    </div>

                    <div className="space-y-5">

                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-lg
                                bg-slate-800
                                border
                                border-slate-700
                                text-white
                                placeholder-slate-400
                                focus:outline-none
                                focus:border-green-500
                                focus:ring-2
                                focus:ring-green-500/30
                            "
                        />

                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-lg
                                bg-slate-800
                                border
                                border-slate-700
                                text-white
                                placeholder-slate-400
                                focus:outline-none
                                focus:border-green-500
                                focus:ring-2
                                focus:ring-green-500/30
                            "
                        />

                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-lg
                                bg-slate-800
                                border
                                border-slate-700
                                text-white
                                placeholder-slate-400
                                focus:outline-none
                                focus:border-green-500
                                focus:ring-2
                                focus:ring-green-500/30
                            "
                        />

                        <button
                            type="submit"
                            className="
                                w-full
                                bg-green-600
                                hover:bg-green-500
                                text-white
                                font-semibold
                                py-3
                                rounded-lg
                                transition-all
                                duration-300
                                shadow-lg
                                hover:shadow-green-500/30
                            "
                        >
                            Register
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default Register
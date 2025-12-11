import React, { useState } from "react";
import toast from "react-hot-toast";
import fetch from "../fetch";
import { Link, useNavigate } from "react-router-dom";


function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) return toast.error("Email is required");

        try {
            const res = await fetch.post("/auth/forgot-password", { email });
            toast.success(res.data.message || "Reset link sent to email");
            setEmail("");
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <>
            <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-700">School Portal</h1>

                <div className="space-x-6">
                    <Link className="text-gray-600 hover:text-blue-700" to="https://vite-react-delta-six-49.vercel.app/">
                        Home
                    </Link>
                    <Link className="text-gray-600 hover:text-blue-700" to="https://vite-react-delta-six-49.vercel.app/Aboutus">
                        About
                    </Link>
                </div>
            </nav>

            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
                    <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                            Send Reset Link
                        </button>
                    </form>
                </div>
            </div>

        </>
    );
}

export default ForgotPassword;

import React, { useState } from "react";
import fetch from "../fetch";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const StudentLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) return toast.error("All fields required");

        try {
            setLoading(true);

            const res = await fetch.post(
                "/student/login",
                { email, password }
            );

            if (res.data.ok) {
                toast.success("Login successful");

                // store token
                localStorage.setItem("studentToken", res.data.token);
                localStorage.setItem("student", JSON.stringify(res.data.student));

                // redirect to dashboard
                window.location.href = "/student/dashboard";
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-700">Student Portal</h1>

                <div className="space-x-6">
                    <Link className="text-gray-600 hover:text-blue-700" to="https://vite-react-delta-six-49.vercel.app/">
                        Home
                    </Link>

                    <Link className="text-gray-600 hover:text-blue-700" to="https://vite-react-delta-six-49.vercel.app/Aboutus">
                        About
                    </Link>


                </div>
            </nav>

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
                <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
                        Student Login
                    </h2>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1 text-gray-600">Email</label>
                            <input
                                type="email"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="student@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1 text-gray-600">Password</label>
                            <input
                                type="password"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {/* Footer Info */}
                    <p className="text-center text-gray-600 mt-4 text-sm">
                        Forgot password?
                        <span className="text-blue-600 cursor-pointer ml-1 hover:underline">
                            Contact Admin
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default StudentLogin;

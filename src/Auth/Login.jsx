


import { useState } from "react";
import fetch from "../fetch";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch.post("/auth/login", form);

            const payload = res.data?.body || res.data;
            const token = payload.token;
            const user = payload.user;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Login successful");

            if (user.role === "admin") navigate("/admin");
            else navigate("/student/dashboard");

        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            {/* 🔹 TOP NAV BAR */}
            <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-700"> Admin Portal</h1>

                <div className="space-x-6">
                    <Link className="text-gray-600 hover:text-blue-700" to="https://vite-react-delta-six-49.vercel.app/">
                        Home
                    </Link>
                    <Link className="text-gray-600 hover:text-blue-700" to="https://vite-react-delta-six-49.vercel.app/Aboutus">
                        About
                    </Link>
                </div>
            </nav>

            {/* 🔹 LOGIN CONTAINER */}
            <div className="flex-grow flex items-center justify-center px-4">
                <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Welcome Back 👋
                    </h2>

                    <form onSubmit={submit} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block font-medium mb-1">Email Address</label>
                            <input
                                name="email"
                                value={form.email}
                                onChange={handle}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block font-medium mb-1">Password</label>
                            <input
                                name="password"
                                value={form.password}
                                onChange={handle}
                                type="password"
                                placeholder="Enter password"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Forgot password link */}
                        <div className="flex justify-end">
                            <Link
                                to="/forgot-password"
                                className="text-blue-600 text-sm hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login button */}
                        <button
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {/* Extra */}
                    <p className="mt-5 text-center text-gray-500 text-sm">
                        Don’t have an account?
                        <span className="text-blue-600 ml-1 cursor-pointer hover:underline">Contact School Admin</span>
                    </p>
                </div>
            </div>
        </div>
    );
}



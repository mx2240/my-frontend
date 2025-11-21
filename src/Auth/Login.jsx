import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { FaUser, FaLock, FaSpinner } from "react-icons/fa";

const Login = () => {
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await login(form.email, form.password);

        if (!res.success) {
            setError(res.message);
            setLoading(false);
            return;
        }

        // ROLE-BASED REDIRECT
        if (res.user.role === "admin") {
            window.location.href = "/admin/dasbord";
        } else if (res.user.role === "student") {
            window.location.href = "/student/dashboard";
        } else {
            setError("Unknown role. Contact support.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

                <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
                    Login
                </h1>

                {error && (
                    <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="font-semibold">Email</label>
                        <div className="flex items-center border rounded-lg p-3 mt-1">
                            <FaUser className="text-gray-600 mr-2" />
                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-semibold">Password</label>
                        <div className="flex items-center border rounded-lg p-3 mt-1">
                            <FaLock className="text-gray-600 mr-2" />
                            <input
                                type="password"
                                placeholder="Enter Password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full outline-none"
                                required
                            />
                        </div>

                        <a
                            href="/forgot-password"
                            className="text-sm text-blue-600 float-right mt-2 hover:underline"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition flex justify-center"
                    >
                        {loading ? (
                            <FaSpinner className="animate-spin text-xl" />
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-700 font-semibold hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;

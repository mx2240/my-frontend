import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import fetch from "../fetch";
// import { Link, useNavigate } from "react-router-dom";


function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirm)
            return toast.error("Fill all fields");

        if (password !== confirm)
            return toast.error("Passwords do not match");

        try {
            const res = await fetch.post(`/auth/reset-password/${token}`, { password });

            toast.success("Password reset successful");
            navigate("/login");

        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid or expired link");
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
                    <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium mb-1">New Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Confirm Password</label>
                            <input
                                type="password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                placeholder="Confirm new password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                            Reset Password
                        </button>

                    </form>
                </div>
            </div>

        </>
    );
}

export default ResetPassword;

import { useState } from "react";
import fetch from "../fetch";
import toast from "react-hot-toast";

export default function StudentForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch.post("/student/auth/forgot-password", { email });
            toast.success("Password reset link sent to your email");
        } catch (err) {
            toast.error(err.response?.data?.message || "Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
            <div className="bg-white p-6 shadow-lg w-full max-w-md rounded">
                <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                <form onSubmit={submit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full p-3 border rounded mb-4"
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>
    );
}

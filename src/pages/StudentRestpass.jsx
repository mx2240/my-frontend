import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetch from "../fetch";
import toast from "react-hot-toast";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await fetch.post(`/student/auth/reset-password/${token}`, { password });
            toast.success("Password reset successful");
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Reset failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
            <div className="bg-white p-6 shadow-lg w-full max-w-md rounded">
                <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

                <form onSubmit={submit}>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded mb-4"
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-3 rounded"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}

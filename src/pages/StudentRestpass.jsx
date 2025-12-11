import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetch from "../fetch";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


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
        </>
    );
}

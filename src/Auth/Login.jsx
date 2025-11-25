import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../lib/api"
import toast from "react-hot-toast";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await apiPost("/auth/login", { email, password });

            const { token, user } = res.data;

            // Save
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Login successful!");

            // Redirect based on role
            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else if (user.role === "student") {
                navigate("/student/dashboard");
            } else {
                navigate("/");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
                    Login
                </h2>

                <form onSubmit={onSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <a href="/register" className="text-indigo-600 hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}

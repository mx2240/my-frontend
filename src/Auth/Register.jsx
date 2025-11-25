import { useState } from "react";
import { apiPost } from "../lib/api"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("student");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await apiPost("/auth/register", {
                name,
                email,
                password,
                role,
            });

            toast.success("Registration successful");

            const { token, user } = res.data;

            // Save login immediately
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect automatically
            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else if (user.role === "student") {
                navigate("/student/dashboard");
            } else {
                navigate("/");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
                    Register
                </h2>

                <form onSubmit={onSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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

                    <select
                        className="w-full p-3 border rounded-lg"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-indigo-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

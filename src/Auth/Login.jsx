import { useState } from "react";
import fetch from "../fetch";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_URL = "/auth/login";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch.post(API_URL, { email, password });

            toast.success("Login successful");

            const { token, user } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // === ROLE-BASED REDIRECT ===
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
        <form onSubmit={onSubmit}>
            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
        </form>
    );
}

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "/auth/login",
                form
            );

            const { user, token } = res.data;

            // Save token + user
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success(`Welcome back, ${user.name}!`);

            // ROLE REDIRECT
            if (user.role === "admin") {
                return navigate("/admin/dashboard");
            } else if (user.role === "teacher") {
                return navigate("/teacher/dashboard");
            } else {
                return navigate("/student/dashboard");
            }

        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

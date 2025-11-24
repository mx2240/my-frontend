import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Registration() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "/auth/register",
                form
            );

            toast.success("Registration successful!");
            navigate("/login");
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Registration failed, try again"
            );
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

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

                {/* ROLE SELECT */}
                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                </select>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

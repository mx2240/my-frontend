import { useState } from "react";
import fetch from "../fetch";
import toast from "react-hot-toast";

const API_URL = "/auth/register";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("student"); // default
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch.post(API_URL, {
                name,
                email,
                password,
                role,
            });

            toast.success("Registration successful! You can now login.");
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Create Account</h2>

            <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

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

            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
            </select>

            <button type="submit">Register</button>
        </form>
    );
}

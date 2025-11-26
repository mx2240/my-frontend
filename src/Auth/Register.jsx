import React, { useState } from "react";
import fetch from "../fetch";
// import "./Register.css";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "admin",
    });

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg("");

        try {
            const res = await fetch.post(
                "auth/register",
                form
            );

            setMsg("✔ Registration Successful");
            setForm({ name: "", email: "", password: "", role: "admin" });
        } catch (err) {
            console.error(err);

            const message = err.response?.data?.message || "Registration failed";
            setMsg("❌ " + message);
        }

        setLoading(false);
    };

    return (
        <div className="reg-container">
            <h2>Create Account</h2>

            {msg && <div className="alert">{msg}</div>}

            <form onSubmit={submitForm} className="reg-form">
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="example@mail.com"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Select Role</label>
                    <select name="role" value={form.role} onChange={onChange}>
                        <option value="admin">Admin</option>
                        <option value="teacher">Student</option>
                    </select>
                </div>

                <button disabled={loading}>
                    {loading ? "Creating account..." : "Register"}
                </button>
            </form>
        </div>
    );
}

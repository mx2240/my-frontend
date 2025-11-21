import React, { useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const data = await api("/auth/register", "POST", form);

            if (data.success) {
                alert("Account created");
                window.location.href = "/login";
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("Server error");
        }
    };
    return (
        <div className="register-container">
            <div className="register-card">
                <h1>Create Account</h1>
                <p className="subtitle">Join our portal today</p>

                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                    />

                    <label>Select Role</label>
                    <select name="role" value={form.role} onChange={handleChange}>
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button type="submit" className="btn-register">
                        Register
                    </button>
                </form>

                <p className="bottom-text">
                    Already have an account?{" "}
                    <span className="link" onClick={() => navigate("/login")}>
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;



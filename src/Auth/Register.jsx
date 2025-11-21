import React, { useState } from "react";
import fetch from "../fetch";

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "student"
    });

    const submit = async (e) => {
        e.preventDefault();

        const res = await fetch.post("/auth/register", user);
        const json = await res.json();

        if (!json.success) return alert(json.message);

        alert("Registration successful!");
        window.location.href = "/login";
    };

    return (
        <div className="register-container">
            <h1>Create Account</h1>

            <form onSubmit={submit}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />

                <select
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};












export default Register;

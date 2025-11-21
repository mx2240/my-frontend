import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import fetch from "../fetch";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch.post("/auth/login", data);
        const json = await res.json();

        if (!json.success) {
            alert(json.message);
            return;
        }

        login(json.user, json.token);

        // ROLE REDIRECT
        if (json.user.role === "admin") navigate("/admin");
        else navigate("/student");
    };

    return (
        <div className="login-container">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                />

                <button type="submit">Login</button>
            </form>

            <a href="/forgot-password">Forgot Password?</a>

            <a href="/register">Create Account</a>
        </div>
    );
};

export default Login;

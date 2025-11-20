import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const success = await login(email, password);
        if (success) {
            navigate("/");
        }

        if (data.role === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/student/dashboard");
        }


        const role = await login(email, password);

        if (role === "admin") navigate("/admin/dashboard");
        else navigate("/student/dashboard");

    };







    return (
        <div className="login-page">
            <div className="login-card">

                <h2 className="title">Welcome Back</h2>
                <p className="subtitle">Login to Continue</p>

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* FORGOT PASSWORD */}
                    <div className="forgot-password">
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>

                    <button type="submit" className="login-btn">Login</button>
                </form>

                <p className="register-text">
                    Don’t have an account? <a href="/register">Create Account</a>
                </p>
            </div>
        </div>
    );
};

export default Login;

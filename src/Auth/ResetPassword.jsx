import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Auth.css";

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`/auth/reset-password/${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        const data = await res.json();
        setMsg(data.message);
    };

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h2>Reset Password</h2>

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Reset Password</button>

                {msg && <p className="msg">{msg}</p>}
            </form>
        </div>
    );
};

export default ResetPassword;

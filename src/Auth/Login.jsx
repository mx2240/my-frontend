import { useState } from "react";
import fetch from "../fetch";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return toast.error("Email and password are required");
        }

        try {
            setLoading(true);

            const res = await fetch.post("/auth/login", formData);

            const { token, user } = res.data;

            // Save login session
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Login successful!");

            // Role-based redirect
            if (user.role === "admin") {
                navigate("/admin");
            } else if (user.role === "student") {
                navigate("/student");
            } else {
                navigate("/"); // fallback
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };







    return (
        <div style={styles.container}>
            <form style={styles.card} onSubmit={handleSubmit}>
                <h2 style={styles.title}>Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                />

                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

// Simple inline styles
const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f1f5f9",
    },
    card: {
        width: "350px",
        padding: "25px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    title: {
        textAlign: "center",
        marginBottom: "10px",
    },
    input: {
        padding: "12px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "16px",
    },
    button: {
        padding: "12px",
        background: "#2563eb",
        color: "#fff",
        fontSize: "17px",
        borderRadius: "8px",
        cursor: "pointer",
        border: "none",
    },
};

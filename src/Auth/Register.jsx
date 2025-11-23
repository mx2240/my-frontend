import { useState } from "react";
import fetch from "../fetch";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "student" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) return toast.error("All fields are required");

        try {
            setLoading(true);
            const res = await fetch.post("/auth/register", formData);
            const { token, user } = res.data;

            // Save session
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Registration successful!");

            // Role-based redirect
            if (user.role === "admin") navigate("/admin/");
            else if (user.role === "student") navigate("/student/dashboard");
            else navigate("/");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.card} onSubmit={handleSubmit}>
                <h2 style={styles.title}>Register</h2>
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={styles.input} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={styles.input} />

                {/* Optional role selector */}
                <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}

// Reuse styles from Login page
const styles = {
    container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f1f5f9" },
    card: { width: "350px", padding: "25px", borderRadius: "12px", background: "#fff", boxShadow: "0 5px 15px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: "15px" },
    title: { textAlign: "center", marginBottom: "10px" },
    input: { padding: "12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "16px" },
    button: { padding: "12px", background: "#10b981", color: "#fff", fontSize: "17px", borderRadius: "8px", cursor: "pointer", border: "none" },
};

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
    const submitLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await api("/auth/login", "POST", form);

            if (data.success) {
                login(data.user, data.token);

                if (data.user.role === "admin") {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/student";
                }
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("Server error");
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

    }
};




// import React, { useState, useContext } from "react";
// import toast from "react-hot-toast";
// import { api } from "../api";
// import { AuthContext } from "../context/AuthProvider";

// export default function Login() {
//     const [form, setForm] = useState({ email: "", password: "" });
//     const { login } = useContext(AuthContext);

//     const submit = async e => {
//         e.preventDefault();
//         try {
//             const res = await api("/auth/login", "POST", form);
//             if (res.ok) {
//                 const { token, user } = res.body;
//                 login(user, token);
//                 toast.success("Welcome " + user.name);
//                 if (user.role === "admin") window.location.href = "/admin"; else window.location.href = "/student";
//             } else toast.error(res.body.message || "Invalid credentials");
//         } catch (err) { toast.error("Server error"); }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
//             <form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded shadow">
//                 <h2 className="text-2xl font-bold mb-4">Login</h2>
//                 <input required className="border p-3 rounded w-full mb-3" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
//                 <input required type="password" className="border p-3 rounded w-full mb-3" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
//                 <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
//             </form>
//         </div>
//     );
// }


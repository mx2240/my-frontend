import { useState } from "react";
import fetch from '../fetch'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch.post("/student", form);
            if (!res.data?.ok && !res.data?.body) {
                // old shape fallback
                if (!res.ok) return toast.error(res.message || "Login failed");
            }
            const payload = res.data?.body || res.data; // handle different shapes
            const token = payload.token;
            const user = payload.user;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("Login successful");
            if (user.role === "admin") navigate("/admin");
            else if (user.role === "student") navigate("/student/dashboard");
            else navigate("/");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Login failed");
        } finally { setLoading(false); }
    };

    return (
        <form onSubmit={submit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Student Login</h2>
            <input name="email" value={form.email} onChange={handle} placeholder="Email" className="block w-full p-3 border rounded mb-3" />
            <input name="password" value={form.password} onChange={handle} type="password" placeholder="Password" className="block w-full p-3 border rounded mb-4" />
            <button disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded">{loading ? "Logging in..." : "Login"}</button>
        </form>
    );
}

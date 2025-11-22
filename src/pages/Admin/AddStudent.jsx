// src/pages/Admin/AddStudent.jsx
import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api";

export default function AddStudent() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password) {
            return toast.error("Please fill all required fields");
        }

        setLoading(true);
        try {
            const res = await api("/auth/register", "POST", form);

            if (res.ok || res.message === "Registration successful") {
                toast.success("Student added successfully");
                setForm({ name: "", email: "", password: "", role: "student" });
            } else {
                toast.error(res.message || "Failed to add student");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Add Student</h2>
                <form onSubmit={handleAddStudent} className="bg-white p-6 rounded shadow space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="w-full p-3 border rounded"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <select
                        name="role"
                        className="w-full p-3 border rounded"
                        value={form.role}
                        onChange={handleChange}
                    >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-3 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                        {loading ? "Adding..." : "Add Student"}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}

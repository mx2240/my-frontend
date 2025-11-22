import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api";

export default function AddStudent() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleAddStudent = async (e) => {
        e.preventDefault();

        const res = await api("/auth/register", "POST", form);

        if (res.ok) {
            toast.success("Student added successfully");
            setForm({ name: "", email: "", password: "", role: "student" });
        } else {
            toast.error(res.message || "Failed to add student");
        }
    };

    return (
        <form onSubmit={handleAddStudent} className="p-6 bg-white rounded shadow max-w-md mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4">Add Student</h2>

            <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="border p-3 rounded w-full mb-3"
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border p-3 rounded w-full mb-3"
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="border p-3 rounded w-full mb-3"
            />

            <select name="role" value={form.role} onChange={handleChange} className="border p-3 rounded w-full mb-4">
                <option value="student">Student</option>
                <option value="admin">Admin</option>
            </select>

            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
                Add Student
            </button>
        </form>
    );
}

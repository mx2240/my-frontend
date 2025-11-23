// src/pages/Admin/AddStudent.jsx
import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import api from "../../api";

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
        if (!form.name || !form.email || !form.password) {
            return toast.error("Please fill all fields");
        }

        const res = await api("admin/students/", "POST", form);

        if (res.ok) {
            toast.success("Student added successfully");
            setForm({ name: "", email: "", password: "", role: "student" });
        } else {
            toast.error(res.message || "Failed to add student");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-md mx-auto mt-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4 text-center">Add Student</h2>
                <form onSubmit={handleAddStudent} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className="border p-3 rounded w-full"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="border p-3 rounded w-full"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="border p-3 rounded w-full"
                    />
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="border p-3 rounded w-full"
                    >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                    >
                        Add Student
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}

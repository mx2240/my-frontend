// src/pages/Admin/AddStudent.jsx
import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import { api } from "../../api"; // your fetch wrapper

export default function AddStudent() {
    const [student, setStudent] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!student.name || !student.email || !student.password) {
            return toast.error("All fields are required");
        }

        setLoading(true);

        try {
            const res = await api("/auth/register", "POST", {
                ...student,
                role: "student", // important
            });

            if (res.ok) {
                toast.success("Student registered successfully");
                setStudent({ name: "", email: "", password: "" });
            } else {
                toast.error(res.message || "Registration failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={student.name}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={student.email}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={student.password}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
                    >
                        {loading ? "Registering..." : "Add Student"}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}

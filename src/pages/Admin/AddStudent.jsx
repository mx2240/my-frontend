// src/pages/Admin/AddStudent.jsx
import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import { api } from "../../api"; // your api helper

export default function AddStudent() {
    const [student, setStudent] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setStudent({ ...student, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!student.name || !student.email || !student.password) {
            return toast.error("Please fill all fields");
        }

        setLoading(true);
        try {
            // 1️⃣ Register student
            const res = await api("/auth/register", "POST", {
                ...student,
                role: "student", // ensures role is student
            });

            if (!res.ok) throw new Error(res.message || "Registration failed");
            toast.success("Student registered successfully");

            // 2️⃣ Auto login student to get token
            const loginRes = await api("/auth/login", "POST", {
                email: student.email,
                password: student.password,
            });

            if (!loginRes.token) throw new Error("Login failed after registration");

            // 3️⃣ Store token
            localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, loginRes.token);

            // 4️⃣ Redirect to student dashboard
            window.location.href = "/student/dashboard";
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={student.name}
                        onChange={handleChange}
                        className="border p-3 rounded w-full"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={student.email}
                        onChange={handleChange}
                        className="border p-3 rounded w-full"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={student.password}
                        onChange={handleChange}
                        className="border p-3 rounded w-full"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
                    >
                        {loading ? "Registering..." : "Add Student"}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}

import React, { useState } from "react";
import fetch from "../../fetch"
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";

export default function AddStudentForm() {
    const [student, setStudent] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token"); // Admin token

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!student.name || !student.email || !student.password) {
            return toast.error("Please fill all fields");
        }

        setLoading(true);
        try {
            const res = await fetch.post(
                "/auth/register",
                { ...student, role: "student" },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.ok) {
                toast.success("Student registered successfully!");
                setStudent({ name: "", email: "", password: "" });
            } else {
                toast.error(res.message || "Registration failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Add New Student</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        value={student.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        value={student.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full border px-3 py-2 rounded"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                    >
                        {loading ? "Registering..." : "Add Student"}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}

// src/pages/Admin/AdminAddStudent.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import fetch from "../../fetch";

export default function AdminAddStudentPage() {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [loadingStudents, setLoadingStudents] = useState(true);

    // Load all students
    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            setLoadingStudents(true);
            const res = await fetch.get("/admin/students/all");
            setStudents(Array.isArray(sRes.data) ? res.data : []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load students");
        } finally {
            setLoadingStudents(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addStudent = async () => {
        if (!formData.name || !formData.email || !formData.password) {
            return toast.error("All fields are required");
        }
        try {
            setLoading(true);
            const res = await fetch.post("/admin/students", formData);
            toast.success("Student added successfully");
            setFormData({ name: "", email: "", password: "" });
            loadStudents();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to add student");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Add Student</h2>

                {/* Add Student Form */}
                <div className="bg-white p-6 rounded shadow mb-8">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-3 rounded w-full mb-4"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-3 rounded w-full mb-4"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border p-3 rounded w-full mb-4"
                    />
                    <button
                        onClick={addStudent}
                        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Student"}
                    </button>
                </div>

                {/* All Students */}
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-2xl font-semibold mb-4">All Students</h3>
                    {loadingStudents ? (
                        <p>Loading students...</p>
                    ) : students.length === 0 ? (
                        <p>No students found.</p>
                    ) : (
                        <ul className="space-y-2">
                            {students.map((s) => (
                                <li key={s._id} className="p-3 border rounded flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">{s.user?.name || s.name}</p>
                                        <p className="text-gray-600">{s.user?.email || s.email}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

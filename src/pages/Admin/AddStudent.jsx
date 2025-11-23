// src/pages/Admin/AdminAddStudentPage.jsx
import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import fetch from "../../fetch";

export default function AdminAddStudentPage() {
    const [student, setStudent] = useState({ name: "", email: "", studentClass: "", phone: "" });
    const [loading, setLoading] = useState(false);

    const addStudent = async () => {
        if (!student.name || !student.email || !student.studentClass)
            return toast.error("Please fill all required fields");
        try {
            setLoading(true);
            const res = await fetch.post("/admin/students", student);
            toast.success("Student added successfully");
            setStudent({ name: "", email: "", studentClass: "", phone: "" });
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add student");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Add New Student</h2>
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="border p-3 rounded"
                            value={student.name}
                            onChange={(e) => setStudent({ ...student, name: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="border p-3 rounded"
                            value={student.email}
                            onChange={(e) => setStudent({ ...student, email: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Class"
                            className="border p-3 rounded"
                            value={student.studentClass}
                            onChange={(e) => setStudent({ ...student, studentClass: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Phone (optional)"
                            className="border p-3 rounded"
                            value={student.phone}
                            onChange={(e) => setStudent({ ...student, phone: e.target.value })}
                        />
                    </div>
                    <button
                        onClick={addStudent}
                        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Student"}
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}

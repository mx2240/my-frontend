import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import fetch from "../../fetch";
import AdminLayout from "../../layouts/AdminLayout";

export default function AdminStudentsPage() {
    const [students, setStudents] = useState([]);
    const [studentForm, setStudentForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    // Load all students
    const fetchStudents = async () => {
        try {
            const res = await fetch.get("/admin/students", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) setStudents(res.body || []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load students");
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Add student
    const handleAddStudent = async (e) => {
        e.preventDefault();
        if (!studentForm.name || !studentForm.email || !studentForm.password) {
            return toast.error("Please fill all fields");
        }
        setLoading(true);
        try {
            const res = await fetch.post(
                "/auth/register",
                { ...studentForm, role: "student" },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.ok) {
                toast.success("Student added!");
                setStudentForm({ name: "", email: "", password: "" });
                fetchStudents();
            } else {
                toast.error(res.message || "Failed to add student");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to add student");
        } finally {
            setLoading(false);
        }
    };

    // Delete student
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;
        try {
            const res = await fetch.delete(`/admin/students/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                toast.success("Student deleted");
                fetchStudents();
            } else {
                toast.error(res.message || "Delete failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Delete failed");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Students Management</h2>

                {/* Add Student Form */}
                <div className="bg-white p-6 rounded shadow mb-6">
                    <h3 className="font-semibold text-lg mb-4">Add New Student</h3>
                    <form className="space-y-4" onSubmit={handleAddStudent}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            value={studentForm.name}
                            onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={studentForm.email}
                            onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={studentForm.password}
                            onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            {loading ? "Registering..." : "Add Student"}
                        </button>
                    </form>
                </div>

                {/* Students List */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg mb-2">All Students</h3>
                    {students.length === 0 ? (
                        <p className="text-gray-500">No students found.</p>
                    ) : (
                        students.map((s) => (
                            <div
                                key={s._id}
                                className="p-4 bg-white rounded shadow flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-bold">{s.name}</p>
                                    <p className="text-sm text-gray-600">{s.email}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(s._id)}
                                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

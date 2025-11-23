// src/pages/Admin/AdminAddStudent.jsx
import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import fetch from "../../fetch";
import toast from "react-hot-toast";

export default function AdminAddStudent() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newStudent, setNewStudent] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });

    // Load all students on mount
    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            setLoading(true);
            const res = await fetch.get("/admin/students/all");
            setStudents(Array.isArray(res.data.body) ? res.data.body : []);
        } catch (err) {
            console.error("Load students error:", err);
            toast.error(err.response?.data?.message || "Failed to load students");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newStudent.name || !newStudent.email || !newStudent.password)
            return toast.error("All fields are required");

        try {
            await fetch.post("/admin/students", newStudent);
            toast.success("Student added successfully!");
            setNewStudent({ name: "", email: "", password: "", role: "student" });
            loadStudents(); // refresh list
        } catch (err) {
            console.error("Add student error:", err);
            toast.error(err.response?.data?.message || "Failed to add student");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Add New Student</h2>

                {/* Add Student Form */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-8 grid gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Student Name"
                        value={newStudent.name}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Student Email"
                        value={newStudent.email}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={newStudent.password}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />
                    <select
                        name="role"
                        value={newStudent.role}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                    >
                        Add Student
                    </button>
                </form>

                {/* Student List */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-2xl font-semibold mb-4">All Students</h3>
                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : students.length === 0 ? (
                        <p className="text-gray-500">No students found.</p>
                    ) : (
                        <ul>
                            {students.map((s) => (
                                <li key={s._id} className="p-2 border-b flex justify-between">
                                    <span>{s.name} ({s.email})</span>
                                    <span className="text-gray-500">{s.role}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

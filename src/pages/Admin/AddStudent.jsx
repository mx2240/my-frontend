// src/pages/Admin/AdminStudentsPage.jsx
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import fetch from "../../fetch";
import toast from "react-hot-toast";

export default function AdminStudentsPage() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newStudent, setNewStudent] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            setLoading(true);
            const res = await fetch.get("/admin/students/all");
            if (res.data?.body) setStudents(res.data.body);
        } catch (err) {
            console.error("Load students error:", err);
            toast.error(err.response?.data?.message || "Failed to load students");
        } finally {
            setLoading(false);
        }
    };

    const addStudent = async () => {
        if (!newStudent.name || !newStudent.email || !newStudent.password)
            return toast.error("All fields are required");

        try {
            const res = await fetch.post("/admin/students", newStudent);
            toast.success("Student added successfully");
            setNewStudent({ name: "", email: "", password: "", role: "student" });
            loadStudents(); // refresh list
        } catch (err) {
            console.error("Add student error:", err);
            toast.error(err.response?.data?.message || "Failed to add student");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">Manage Students</h2>

                {/* Add Student Form */}
                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Add New Student</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="border p-3 rounded"
                            value={newStudent.name}
                            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="border p-3 rounded"
                            value={newStudent.email}
                            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border p-3 rounded"
                            value={newStudent.password}
                            onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                        />
                        <select
                            className="border p-3 rounded"
                            value={newStudent.role}
                            onChange={(e) => setNewStudent({ ...newStudent, role: e.target.value })}
                        >
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        onClick={addStudent}
                        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                    >
                        Add Student
                    </button>
                </div>

                {/* All Students List */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-2xl font-semibold mb-4">All Students</h3>
                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : students.length === 0 ? (
                        <p className="text-gray-500">No students found.</p>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                            {students.map((s) => (
                                <div key={s._id} className="border p-4 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">{s.name}</p>
                                        <p className="text-gray-600">{s.email}</p>
                                        <p className="text-sm text-gray-500">Role: {s.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

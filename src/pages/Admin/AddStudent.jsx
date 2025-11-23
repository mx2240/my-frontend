import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import fetch from "../../fetch";

export default function AdminStudentsPage() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newStudent, setNewStudent] = useState({
        name: "",
        email: "",
        studentClass: "",
        phone: ""
    });

    const [editingStudent, setEditingStudent] = useState(null);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            setLoading(true);
            const sRes = await fetch.get("/admin/students/all");
            setStudents(Array.isArray(sRes.data.body) ? sRes.data.body : []);

        } catch (err) {
            console.error("Failed to load students:", err);
            toast.error(err.response?.data?.message || "Failed to load students");
        } finally {
            setLoading(false);
        }
    };

    const addStudent = async () => {
        const { name, email, studentClass, phone } = newStudent;
        if (!name || !email) return toast.error("Name and Email are required");

        try {
            await fetch.post("/admin/students", newStudent);
            toast.success("Student added successfully");
            setNewStudent({ name: "", email: "", studentClass: "", phone: "" });
            loadStudents();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add student");
        }
    };

    const updateStudent = async () => {
        if (!editingStudent) return;
        const { name, email, studentClass, phone, _id } = editingStudent;
        if (!name || !email) return toast.error("Name and Email are required");

        try {
            await fetch.put(`/admin/students/${_id}`, { name, email, studentClass, phone });
            toast.success("Student updated successfully");
            setEditingStudent(null);
            loadStudents();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update student");
        }
    };

    const deleteStudent = async (id) => {
        if (!confirm("Are you sure you want to delete this student?")) return;
        try {
            await fetch.delete(`/admin/students/${id}`);
            toast.success("Student deleted successfully");
            loadStudents();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete student");
        }
    };

    if (loading) return <AdminLayout><p className="p-6 text-gray-600">Loading students...</p></AdminLayout>;

    return (
        <AdminLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">Student Management</h2>

                {/* --- Add / Edit Student --- */}
                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                        {editingStudent ? "Edit Student" : "Add New Student"}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="border p-3 rounded"
                            value={editingStudent ? editingStudent.name : newStudent.name}
                            onChange={(e) =>
                                editingStudent
                                    ? setEditingStudent({ ...editingStudent, name: e.target.value })
                                    : setNewStudent({ ...newStudent, name: e.target.value })
                            }
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="border p-3 rounded"
                            value={editingStudent ? editingStudent.email : newStudent.email}
                            onChange={(e) =>
                                editingStudent
                                    ? setEditingStudent({ ...editingStudent, email: e.target.value })
                                    : setNewStudent({ ...newStudent, email: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Class"
                            className="border p-3 rounded"
                            value={editingStudent ? editingStudent.studentClass : newStudent.studentClass}
                            onChange={(e) =>
                                editingStudent
                                    ? setEditingStudent({ ...editingStudent, studentClass: e.target.value })
                                    : setNewStudent({ ...newStudent, studentClass: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            className="border p-3 rounded"
                            value={editingStudent ? editingStudent.phone : newStudent.phone}
                            onChange={(e) =>
                                editingStudent
                                    ? setEditingStudent({ ...editingStudent, phone: e.target.value })
                                    : setNewStudent({ ...newStudent, phone: e.target.value })
                            }
                        />
                    </div>
                    <button
                        onClick={editingStudent ? updateStudent : addStudent}
                        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                    >
                        {editingStudent ? "Update Student" : "Add Student"}
                    </button>
                    {editingStudent && (
                        <button
                            onClick={() => setEditingStudent(null)}
                            className="mt-4 ml-4 bg-gray-400 text-white py-2 px-6 rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    )}
                </div>

                {/* --- Students List --- */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">All Students</h3>
                    {students.length === 0 ? (
                        <p>No students available.</p>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                            {students.map((s) => (
                                <div key={s._id} className="p-4 border rounded shadow flex flex-col justify-between">
                                    <div>
                                        <p className="font-bold">{s.name}</p>
                                        <p>Email: {s.email}</p>
                                        <p>Class: {s.studentClass || "N/A"}</p>
                                        <p>Phone: {s.phone || "N/A"}</p>
                                    </div>
                                    <div className="mt-2 flex gap-2">
                                        <button
                                            onClick={() => setEditingStudent(s)}
                                            className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteStudent(s._id)}
                                            className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
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

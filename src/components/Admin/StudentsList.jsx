// src/pages/Admin/StudentsList.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import fetch from "../../fetch";
import toast from "react-hot-toast";

export default function StudentsList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const token = localStorage.getItem("token");

    // Fetch students with pagination
    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await fetch.get(`/admin/students/all?page=${page}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                setStudents(res.body.students || []);
                setTotalPages(res.body.totalPages || 1);
            } else {
                toast.error(res.message || "Failed to load students");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to load students");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [page]);

    // Delete student
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this student?")) return;

        try {
            const res = await fetch.delete(`/admin/students/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                toast.success("Student deleted");
                if (students.length === 1 && page > 1) setPage(page - 1);
                else fetchStudents();
            } else {
                toast.error(res.message || "Delete failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Delete failed");
        }
    };

    // Handle CSV file selection
    const handleFileChange = (e) => setFile(e.target.files[0]);

    // Bulk CSV upload
    const handleBulkUpload = async () => {
        if (!file) return toast.error("Choose a CSV file first");

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch.post("/admin/students/bulk-upload", formData, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            });

            if (res.ok) {
                toast.success(res.message || "Upload complete");
                setFile(null);
                fetchStudents();
            } else {
                toast.error(res.message || "Upload failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Students List</h2>

                {/* Bulk Upload */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="border px-3 py-2 rounded w-60"
                    />
                    <button
                        onClick={handleBulkUpload}
                        disabled={uploading}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                    >
                        {uploading ? "Uploading..." : "Upload CSV"}
                    </button>
                </div>

                {/* Students Table */}
                {loading ? (
                    <p>Loading...</p>
                ) : students.length === 0 ? (
                    <p>No students found.</p>
                ) : (
                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left px-6 py-3">Name</th>
                                    <th className="text-left px-6 py-3">Email</th>
                                    <th className="text-left px-6 py-3">Role</th>
                                    <th className="text-left px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((s) => (
                                    <tr key={s._id} className="border-t hover:bg-gray-50">
                                        <td className="px-6 py-3">{s.name}</td>
                                        <td className="px-6 py-3">{s.email}</td>
                                        <td className="px-6 py-3 capitalize">{s.role}</td>
                                        <td className="px-6 py-3">
                                            <button
                                                onClick={() => handleDelete(s._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                <div className="flex justify-between mt-4 items-center">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}

import React, { useEffect, useState } from "react";
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

    // Fetch students
    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await fetch.get(`/admin/students?page=${page}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                setStudents(res.body.students);
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

    // Handle CSV upload
    const handleFileChange = (e) => setFile(e.target.files[0]);

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
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Students List</h2>

            {/* Bulk Upload */}
            <div className="flex items-center gap-3 mb-6">
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="border px-3 py-2 rounded"
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
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left px-4 py-2">Name</th>
                                <th className="text-left px-4 py-2">Email</th>
                                <th className="text-left px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((s) => (
                                <tr key={s._id} className="border-t">
                                    <td className="px-4 py-2">{s.name}</td>
                                    <td className="px-4 py-2">{s.email}</td>
                                    <td className="px-4 py-2">
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
            <div className="flex justify-between mt-4">
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
    );
}




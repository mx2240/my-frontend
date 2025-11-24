// src/pages/Admin/AdminEnrollmentsPage.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import fetch from "../../fetch";
import toast from "react-hot-toast";

export default function AdminEnrollmentsPage() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ studentId: "", courseId: "" });

    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = async () => {
        try {
            setLoading(true);

            const [sRes, cRes, eRes] = await Promise.all([
                fetch.get("/admin/students/all"),
                fetch.get("/courses"),
                fetch.get("/enrollments/admin")
            ]);

            setStudents(Array.isArray(sRes.data.students) ? sRes.data.students : []);
            setCourses(Array.isArray(cRes.data.body) ? cRes.data.body : []);
            setEnrollments(Array.isArray(eRes.data.body) ? eRes.data.body : []);

        } catch (err) {
            console.error("Load error:", err);
            toast.error(err.response?.data?.message || "Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        if (!form.studentId || !form.courseId) return toast.error("Select student & course");

        try {
            await fetch.post("/enrollments/admin/enroll", form);
            toast.success("Student enrolled!");
            setForm({ studentId: "", courseId: "" });
            loadAll();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Enrollment failed");
        }
    };

    if (loading) return <AdminLayout><p className="p-6 text-gray-600">Loading...</p></AdminLayout>;

    return (
        <AdminLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Admin Enrollment</h2>

                {/* --- Enroll Student --- */}
                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Enroll Student to Course</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <select
                            value={form.studentId}
                            onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                            className="border p-3 rounded"
                        >
                            <option value="">Select Student</option>
                            {students.map((s) => (
                                <option key={s._id} value={s._id}>{s.name} ({s.email})</option>
                            ))}
                        </select>

                        <select
                            value={form.courseId}
                            onChange={(e) => setForm({ ...form, courseId: e.target.value })}
                            className="border p-3 rounded"
                        >
                            <option value="">Select Course</option>
                            {courses.map((c) => (
                                <option key={c._id} value={c._id}>{c.title}</option>
                            ))}
                        </select>

                        <button
                            onClick={handleEnroll}
                            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                        >
                            Enroll
                        </button>
                    </div>
                </div>

                {/* --- Enrollment List --- */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-2xl font-semibold mb-4">Current Enrollments</h3>
                    {enrollments.length === 0 ? (
                        <p className="text-gray-500">No enrollments yet.</p>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="border p-2">Student</th>
                                    <th className="border p-2">Course</th>
                                    <th className="border p-2">Enrolled At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.map((e) => (
                                    <tr key={e._id}>
                                        <td className="border p-2">{e.student?.name} ({e.student?.email})</td>
                                        <td className="border p-2">{e.course?.title}</td>
                                        <td className="border p-2">{new Date(e.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

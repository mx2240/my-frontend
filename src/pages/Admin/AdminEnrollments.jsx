// src/pages/Admin/AdminEnrollment.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import fetch from "../../fetch";
import toast from "react-hot-toast";

export default function AdminEnrollmentPage() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assign, setAssign] = useState({ studentId: "", courseId: "" });

    // Load students, courses, and enrollments
    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = async () => {
        try {
            setLoading(true);

            const sRes = await fetch.get("/admin/students/all");
            setStudents(sRes.data.students || []);

            const cRes = await fetch.get("/courses");
            setCourses(cRes.data.body || []);

            const eRes = await fetch.get("/enrollments/admin/enroll");
            setEnrollments(eRes.data.body || []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const handleAssign = async () => {
        if (!assign.studentId || !assign.courseId)
            return toast.error("Select student and course");

        try {
            await fetch.post("/enrollments/admin/enroll", assign);
            toast.success("Student enrolled successfully");
            setAssign({ studentId: "", courseId: "" });
            loadAll();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to enroll student");
        }
    };

    if (loading) return <AdminLayout><p className="p-6 text-gray-600">Loading...</p></AdminLayout>;

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Admin Enrollment</h2>

                {/* Enrollment Form */}
                <div className="bg-white p-6 rounded shadow mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Enroll Student</h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <select
                            value={assign.studentId}
                            onChange={(e) => setAssign({ ...assign, studentId: e.target.value })}
                            className="border p-3 rounded"
                        >
                            <option value="">Select Student</option>
                            {students.map((s) => (
                                <option key={s._id} value={s._id}>{s.user?.name || s.name} ({s.user?.email || s.email})</option>
                            ))}
                        </select>

                        <select
                            value={assign.courseId}
                            onChange={(e) => setAssign({ ...assign, courseId: e.target.value })}
                            className="border p-3 rounded"
                        >
                            <option value="">Select Course</option>
                            {courses.map((c) => (
                                <option key={c._id} value={c._id}>{c.title} ({c.code})</option>
                            ))}
                        </select>

                        <button
                            onClick={handleAssign}
                            className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
                        >
                            Enroll
                        </button>
                    </div>
                </div>

                {/* All Enrollments */}
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-2xl font-semibold mb-4">All Enrollments</h3>
                    {enrollments.length === 0 ? (
                        <p>No enrollments yet.</p>
                    ) : (
                        <ul className="space-y-2">
                            {enrollments.map((e) => (
                                <li key={e._id} className="p-3 border rounded flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">{e.student?.user?.name || e.student?.name}</p>
                                        <p className="text-gray-600">Course: {e.course?.title} ({e.course?.code})</p>
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

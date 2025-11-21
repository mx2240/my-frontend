// src/pages/Admin/EnrollStudent.jsx
import React, { useEffect, useState } from "react";
import { FaUserPlus, FaCheckCircle } from "react-icons/fa";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";

const EnrollStudent = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [enrollData, setEnrollData] = useState({ studentId: "", courseId: "" });
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;
        fetchStudents();
        fetchCourses();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/students`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setStudents(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchCourses = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/courses`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setCourses(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEnroll = async () => {
        if (!enrollData.studentId || !enrollData.courseId) return toast.error("Select both fields");

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/enroll`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(enrollData),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Student enrolled successfully");
                setEnrollData({ studentId: "", courseId: "" });
            } else {
                toast.error(data.message || "Failed to enroll");
            }
        } catch (err) {
            console.error(err);

        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <FaUserPlus className="text-green-600" /> Enroll Student
                </h1>

                <div className="bg-white rounded-xl p-6 shadow grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                        value={enrollData.studentId}
                        onChange={(e) => setEnrollData({ ...enrollData, studentId: e.target.value })}
                        className="border p-3 rounded-lg"
                    >
                        <option value="">Select Student</option>
                        {students.map((s) => (
                            <option key={s._id} value={s._id}>{s.name}</option>
                        ))}
                    </select>

                    <select
                        value={enrollData.courseId}
                        onChange={(e) => setEnrollData({ ...enrollData, courseId: e.target.value })}
                        className="border p-3 rounded-lg"
                    >
                        <option value="">Select Course</option>
                        {courses.map((c) => (
                            <option key={c._id} value={c._id}>{c.title}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleEnroll}
                        className="flex items-center justify-center gap-2 bg-green-600 text-white rounded-lg p-3 hover:bg-green-700"
                    >
                        <FaCheckCircle /> Enroll
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EnrollStudent;

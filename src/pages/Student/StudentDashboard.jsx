import React, { useState, useEffect } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import StudentTopbar from '../../components/student/StudentTopbar'

const StudentDashboard = () => {
    const [stats, setStats] = useState({
        totalCourses: 0,
        enrolled: 0,
        feesDue: 0,
        unreadNotifications: 0,
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function loadStats() {
            try {
                const [coursesRes, enrollRes, feesRes, notesRes] = await Promise.all([
                    fetch("/api/courses", { headers: { Authorization: `Bearer ${token}` } }),
                    fetch("/api/student/enrollments", { headers: { Authorization: `Bearer ${token}` } }),
                    fetch("/api/fees/my-fees", { headers: { Authorization: `Bearer ${token}` } }),
                    fetch("/api/notifications/my-notifications", { headers: { Authorization: `Bearer ${token}` } }),
                ]);

                const [courses, enrollments, fees, notes] = await Promise.all([
                    coursesRes.json().catch(() => []),
                    enrollRes.json().catch(() => []),
                    feesRes.json().catch(() => []),
                    notesRes.json().catch(() => []),
                ]);

                setStats({
                    totalCourses: Array.isArray(courses) ? courses.length : 0,
                    enrolled: Array.isArray(enrollments) ? enrollments.length : 0,
                    feesDue: Array.isArray(fees) ? fees.filter(f => !f.isPaid).reduce((s, f) => s + Number(f.amount || 0), 0) : 0,
                    unreadNotifications: Array.isArray(notes) ? notes.filter(n => !n.read).length : 0,
                });
            } catch (err) {
                console.error("loadStats error:", err);
            }
        }

        loadStats();
    }, [token]);

    return (
        <StudentLayout>
            {/* <StudentTopbar notifications={stats.unreadNotifications} userName="John Doe" /> */}

            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome Back!</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white shadow rounded-lg p-4 text-center">
                        <h3 className="text-gray-500">Total Courses</h3>
                        <p className="text-2xl font-bold text-gray-800">{stats.totalCourses}</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-4 text-center">
                        <h3 className="text-gray-500">Enrolled</h3>
                        <p className="text-2xl font-bold text-gray-800">{stats.enrolled}</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-4 text-center">
                        <h3 className="text-gray-500">Fees Due (GH₵)</h3>
                        <p className="text-2xl font-bold text-gray-800">{stats.feesDue}</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-4 text-center">
                        <h3 className="text-gray-500">Unread Notifications</h3>
                        <p className="text-2xl font-bold text-gray-800">{stats.unreadNotifications}</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Browse Courses</button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">My Enrollments</button>
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">Fees</button>
                </div>
            </div>
        </StudentLayout>
    );
};

export default StudentDashboard;

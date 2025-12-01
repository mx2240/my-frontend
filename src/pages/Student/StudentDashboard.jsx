// import React, { useState, useEffect } from "react";
// import StudentLayout from "../../layouts/StudentLayout";
// import StudentTopbar from '../../components/student/StudentTopbar'

// const StudentDashboard = () => {
//     const [stats, setStats] = useState({
//         totalCourses: 0,
//         enrolled: 0,
//         feesDue: 0,
//         unreadNotifications: 0,
//     });

//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         async function loadStats() {
//             try {
//                 const [coursesRes, enrollRes, feesRes, notesRes] = await Promise.all([
//                     fetch("/courses", { headers: { Authorization: `Bearer ${token}` } }),
//                     fetch("/student/enrollments", { headers: { Authorization: `Bearer ${token}` } }),
//                     fetch("/fees/my-fees", { headers: { Authorization: `Bearer ${token}` } }),
//                     fetch("/notifications/my-notifications", { headers: { Authorization: `Bearer ${token}` } }),
//                 ]);

//                 const [courses, enrollments, fees, notes] = await Promise.all([
//                     coursesRes.json().catch(() => []),
//                     enrollRes.json().catch(() => []),
//                     feesRes.json().catch(() => []),
//                     notesRes.json().catch(() => []),
//                 ]);

//                 setStats({
//                     totalCourses: Array.isArray(courses) ? courses.length : 0,
//                     enrolled: Array.isArray(enrollments) ? enrollments.length : 0,
//                     feesDue: Array.isArray(fees) ? fees.filter(f => !f.isPaid).reduce((s, f) => s + Number(f.amount || 0), 0) : 0,
//                     unreadNotifications: Array.isArray(notes) ? notes.filter(n => !n.read).length : 0,
//                 });
//             } catch (err) {
//                 console.error("loadStats error:", err);
//             }
//         }

//         loadStats();
//     }, [token]);


//     return (
//         <StudentLayout>
//             {/* <StudentTopbar notifications={stats.unreadNotifications} userName="John Doe" /> */}

//             <div className="p-6">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome Back!</h2>

//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//                     <div className="bg-white shadow rounded-lg p-4 text-center">
//                         <h3 className="text-gray-500">Total Courses</h3>
//                         <p className="text-2xl font-bold text-gray-800">{stats.totalCourses}</p>
//                     </div>

//                     <div className="bg-white shadow rounded-lg p-4 text-center">
//                         <h3 className="text-gray-500">Enrolled</h3>
//                         <p className="text-2xl font-bold text-gray-800">{stats.enrolled}</p>
//                     </div>

//                     <div className="bg-white shadow rounded-lg p-4 text-center">
//                         <h3 className="text-gray-500">Fees Due (GH₵)</h3>
//                         <p className="text-2xl font-bold text-gray-800">{stats.feesDue}</p>
//                     </div>

//                     <div className="bg-white shadow rounded-lg p-4 text-center">
//                         <h3 className="text-gray-500">Unread Notifications</h3>
//                         <p className="text-2xl font-bold text-gray-800">{stats.unreadNotifications}</p>
//                     </div>
//                 </div>

//                 <div className="flex gap-4">
//                     <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Browse Courses</button>
//                     <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">My Enrollments</button>
//                     <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">Fees</button>
//                 </div>
//             </div>
//         </StudentLayout>
//     );
// };

// export default StudentDashboard;





import React, { useEffect, useState } from "react";
import fetch from "../../fetch";
import StudentLayout from "../../layouts/StudentLayout";


export default function StudentDashboard() {
    const [student, setStudent] = useState(null);
    const [fees, setFees] = useState(0);
    const [results, setResults] = useState(0);
    const [attendance, setAttendance] = useState(0);
    const [courses, setCourses] = useState(0);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem("token");

            const headers = { Authorization: `Bearer ${token}` };

            // 1. Get Student Profile
            const profileRes = await fetch.get(
                "/student/profile",
                { headers }
            );
            setStudent(profileRes.data.student);

            // 2. Get Assigned Fees Count
            const feeRes = await fetch.get(
                "/fees/my/fees",
                { headers }
            );
            setFees(feeRes.data.assigned?.length || 0);

            // 3. Get Results Count
            const resRes = await fetch.get(
                "/results/my",
                { headers }
            );
            setResults(resRes.data.results?.length || 0);

            // 4. Get Attendance %
            const attRes = await fetch.get(
                "/attendance/my",
                { headers }
            );
            setAttendance(attRes.data.percent || 0);

            // 5. Get Courses Count
            const courseRes = await fetch.get(
                "/courses/my",
                { headers }
            );
            setCourses(courseRes.data.courses?.length || 0);

        } catch (err) {
            console.log(err);
        }
    };

    return (

        <StudentLayout>
            <div className="p-6">

                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow">
                    <h2 className="text-2xl font-bold">
                        Welcome, {student?.name || "Student"} 👋
                    </h2>
                    <p className="text-sm opacity-80 mt-1">
                        Here's an overview of your academic activity.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">

                    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-lg font-semibold">My Fees</h3>
                        <p className="text-3xl font-bold text-blue-600">{fees}</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-lg font-semibold">Attendance</h3>
                        <p className="text-3xl font-bold text-green-600">{attendance}%</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-lg font-semibold">Results</h3>
                        <p className="text-3xl font-bold text-purple-600">{results}</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-lg font-semibold">Courses</h3>
                        <p className="text-3xl font-bold text-orange-600">{courses}</p>
                    </div>

                </div>

                {/* Notifications */}
                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-3">Latest Notifications</h3>

                    <div className="bg-white p-5 rounded-xl shadow space-y-3">
                        <p className="text-gray-700">📢 Fee payment reminder.</p>
                        <p className="text-gray-700">📘 New course material uploaded.</p>
                        <p className="text-gray-700">📝 Results for Term 2 released.</p>
                    </div>
                </div>

            </div>
        </StudentLayout>
    );
}


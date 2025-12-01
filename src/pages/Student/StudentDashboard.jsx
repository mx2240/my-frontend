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





import React from "react";
import StudentLayout from "../../layouts/StudentLayout";

const StudentDashboard = () => {
    return (
        <StudentLayout>
            {/* Header */}
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="text-gray-500 text-sm">My Courses</h3>
                    <p className="text-3xl font-bold mt-3">6</p>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="text-gray-500 text-sm">Attendance</h3>
                    <p className="text-3xl font-bold mt-3">92%</p>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="text-gray-500 text-sm">Pending Fees</h3>
                    <p className="text-3xl font-bold mt-3">₵ 450</p>
                </div>

            </div>

            {/* Section: Quick Access */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Quick Access</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                    <div className="bg-white shadow rounded-xl p-5 text-center hover:bg-gray-100 cursor-pointer">
                        📚
                        <p className="mt-2 font-medium">Courses</p>
                    </div>

                    <div className="bg-white shadow rounded-xl p-5 text-center hover:bg-gray-100 cursor-pointer">
                        📝
                        <p className="mt-2 font-medium">Assignments</p>
                    </div>

                    <div className="bg-white shadow rounded-xl p-5 text-center hover:bg-gray-100 cursor-pointer">
                        📊
                        <p className="mt-2 font-medium">Results</p>
                    </div>

                    <div className="bg-white shadow rounded-xl p-5 text-center hover:bg-gray-100 cursor-pointer">
                        💳
                        <p className="mt-2 font-medium">Fees</p>
                    </div>

                </div>
            </div>

            {/* Upcoming Classes */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>

                <div className="bg-white shadow rounded-xl p-6">
                    <ul className="space-y-4">

                        <li className="flex justify-between items-center">
                            <span>Mathematics — 9:00 AM</span>
                            <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded">Today</span>
                        </li>

                        <li className="flex justify-between items-center">
                            <span>English — 11:00 AM</span>
                            <span className="text-sm bg-yellow-100 text-yellow-600 px-3 py-1 rounded">Upcoming</span>
                        </li>

                    </ul>
                </div>
            </div>
        </StudentLayout>
    );
};

export default StudentDashboard;






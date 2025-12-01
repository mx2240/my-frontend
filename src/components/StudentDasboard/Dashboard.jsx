// import { FaBook, FaClipboardList, FaMoneyBill, FaUser } from "react-icons/fa";

// const Dashboard = () => {
//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             {/* Header */}
//             <header className="bg-white shadow rounded-xl p-5 flex justify-between items-center mb-8">
//                 <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
//                 <div className="flex items-center gap-3">
//                     <FaUser className="text-gray-600 text-xl" />
//                     <span className="font-medium">Welcome, Student</span>
//                 </div>
//             </header>

//             {/* Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//                 {/* Courses */}
//                 <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//                     <FaBook className="text-blue-600 text-4xl mb-4" />
//                     <h2 className="text-xl font-bold mb-2">My Courses</h2>
//                     <p className="text-gray-600">
//                         View all the courses you are enrolled in.
//                     </p>
//                     <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//                         View Courses
//                     </button>
//                 </div>

//                 {/* Assignments */}
//                 <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//                     <FaClipboardList className="text-green-600 text-4xl mb-4" />
//                     <h2 className="text-xl font-bold mb-2">Assignments</h2>
//                     <p className="text-gray-600">
//                         Check pending and submitted assignments.
//                     </p>
//                     <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
//                         View Assignments
//                     </button>
//                 </div>

//                 {/* Fees */}
//                 <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//                     <FaMoneyBill className="text-yellow-500 text-4xl mb-4" />
//                     <h2 className="text-xl font-bold mb-2">Fees & Payments</h2>
//                     <p className="text-gray-600">
//                         Track school payments and invoices.
//                     </p>
//                     <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
//                         View Payments
//                     </button>
//                 </div>

//                 {/* Profile */}
//                 <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//                     <FaUser className="text-purple-600 text-4xl mb-4" />
//                     <h2 className="text-xl font-bold mb-2">My Profile</h2>
//                     <p className="text-gray-600">
//                         View and update your personal information.
//                     </p>
//                     <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
//                         View Profile
//                     </button>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Dashboard;



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




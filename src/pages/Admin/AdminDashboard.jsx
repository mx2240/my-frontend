// //

// import React, { useEffect, useState } from "react";
// import {
//     FaUsers,
//     FaBook,
//     FaClipboardList,
//     FaDollarSign,
// } from "react-icons/fa";
// import { Line } from "react-chartjs-2";
// import AdminLayout from "../../layouts/AdminLayout";
// import "chart.js/auto";

// const StatCard = ({ icon: Icon, label, value, color }) => (
//     <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-lg transition">
//         <div
//             className={`absolute inset-0 opacity-5 group-hover:opacity-10 transition ${color}`}
//         />
//         <div className="relative flex items-center gap-4">
//             <div
//                 className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${color}`}
//             >
//                 <Icon className="text-xl" />
//             </div>
//             <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                     {label}
//                 </p>
//                 <p className="text-2xl font-bold text-gray-800 dark:text-white">
//                     {value}
//                 </p>
//             </div>
//         </div>
//     </div>
// );

// const Ad = () => {
//     const [stats, setStats] = useState({
//         totalStudents: 0,
//         totalCourses: 0,
//         totalEnrollments: 0,
//         totalFees: 0,
//     });

//     const [chartData, setChartData] = useState({ labels: [], datasets: [] });

//     useEffect(() => {
//         const fetchStats = async () => {
//             const students = 120;
//             const courses = 15;
//             const enrollments = 95;
//             const fees = 5000;

//             setStats({
//                 totalStudents: students,
//                 totalCourses: courses,
//                 totalEnrollments: enrollments,
//                 totalFees: fees,
//             });

//             setChartData({
//                 labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//                 datasets: [
//                     {
//                         label: "New Enrollments",
//                         data: [12, 19, 14, 23, 20, 25, 30],
//                         borderColor: "#2563eb",
//                         backgroundColor: "rgba(37,99,235,0.2)",
//                         tension: 0.4,
//                         fill: true,
//                     },
//                     {
//                         label: "Fees Collected",
//                         data: [200, 400, 300, 500, 450, 600, 700],
//                         borderColor: "#16a34a",
//                         backgroundColor: "rgba(22,163,74,0.2)",
//                         tension: 0.4,
//                         fill: true,
//                     },
//                 ],
//             });
//         };

//         fetchStats();
//     }, []);

//     return (
//         <AdminLayout>
//             <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
//                 <main className="p-4 sm:p-6 lg:p-8">
//                     {/* Header */}
//                     <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//                         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
//                             Dashboard Overview
//                         </h1>
//                         <span className="text-sm text-gray-500 dark:text-gray-400">
//                             Updated just now
//                         </span>
//                     </div>

//                     {/* Stats Grid */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
//                         <StatCard
//                             icon={FaUsers}
//                             label="Total Students"
//                             value={stats.totalStudents}
//                             color="bg-blue-600"
//                         />
//                         <StatCard
//                             icon={FaBook}
//                             label="Total Courses"
//                             value={stats.totalCourses}
//                             color="bg-emerald-600"
//                         />
//                         <StatCard
//                             icon={FaClipboardList}
//                             label="Enrollments"
//                             value={stats.totalEnrollments}
//                             color="bg-amber-500"
//                         />
//                         <StatCard
//                             icon={FaDollarSign}
//                             label="Fees Collected"
//                             value={`GH₵ ${stats.totalFees}`}
//                             color="bg-rose-600"
//                         />
//                     </div>

//                     {/* Charts Section */}
//                     <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//                         <div className="xl:col-span-2 rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm">
//                             <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
//                                 Enrollment & Fees Trend
//                             </h2>
//                             <div className="h-[320px] sm:h-[380px]">
//                                 <Line
//                                     data={chartData}
//                                     options={{
//                                         responsive: true,
//                                         maintainAspectRatio: false,
//                                         plugins: {
//                                             legend: {
//                                                 labels: {
//                                                     color: "#9ca3af",
//                                                 },
//                                             },
//                                         },
//                                         scales: {
//                                             x: { ticks: { color: "#9ca3af" } },
//                                             y: { ticks: { color: "#9ca3af" } },
//                                         },
//                                     }}
//                                 />
//                             </div>
//                         </div>

//                         {/* Side Summary */}
//                         <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm">
//                             <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
//                                 Quick Summary
//                             </h2>
//                             <ul className="space-y-4 text-sm">
//                                 <li className="flex justify-between text-gray-600 dark:text-gray-300">
//                                     <span>Active Students</span>
//                                     <span className="font-medium text-gray-800 dark:text-white">
//                                         {stats.totalStudents}
//                                     </span>
//                                 </li>
//                                 <li className="flex justify-between text-gray-600 dark:text-gray-300">
//                                     <span>Courses Offered</span>
//                                     <span className="font-medium text-gray-800 dark:text-white">
//                                         {stats.totalCourses}
//                                     </span>
//                                 </li>
//                                 <li className="flex justify-between text-gray-600 dark:text-gray-300">
//                                     <span>Total Enrollments</span>
//                                     <span className="font-medium text-gray-800 dark:text-white">
//                                         {stats.totalEnrollments}
//                                     </span>
//                                 </li>
//                                 <li className="flex justify-between text-gray-600 dark:text-gray-300">
//                                     <span>Revenue</span>
//                                     <span className="font-medium text-gray-800 dark:text-white">
//                                         GH₵ {stats.totalFees}
//                                     </span>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </AdminLayout>
//     );
// };

// export default Ad;





import React, { useEffect, useState } from "react";
import {
    FaUsers,
    FaBook,
    FaClipboardList,
    FaDollarSign,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import AdminLayout from "../../layouts/AdminLayout";

/* ---------- Stat Card ---------- */
const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-4">
            <div className={`h-12 w-12 flex items-center justify-center rounded-xl text-white ${color}`}>
                <Icon />
            </div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    </div>
);

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        students: 0,
        courses: 0,
        enrollments: 0,
        revenue: 0,
    });

    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        /**
         * FRONTEND-ONLY DATA
         * Replace later when backend stats are ready
         */
        const students = 120;
        const courses = 18;
        const enrollments = 95;
        const revenue = 8400;

        setStats({
            students,
            courses,
            enrollments,
            revenue,
        });

        setChartData({
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
                {
                    label: "Enrollments",
                    data: [12, 18, 14, 22, 25, 30],
                    borderColor: "#2563eb",
                    backgroundColor: "rgba(37,99,235,0.2)",
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: "Revenue",
                    data: [400, 600, 550, 700, 800, 900],
                    borderColor: "#16a34a",
                    backgroundColor: "rgba(22,163,74,0.2)",
                    fill: true,
                    tension: 0.4,
                },
            ],
        });
    }, []);

    return (
        <AdminLayout>
            <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Dashboard Overview
                    </h1>
                    <p className="text-sm text-gray-500">
                        Frontend simulated statistics
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                    <StatCard icon={FaUsers} label="Students" value={stats.students} color="bg-blue-600" />
                    <StatCard icon={FaBook} label="Courses" value={stats.courses} color="bg-emerald-600" />
                    <StatCard icon={FaClipboardList} label="Enrollments" value={stats.enrollments} color="bg-amber-500" />
                    <StatCard icon={FaDollarSign} label="Revenue" value={`GH₵ ${stats.revenue}`} color="bg-rose-600" />
                </div>

                {/* Chart */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        Enrollment & Revenue Trend
                    </h2>
                    <div className="h-[320px]">
                        {chartData && <Line data={chartData} />}
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}

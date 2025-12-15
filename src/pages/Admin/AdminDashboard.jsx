

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


// import React, { useEffect, useState } from "react";
// import AdminLayout from "../../layouts/AdminLayout";
// import { FaUsers, FaBook, FaClipboardList, FaDollarSign } from "react-icons/fa";
// import { Line } from "react-chartjs-2";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
// } from "chart.js";
// import fetch from "../../fetch"; // your axios wrapper
// import toast from "react-hot-toast";

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const StatCard = ({ icon: Icon, label, value, color }) => (
//     <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow hover:shadow-lg transition">
//         <div className={`absolute inset-0 opacity-5 group-hover:opacity-10 transition ${color}`} />
//         <div className="relative flex items-center gap-4">
//             <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${color}`}>
//                 <Icon className="text-xl" />
//             </div>
//             <div>
//                 <p className="text-sm text-gray-500">{label}</p>
//                 <p className="text-2xl font-bold text-gray-800">{value}</p>
//             </div>
//         </div>
//     </div>
// );

// const Dashboard = () => {
//     const [stats, setStats] = useState({
//         totalStudents: 0,
//         totalCourses: 0,
//         totalEnrollments: 0,
//         totalFees: 0,
//     });

//     const [chartData, setChartData] = useState({
//         labels: [],
//         datasets: [],
//     });

//     const [loading, setLoading] = useState(true);

//     // Fetch dashboard stats from backend
//     const fetchDashboard = async () => {
//         try {
//             const token = localStorage.getItem("token"); // admin token
//             const res = await fetch.get("/admin/dashboard-stats", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             if (res.data.ok) {
//                 const data = res.data.data;

//                 setStats({
//                     totalStudents: data.totalStudents || 0,
//                     totalCourses: data.totalCourses || 0,
//                     totalEnrollments: data.totalEnrollments || 0,
//                     totalFees: data.totalFees || 0,
//                 });

//                 setChartData({
//                     labels: data.months || ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//                     datasets: [
//                         {
//                             label: "New Enrollments",
//                             data: data.monthlyEnrollments || [0, 0, 0, 0, 0, 0, 0],
//                             borderColor: "#2563eb",
//                             backgroundColor: "rgba(37,99,235,0.2)",
//                             tension: 0.4,
//                             fill: true,
//                         },
//                         {
//                             label: "Fees Collected",
//                             data: data.monthlyFees || [0, 0, 0, 0, 0, 0, 0],
//                             borderColor: "#16a34a",
//                             backgroundColor: "rgba(22,163,74,0.2)",
//                             tension: 0.4,
//                             fill: true,
//                         },
//                     ],
//                 });
//             } else {
//                 toast.error(res.data.message || "Failed to load dashboard stats");
//             }
//         } catch (err) {
//             console.error("Dashboard load error:", err);
//             toast.error("Error fetching dashboard stats");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchDashboard();
//     }, []);

//     if (loading) return <AdminLayout><p className="p-6">Loading dashboard...</p></AdminLayout>;

//     return (
//         <AdminLayout>
//             <div className="min-h-screen bg-gray-100 p-6">
//                 <header className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center">
//                     <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
//                     <span className="text-sm text-gray-500">Updated just now</span>
//                 </header>

//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
//                     <StatCard icon={FaUsers} label="Total Students" value={stats.totalStudents} color="bg-blue-600" />
//                     <StatCard icon={FaBook} label="Total Courses" value={stats.totalCourses} color="bg-emerald-600" />
//                     <StatCard icon={FaClipboardList} label="Enrollments" value={stats.totalEnrollments} color="bg-amber-500" />
//                     <StatCard
//                         icon={FaDollarSign}
//                         label="Fees Collected"
//                         value={`GH₵ ${stats.totalFees}`}
//                         color="bg-rose-600"
//                     />
//                 </div>

//                 {/* Charts Section */}
//                 <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//                     {/* Main Chart */}
//                     <div className="xl:col-span-2 rounded-2xl bg-white p-6 shadow">
//                         <h2 className="mb-4 text-lg font-semibold text-gray-800">Enrollment & Fees Trend</h2>
//                         <div className="h-[320px] sm:h-[380px]">
//                             <Line
//                                 data={chartData}
//                                 options={{
//                                     responsive: true,
//                                     maintainAspectRatio: false,
//                                     plugins: { legend: { labels: { color: "#9ca3af" } } },
//                                     scales: { x: { ticks: { color: "#9ca3af" } }, y: { ticks: { color: "#9ca3af" } } },
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     {/* Quick Summary */}
//                     <div className="rounded-2xl bg-white p-6 shadow">
//                         <h2 className="mb-4 text-lg font-semibold text-gray-800">Quick Summary</h2>
//                         <ul className="space-y-4 text-sm">
//                             <li className="flex justify-between text-gray-600">
//                                 <span>Active Students</span>
//                                 <span className="font-medium text-gray-800">{stats.totalStudents}</span>
//                             </li>
//                             <li className="flex justify-between text-gray-600">
//                                 <span>Courses Offered</span>
//                                 <span className="font-medium text-gray-800">{stats.totalCourses}</span>
//                             </li>
//                             <li className="flex justify-between text-gray-600">
//                                 <span>Total Enrollments</span>
//                                 <span className="font-medium text-gray-800">{stats.totalEnrollments}</span>
//                             </li>
//                             <li className="flex justify-between text-gray-600">
//                                 <span>Revenue</span>
//                                 <span className="font-medium text-gray-800">GH₵ {stats.totalFees}</span>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </AdminLayout>
//     );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { FaUsers, FaBook, FaClipboardList, FaDollarSign } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import toast from "react-hot-toast";
import fetch from "../../fetch"; // your axios wrapper

// Chart.js imports
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

// Stat Card
const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className={`group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition`}>
        <div className={`absolute inset-0 opacity-5 group-hover:opacity-10 transition ${color}`} />
        <div className="relative flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${color}`}>
                <Icon className="text-xl" />
            </div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    </div>
);

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/dashboard-stats`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            if (!data.ok) throw new Error(data.message || "Failed to fetch stats");

            setStats(data.data);
        } catch (err) {
            console.error("Dashboard load error:", err);
            toast.error("Failed to load dashboard stats");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) return <AdminLayout><p className="p-6">Loading dashboard...</p></AdminLayout>;
    if (!stats) return <AdminLayout><p className="p-6 text-red-500">No data available</p></AdminLayout>;

    // Chart data
    const chartData = {
        labels: stats.months,
        datasets: [
            {
                label: "Enrollments",
                data: stats.monthlyEnrollments,
                borderColor: "#2563eb",
                backgroundColor: "rgba(37,99,235,0.2)",
                tension: 0.4,
                fill: true,
            },
            {
                label: "Fees Collected",
                data: stats.monthlyFees,
                borderColor: "#16a34a",
                backgroundColor: "rgba(22,163,74,0.2)",
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: "#374151" } },
            title: { display: true, text: "Monthly Trends", color: "#111827" },
        },
        scales: {
            x: { ticks: { color: "#374151" } },
            y: { ticks: { color: "#374151" } },
        },
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                    <StatCard icon={FaUsers} label="Total Students" value={stats.totalStudents} color="bg-blue-600" />
                    <StatCard icon={FaBook} label="Total Courses" value={stats.totalCourses} color="bg-emerald-600" />
                    <StatCard icon={FaClipboardList} label="Enrollments" value={stats.totalEnrollments} color="bg-amber-500" />
                    <StatCard icon={FaDollarSign} label="Fees Collected" value={`GH₵ ${stats.totalFees}`} color="bg-rose-600" />
                </div>

                {/* Chart + Quick Summary */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Chart */}
                    <div className="xl:col-span-2 bg-white rounded-2xl shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Enrollments & Fees Trend</h2>
                        <div className="h-[350px] sm:h-[400px]">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Quick Summary */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Quick Summary</h2>
                        <ul className="space-y-4 text-sm">
                            <li className="flex justify-between text-gray-600">
                                <span>Active Students</span>
                                <span className="font-medium text-gray-800">{stats.totalStudents}</span>
                            </li>
                            <li className="flex justify-between text-gray-600">
                                <span>Courses Offered</span>
                                <span className="font-medium text-gray-800">{stats.totalCourses}</span>
                            </li>
                            <li className="flex justify-between text-gray-600">
                                <span>Total Enrollments</span>
                                <span className="font-medium text-gray-800">{stats.totalEnrollments}</span>
                            </li>
                            <li className="flex justify-between text-gray-600">
                                <span>Revenue</span>
                                <span className="font-medium text-gray-800">GH₵ {stats.totalFees}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}


import React, { useEffect, useState } from "react";
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import AdminLayout from "../../layouts/AdminLayout";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalCourses: 0,
        totalEnrollments: 0,
        feesCollected: 0,
    });

    const [chartData, setChartData] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Enrollments",
                data: [12, 19, 15, 20, 25, 30],
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                tension: 0.4,
            },
        ],
    });

    useEffect(() => {
        // Fetch stats from backend if available
        // Example: fetch("/api/admin/stats").then(res => res.json()).then(setStats)
    }, []);

    return (



        <AdminLayout>

            <div className="flex h-screen bg-gray-100">
                {/* <Sidebar /> */}

                <div className="flex-1 flex flex-col">
                    {/* <Topbar /> */}

                    <main className="p-6">
                        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            <div className="bg-white p-4 rounded shadow">
                                <h2 className="font-semibold text-gray-700">Students</h2>
                                <p className="text-2xl font-bold">{stats.totalStudents}</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <h2 className="font-semibold text-gray-700">Courses</h2>
                                <p className="text-2xl font-bold">{stats.totalCourses}</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <h2 className="font-semibold text-gray-700">Enrollments</h2>
                                <p className="text-2xl font-bold">{stats.totalEnrollments}</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <h2 className="font-semibold text-gray-700">Fees Collected</h2>
                                <p className="text-2xl font-bold">GH₵ {stats.feesCollected}</p>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded shadow mb-6">
                            <h2 className="font-semibold text-gray-700 mb-4">Enrollment Trends</h2>
                            <Line data={chartData} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-4 rounded shadow">
                                <h2 className="font-semibold text-gray-700 mb-2">Recent Activity</h2>
                                <ul className="text-gray-600">
                                    <li>New student enrolled in Math 101</li>
                                    <li>Course Physics 201 updated</li>
                                    <li>Fee GH₵200 collected from John Doe</li>
                                </ul>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <h2 className="font-semibold text-gray-700 mb-2">Notifications</h2>
                                <ul className="text-gray-600">
                                    <li>Exam schedule published</li>
                                    <li>System maintenance on Friday</li>
                                    <li>New announcement from Principal</li>
                                </ul>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;

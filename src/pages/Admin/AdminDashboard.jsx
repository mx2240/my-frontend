import React, { useEffect, useState } from "react";
import { FaUsers, FaBook, FaClipboardList, FaDollarSign } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import AdminLayout from "../../layouts/AdminLayout";
import "chart.js/auto";



const Ad = () => {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalCourses: 0,
        totalEnrollments: 0,
        totalFees: 0,
    });

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    // Fetch stats (replace with real API calls)
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fake API data
                const students = 120;
                const courses = 15;
                const enrollments = 95;
                const fees = 5000;

                setStats({
                    totalStudents: students,
                    totalCourses: courses,
                    totalEnrollments: enrollments,
                    totalFees: fees,
                });

                // Sample chart data
                setChartData({
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    datasets: [
                        {
                            label: "New Enrollments",
                            data: [12, 19, 14, 23, 20, 25, 30],
                            borderColor: "#1d4ed8",
                            backgroundColor: "rgba(29, 78, 216, 0.2)",
                            tension: 0.4,
                        },
                        {
                            label: "Fees Collected",
                            data: [200, 400, 300, 500, 450, 600, 700],
                            borderColor: "#16a34a",
                            backgroundColor: "rgba(22, 163, 74, 0.2)",
                            tension: 0.4,
                        },
                    ],
                });
            } catch (err) {
                console.error(err);
            }
        };




        fetchStats();
    }, []);

    return (

        <AdminLayout>

            <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                {/* <Sidebar /> */}

                <div className="flex-1 flex flex-col">
                    {/* <Topbar /> */}

                    <main className="p-6 overflow-auto">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                            Dasboard overview
                        </h1>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex items-center gap-4">
                                <FaUsers className="text-3xl text-blue-600" />
                                <div>
                                    <p className="text-gray-500 dark:text-gray-300">Total Students</p>
                                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                        {stats.totalStudents}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex items-center gap-4">
                                <FaBook className="text-3xl text-green-600" />
                                <div>
                                    <p className="text-gray-500 dark:text-gray-300">Total Courses</p>
                                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                        {stats.totalCourses}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex items-center gap-4">
                                <FaClipboardList className="text-3xl text-yellow-600" />
                                <div>
                                    <p className="text-gray-500 dark:text-gray-300">Enrollments</p>
                                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                        {stats.totalEnrollments}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex items-center gap-4">
                                <FaDollarSign className="text-3xl text-red-600" />
                                <div>
                                    <p className="text-gray-500 dark:text-gray-300">Fees Collected</p>
                                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                        GH₵ {stats.totalFees}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow h-50  ">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                                Enrollment & Fees Trend
                            </h2>
                            <Line data={chartData} />
                        </div>
                    </main>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Ad;

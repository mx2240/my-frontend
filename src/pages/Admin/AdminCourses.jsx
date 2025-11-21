import React, { useEffect, useState } from "react";
import AdminLayout from '../../layouts/AdminLayout'

const AdminCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        async function load() {
            try {
                const res = await fetch("/admin/courses", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setCourses(data || []);
            } catch (err) {
                console.error("Error loading courses", err);
            }
        }

        load();
    }, []);

    return (
        <AdminLayout>
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Courses Management
                    </h1>

                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       transition-all shadow"
                    >
                        <a href="/admin/add-course"> + Add Course</a>
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3 font-medium text-gray-700">Course ID</th>
                                <th className="p-3 font-medium text-gray-700">Title</th>
                                <th className="p-3 font-medium text-gray-700">Instructor</th>
                                <th className="p-3 font-medium text-gray-700">Enrolled</th>
                                <th className="p-3 font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {courses.length > 0 ? (
                                courses.map((course) => (
                                    <tr key={course._id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{course._id}</td>
                                        <td className="p-3 font-semibold">{course.title}</td>
                                        <td className="p-3">{course.instructor || "N/A"}</td>
                                        <td className="p-3">{course.enrolledCount || 0}</td>
                                        <td className="p-3 flex gap-2">
                                            <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                                                Edit
                                            </button>
                                            <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-gray-500">
                                        No courses found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminCourses;

// src/pages/Admin/AdminCoursesPage.jsx
import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import { getAllCourses, createCourse, deleteCourse } from "../../myapi/couses";

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        duration: "",
    });

    useEffect(() => {
        loadCourses();
    }, []);

    // Load all courses safely
    const loadCourses = async () => {
        setLoading(true);
        try {
            const res = await getAllCourses();

            // SAFE ARRAY FIX
            const list = Array.isArray(res.data?.body) ? res.data.body : [];

            setCourses(list);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load courses");
            setCourses([]); // Prevent map errors
        }
        setLoading(false);
    };

    // Create course
    const addCourse = async () => {
        if (!newCourse.title || !newCourse.description)
            return toast.error("Fill all fields");

        try {
            const res = await createCourse(newCourse);

            if (res.data?.ok) {
                toast.success("Course created successfully");
                setNewCourse({ title: "", description: "", duration: "" });
                loadCourses();
            } else {
                toast.error(res.data?.message || "Failed to create course");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to create course");
        }
    };

    // Delete course
    const removeCourse = async (id) => {
        try {
            const res = await deleteCourse(id);

            if (res.data?.ok) {
                toast.success("Course deleted");
                loadCourses();
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Course Management</h2>

                {/* Add Course Section */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New Course</h3>

                    <div className="space-y-4">
                        <input
                            type="text"
                            className="border p-3 rounded-lg w-full focus:ring focus:border-blue-400"
                            placeholder="Course Title"
                            value={newCourse.title}
                            onChange={(e) =>
                                setNewCourse({ ...newCourse, title: e.target.value })
                            }
                        />

                        <textarea
                            className="border p-3 rounded-lg w-full focus:ring focus:border-blue-400"
                            placeholder="Course Description"
                            rows={3}
                            value={newCourse.description}
                            onChange={(e) =>
                                setNewCourse({ ...newCourse, description: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            className="border p-3 rounded-lg w-full focus:ring focus:border-blue-400"
                            placeholder="Duration (optional)"
                            value={newCourse.duration}
                            onChange={(e) =>
                                setNewCourse({ ...newCourse, duration: e.target.value })
                            }
                        />

                        <button
                            onClick={addCourse}
                            className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-700 transition"
                        >
                            Add Course
                        </button>
                    </div>
                </div>

                {/* Course List */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-2 text-gray-700">Available Courses</h3>

                    {loading ? (
                        <p className="text-gray-500">Loading courses...</p>
                    ) : courses.length === 0 ? (
                        <p className="text-gray-500">No courses available.</p>
                    ) : (
                        courses.map((c) => (
                            <div
                                key={c._id}
                                className="p-4 bg-white rounded-xl shadow flex justify-between items-center"
                            >
                                <div>
                                    <h4 className="font-bold text-lg">{c.title}</h4>
                                    <p className="text-gray-600">{c.description}</p>
                                    {c.duration && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Duration: {c.duration}
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={() => removeCourse(c._id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}




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

    // Load all courses cleanly
    const loadCourses = async () => {
        setLoading(true);
        try {
            const res = await getAllCourses();

            const list = Array.isArray(res.data?.courses)
                ? res.data.courses
                : Array.isArray(res.data?.body)
                    ? res.data.body
                    : [];

            setCourses(list);
        } catch (err) {
            console.error("COURSE LOAD ERROR:", err);
            toast.error("Failed to load courses");
            setCourses([]);
        }
        setLoading(false);
    };

    // Create new course
    const addCourse = async () => {
        if (!newCourse.title || !newCourse.description) {
            return toast.error("Title & description required");
        }

        try {
            const res = await createCourse(newCourse);

            if (res.data?.ok) {
                toast.success("Course created");
                setNewCourse({ title: "", description: "", duration: "" });
                loadCourses();
            } else {
                toast.error(res.data?.message || "Failed to create");
            }
        } catch (err) {
            console.error("CREATE ERROR:", err);
            toast.error(err.response?.data?.message || "Error creating course");
        }
    };

    // Delete a course
    const removeCourse = async (id) => {
        if (!confirm("Are you sure you want to delete this course?")) return;

        try {
            const res = await deleteCourse(id);

            if (res.data?.ok) {
                toast.success("Course deleted");
                loadCourses();
            } else {
                toast.error("Delete failed");
            }
        } catch (err) {
            console.error("DELETE ERROR:", err);
            toast.error("Failed to delete");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Course Management</h1>

                {/* Add Course Section */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New Course</h3>

                    <div className="space-y-4">
                        <input
                            type="text"
                            className="border p-3 rounded-lg w-full"
                            placeholder="Course Title"
                            value={newCourse.title}
                            onChange={(e) =>
                                setNewCourse({ ...newCourse, title: e.target.value })
                            }
                        />

                        <textarea
                            className="border p-3 rounded-lg w-full"
                            placeholder="Course Description"
                            rows={3}
                            value={newCourse.description}
                            onChange={(e) =>
                                setNewCourse({ ...newCourse, description: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            className="border p-3 rounded-lg w-full"
                            placeholder="Duration (optional)"
                            value={newCourse.duration}
                            onChange={(e) =>
                                setNewCourse({ ...newCourse, duration: e.target.value })
                            }
                        />

                        <button
                            onClick={addCourse}
                            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Add Course
                        </button>
                    </div>
                </div>

                {/* Course List */}
                <h3 className="text-xl font-semibold mb-3 text-gray-700">Available Courses</h3>

                {loading ? (
                    <p className="text-gray-500">Loading courses...</p>
                ) : courses.length === 0 ? (
                    <p className="text-gray-500">No courses found.</p>
                ) : (
                    <div className="space-y-4">
                        {courses.map((c) => (
                            <div
                                key={c._id}
                                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
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
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

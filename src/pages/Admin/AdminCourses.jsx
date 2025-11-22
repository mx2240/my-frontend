// src/pages/admin/AdminCoursesPage.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import { getAllCourses, createCourse, deleteCourse } from "../../myapi/couses";

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ title: "", description: "", duration: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCourses();
    }, []);

    // Load all courses
    const loadCourses = async () => {
        try {
            setLoading(true);
            const res = await getAllCourses();
            if (res.data?.ok) setCourses(res.data.body);
            else toast.error(res.data?.message || "Failed to load courses");
        } catch (err) {
            console.error(err);
            toast.error("Failed to load courses");
        } finally {
            setLoading(false);
        }
    };

    // Add new course
    const handleAddCourse = async () => {
        if (!newCourse.title || !newCourse.description) {
            return toast.error("Please fill in all required fields");
        }

        try {
            const res = await createCourse(newCourse);
            console.log("Create course response:", res);
            if (res.data?.ok) {
                toast.success("Course created!");
                setNewCourse({ title: "", description: "", duration: "" });
                loadCourses();
            } else {
                toast.error(res.data?.message || "Failed to create course");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error");
        }
    };

    // Delete a course
    const handleDeleteCourse = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;

        try {
            const res = await deleteCourse(id);
            if (res.data?.ok) {
                toast.success("Course deleted!");
                loadCourses();
            } else {
                toast.error(res.data?.message || "Failed to delete course");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Courses Management</h2>

                {/* Add Course Form */}
                <div className="bg-white p-6 rounded shadow mb-8 space-y-4">
                    <h3 className="font-semibold text-lg mb-2">Add New Course</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        className="border p-3 rounded w-full"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    />
                    <textarea
                        placeholder="Description"
                        className="border p-3 rounded w-full"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Duration (optional)"
                        className="border p-3 rounded w-full"
                        value={newCourse.duration}
                        onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    />
                    <button
                        onClick={handleAddCourse}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                    >
                        Add Course
                    </button>
                </div>

                {/* Courses List */}
                <div className="space-y-4">
                    {loading && <p>Loading courses...</p>}
                    {!loading && courses.length === 0 && <p>No courses found.</p>}
                    {courses.map((c) => (
                        <div key={c._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-lg">{c.title}</h4>
                                <p className="text-gray-700">{c.description}</p>
                                {c.duration && <p className="text-sm text-gray-500">Duration: {c.duration}</p>}
                            </div>
                            <button
                                onClick={() => handleDeleteCourse(c._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}

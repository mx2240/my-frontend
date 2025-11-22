import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import { getAllCourses, createCourse, deleteCourse } from "../../myapi/couses";

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ title: "", description: "", duration: "" });

    useEffect(() => { loadCourses(); }, []);

    const loadCourses = async () => {
        try {
            const res = await getAllCourses();

            // SAFE: Always ensure it's an array
            const list = Array.isArray(res.data?.body) ? res.data.body : [];

            setCourses(list);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load courses");
            setCourses([]); // prevent map errors
        }
    };
    const addCourse = async () => {
        if (!newCourse.title || !newCourse.description) return toast.error("Fill all fields");
        try {
            const res = await createCourse(newCourse);
            if (res.data?.ok) {
                toast.success("Course created");
                setNewCourse({ title: "", description: "", duration: "" });
                loadCourses();
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to create course");
        }
    };

    const removeCourse = async (id) => {
        try {
            const res = await deleteCourse(id);
            if (res.data?.ok) {
                toast.success("Course deleted");
                loadCourses();
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete course");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Courses Management</h2>

                {/* Add Course Form */}
                <div className="bg-white p-6 rounded shadow mb-6 space-y-4">
                    <h3 className="font-semibold text-lg">Add New Course</h3>
                    <input
                        type="text"
                        className="border p-3 rounded w-full"
                        placeholder="Title"
                        value={newCourse.title}
                        onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
                    />
                    <textarea
                        className="border p-3 rounded w-full"
                        placeholder="Description"
                        value={newCourse.description}
                        onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
                    />
                    <input
                        type="text"
                        className="border p-3 rounded w-full"
                        placeholder="Duration (optional)"
                        value={newCourse.duration}
                        onChange={e => setNewCourse({ ...newCourse, duration: e.target.value })}
                    />
                    <button onClick={addCourse} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        Add Course
                    </button>
                </div>

                {/* Courses List */}
                <div className="space-y-4">
                    {courses.map(c => (
                        <div key={c._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                            <div>
                                <h4 className="font-bold">{c.title}</h4>
                                <p>{c.description}</p>
                                {c.duration && <p className="text-sm text-gray-500">Duration: {c.duration}</p>}
                            </div>
                            <button
                                onClick={() => removeCourse(c._id)}
                                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
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

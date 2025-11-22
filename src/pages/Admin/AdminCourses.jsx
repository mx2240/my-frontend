import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import { api } from "../../api"; // your axios/api helper

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        title: "",
        code: "",
        description: "",
        credits: "",
        instructor: "",
    });

    // Load courses on page load
    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            const res = await api("/courses", "GET");
            if (res.ok) setCourses(res.body);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load courses");
        }
    };

    const addCourse = async () => {
        const { title, code, description, credits, instructor } = newCourse;
        if (!title || !code || !description || !credits || !instructor) {
            return toast.error("Please fill all fields");
        }

        try {
            const res = await api("/courses/create", "POST", newCourse);
            if (res.ok) {
                toast.success("Course created!");
                setNewCourse({ title: "", code: "", description: "", credits: "", instructor: "" });
                loadCourses();
            } else {
                toast.error(res.message || "Failed to create course");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error");
        }
    };

    const deleteCourse = async (id) => {
        if (!confirm("Are you sure you want to delete this course?")) return;
        try {
            const res = await api(`/courses/${id}`, "DELETE");
            if (res.ok) {
                toast.success("Course deleted!");
                loadCourses();
            } else {
                toast.error(res.message || "Failed to delete");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold">Courses Management</h2>

                {/* Add Course Form */}
                <div className="bg-white p-6 rounded shadow space-y-4">
                    <h3 className="text-xl font-semibold">Add New Course</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            className="border p-3 rounded w-full"
                            placeholder="Title"
                            value={newCourse.title}
                            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                        />
                        <input
                            type="text"
                            className="border p-3 rounded w-full"
                            placeholder="Code"
                            value={newCourse.code}
                            onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                        />
                        <input
                            type="text"
                            className="border p-3 rounded w-full"
                            placeholder="Instructor"
                            value={newCourse.instructor}
                            onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                        />
                        <input
                            type="number"
                            className="border p-3 rounded w-full"
                            placeholder="Credits"
                            value={newCourse.credits}
                            onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })}
                        />
                    </div>
                    <textarea
                        className="border p-3 rounded w-full"
                        placeholder="Description"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    />
                    <button
                        onClick={addCourse}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Add Course
                    </button>
                </div>

                {/* Courses List */}
                <div className="space-y-4">
                    {courses.map((c) => (
                        <div
                            key={c._id}
                            className="p-4 bg-white rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <h4 className="font-bold text-lg">{c.title} ({c.code})</h4>
                                <p>{c.description}</p>
                                <p className="text-sm text-gray-500">
                                    Instructor: {c.instructor} | Credits: {c.credits}
                                </p>
                            </div>
                            <button
                                onClick={() => deleteCourse(c._id)}
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

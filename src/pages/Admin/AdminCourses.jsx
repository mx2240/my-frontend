// src/pages/Admin/AdminCoursesPage.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import fetch from "../../fetch";

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCourse, setNewCourse] = useState({
        title: "",
        code: "",
        description: "",
        credits: "",
        instructor: ""
    });

    useEffect(() => {
        loadCourses();
    }, []);

    // Load all courses
    const loadCourses = async () => {
        try {
            setLoading(true);
            const res = await fetch.get("admin/courses"); // make sure backend has GET /courses
            setCourses(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Load courses error:", err.response?.data || err.message);
            toast.error("Failed to load courses");
        } finally {
            setLoading(false);
        }
    };

    // Add a new course
    const addCourse = async () => {
        const { title, code, credits, instructor } = newCourse;
        if (!title || !code || !credits || !instructor)
            return toast.error("Please fill all required fields");

        try {
            await fetch.post("/courses/create", newCourse); // POST to /courses/create
            toast.success("Course added successfully");
            setNewCourse({ title: "", code: "", description: "", credits: "", instructor: "" });
            loadCourses(); // refresh the list
        } catch (err) {
            console.error("Add course error:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Failed to add course");
        }
    };

    // Delete a course
    const deleteCourse = async (id) => {
        try {
            await fetch.delete(`/courses/${id}`);
            toast.success("Course deleted");
            loadCourses();
        } catch (err) {
            console.error("Delete course error:", err.response?.data || err.message);
            toast.error("Failed to delete course");
        }
    };

    if (loading) return <AdminLayout><p className="p-6 text-gray-600">Loading...</p></AdminLayout>;

    return (
        <AdminLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-6 text-gray-800">Courses Dashboard</h2>

                {/* --- Add Course --- */}
                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">Add New Course</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Title"
                            className="border p-3 rounded"
                            value={newCourse.title}
                            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Code"
                            className="border p-3 rounded"
                            value={newCourse.code}
                            onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Credits"
                            className="border p-3 rounded"
                            value={newCourse.credits}
                            onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Instructor"
                            className="border p-3 rounded"
                            value={newCourse.instructor}
                            onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="border p-3 rounded"
                            value={newCourse.description}
                            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        />
                    </div>
                    <button
                        onClick={addCourse}
                        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                    >
                        Add Course
                    </button>
                </div>

                {/* --- Course List --- */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">All Courses</h3>
                    {courses.length === 0 ? (
                        <p className="text-gray-500">No courses added yet.</p>
                    ) : (
                        courses.map((c) => (
                            <div key={c._id} className="p-4 border rounded-lg flex justify-between items-center mb-3">
                                <div>
                                    <p className="font-bold">{c.title} ({c.code})</p>
                                    <p className="text-gray-600">{c.description}</p>
                                    <p className="text-gray-600">Credits: {c.credits}, Instructor: {c.instructor}</p>
                                </div>
                                <button
                                    onClick={() => deleteCourse(c._id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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

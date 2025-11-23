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
    const [editingCourse, setEditingCourse] = useState(null);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            setLoading(true);
            const res = await fetch.get("/courses");
            setCourses(Array.isArray(res.data.body) ? res.data.body : []);
        } catch (err) {
            console.error("Failed to load courses:", err);
            toast.error(err.response?.data?.message || "Failed to load courses");
        } finally {
            setLoading(false);
        }
    };

    const addCourse = async () => {
        const { title, code, description, credits, instructor } = newCourse;
        if (!title || !code || !credits || !instructor) {
            return toast.error("Please fill all required fields");
        }

        try {
            await fetch.post("/courses/create", newCourse);
            toast.success("Course added successfully");
            setNewCourse({ title: "", code: "", description: "", credits: "", instructor: "" });
            loadCourses();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add course");
        }
    };

    const updateCourse = async () => {
        if (!editingCourse) return;
        const { title, code, description, credits, instructor } = editingCourse;
        if (!title || !code || !credits || !instructor) {
            return toast.error("Please fill all required fields");
        }

        try {
            await fetch.put(`/courses/${editingCourse._id}`, editingCourse);
            toast.success("Course updated successfully");
            setEditingCourse(null);
            loadCourses();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update course");
        }
    };

    const deleteCourse = async (id) => {
        if (!confirm("Are you sure you want to delete this course?")) return;
        try {
            await fetch.delete(`/courses/${id}`);
            toast.success("Course deleted successfully");
            loadCourses();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete course");
        }
    };

    if (loading) return <AdminLayout><p className="p-6 text-gray-600">Loading courses...</p></AdminLayout>;

    return (
        <AdminLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">Courses Management</h2>

                {/* --- Add / Edit Course --- */}
                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                        {editingCourse ? "Edit Course" : "Add New Course"}
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Title"
                            className="border p-3 rounded"
                            value={editingCourse ? editingCourse.title : newCourse.title}
                            onChange={(e) =>
                                editingCourse
                                    ? setEditingCourse({ ...editingCourse, title: e.target.value })
                                    : setNewCourse({ ...newCourse, title: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Code"
                            className="border p-3 rounded"
                            value={editingCourse ? editingCourse.code : newCourse.code}
                            onChange={(e) =>
                                editingCourse
                                    ? setEditingCourse({ ...editingCourse, code: e.target.value })
                                    : setNewCourse({ ...newCourse, code: e.target.value })
                            }
                        />
                        <input
                            type="number"
                            placeholder="Credits"
                            className="border p-3 rounded"
                            value={editingCourse ? editingCourse.credits : newCourse.credits}
                            onChange={(e) =>
                                editingCourse
                                    ? setEditingCourse({ ...editingCourse, credits: e.target.value })
                                    : setNewCourse({ ...newCourse, credits: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Instructor"
                            className="border p-3 rounded"
                            value={editingCourse ? editingCourse.instructor : newCourse.instructor}
                            onChange={(e) =>
                                editingCourse
                                    ? setEditingCourse({ ...editingCourse, instructor: e.target.value })
                                    : setNewCourse({ ...newCourse, instructor: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="border p-3 rounded md:col-span-2"
                            value={editingCourse ? editingCourse.description : newCourse.description}
                            onChange={(e) =>
                                editingCourse
                                    ? setEditingCourse({ ...editingCourse, description: e.target.value })
                                    : setNewCourse({ ...newCourse, description: e.target.value })
                            }
                        />
                    </div>
                    <button
                        onClick={editingCourse ? updateCourse : addCourse}
                        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                    >
                        {editingCourse ? "Update Course" : "Add Course"}
                    </button>
                    {editingCourse && (
                        <button
                            onClick={() => setEditingCourse(null)}
                            className="mt-4 ml-4 bg-gray-400 text-white py-2 px-6 rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    )}
                </div>

                {/* --- Courses List --- */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">All Courses</h3>
                    {courses.length === 0 ? (
                        <p>No courses available.</p>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                            {courses.map((course) => (
                                <div key={course._id} className="p-4 border rounded shadow flex flex-col justify-between">
                                    <div>
                                        <p className="font-bold">{course.title} ({course.code || "N/A"})</p>
                                        <p>{course.description}</p>
                                        <p>Instructor: {course.instructor}</p>
                                        <p>Credits: {course.credits}</p>
                                    </div>
                                    <div className="mt-2 flex gap-2">
                                        <button
                                            onClick={() => setEditingCourse(course)}
                                            className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteCourse(course._id)}
                                            className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

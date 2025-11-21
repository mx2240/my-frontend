import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import fetch from "../../fetch";

export default function AddCourse() {
    const [course, setCourse] = useState({ title: "", description: "", duration: "" });
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        // Debug: check token before sending
        const token = localStorage.getItem("token");
        console.log("Token in submit:", token);
        if (!token) {
            return toast.error("No token found. Please login first.");
        }

        if (!course.title || !course.description || !course.duration) {
            return toast.error("All fields are required");
        }

        setLoading(true);

        try {
            const res = await fetch.post("/courses", course); // backend route
            console.log("Server response:", res.data); // debug
            toast.success("Course created successfully!");
            setCourse({ title: "", description: "", duration: "" });
        } catch (err) {
            console.error("Error response:", err.response?.data);
            toast.error(err.response?.data?.message || "Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Add Course</h2>
                <form
                    onSubmit={submit}
                    className="bg-white p-6 rounded shadow space-y-4"
                >
                    <input
                        required
                        className="border p-3 rounded w-full"
                        placeholder="Title"
                        value={course.title}
                        onChange={(e) => setCourse({ ...course, title: e.target.value })}
                    />
                    <textarea
                        required
                        className="border p-3 rounded w-full"
                        placeholder="Description"
                        value={course.description}
                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    />
                    <input
                        required
                        className="border p-3 rounded w-full"
                        placeholder="Duration"
                        value={course.duration}
                        onChange={(e) => setCourse({ ...course, duration: e.target.value })}
                    />
                    <button
                        type="submit"
                        className={`bg-blue-600 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Course"}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}

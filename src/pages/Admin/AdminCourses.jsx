import React, { useState } from "react";
import toast from "react-hot-toast";
import { createCourse } from "../../myapi/couses";
import AdiminLayout from "../../layouts/AdminLayout";

export default function AddCourseForm({ onSuccess }) {
    const [course, setCourse] = useState({
        title: "",
        description: "",
        duration: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!course.title) return toast.error("Title is required");

        try {
            setLoading(true);
            const res = await createCourse(course);
            setLoading(false);

            if (res.ok) {
                toast.success("Course added successfully!");
                setCourse({ title: "", description: "", duration: "" });
                if (onSuccess) onSuccess(); // reload course list
            } else {
                toast.error(res.message || "Failed to add course");
            }
        } catch (err) {
            setLoading(false);
            console.error(err);
            toast.error("Server error");
        }
    };

    return (
        <AdiminLayout>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow rounded-lg p-6 max-w-lg mx-auto mb-6 space-y-4"
            >
                <h3 className="text-xl font-semibold text-gray-700">Add New Course</h3>

                <div className="space-y-2">
                    <label className="block text-gray-600">Title <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="title"
                        value={course.title}
                        onChange={handleChange}
                        placeholder="Course Title"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-600">Description</label>
                    <textarea
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        placeholder="Brief description of the course"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={3}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-600">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        value={course.duration}
                        onChange={handleChange}
                        placeholder="e.g., 8 weeks, 40 hours"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
                >
                    {loading ? "Adding..." : "Add Course"}
                </button>
            </form>
        </AdiminLayout>
    );
}

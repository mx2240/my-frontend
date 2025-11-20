import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCourse = () => {
    const { id } = useParams(); // course ID from route
    const navigate = useNavigate();

    const [course, setCourse] = useState({
        title: "",
        description: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchCourse();
    }, [id]);

    const fetchCourse = async () => {
        try {
            const res = await axios.get(`/api/courses/${id}`);
            setCourse({
                title: res.data.title,
                description: res.data.description,
            });
            setLoading(false);
        } catch (err) {
            console.error("Error fetching course:", err);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.put(`/api/courses/${id}`, course);
            alert("Course updated successfully!");
            navigate("/admin/courses");
        } catch (err) {
            console.error("Error updating course:", err);
            alert("Failed to update course.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p className="p-6">Loading course...</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Edit Course</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md max-w-md"
            >
                <label className="block mb-4">
                    <span className="text-gray-700 font-medium">Title</span>
                    <input
                        type="text"
                        name="title"
                        value={course.title}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded p-2"
                        required
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700 font-medium">Description</span>
                    <textarea
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded p-2"
                        rows="4"
                        required
                    />
                </label>

                <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {saving ? "Saving..." : "Update Course"}
                </button>
            </form>
        </div>
    );
};

export default EditCourse;

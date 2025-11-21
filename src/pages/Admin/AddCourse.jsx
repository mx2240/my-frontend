import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const AddCourse = () => {
    const [form, setForm] = useState({
        title: "",
        code: "",
        department: "",
        duration: "",
        instructor: "",
        description: ""
    });

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/admin/courses/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                return;
            }

            setSuccess("Course Added Successfully!");
            setForm({
                title: "",
                code: "",
                department: "",
                duration: "",
                instructor: "",
                description: ""
            });

            setTimeout(() => setSuccess(""), 2000);

        } catch (err) {
            setError("Server error. Try again.");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">

                <h1 className="text-2xl font-bold mb-6">Add New Course</h1>

                {success && (
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
                        {success}
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-md max-w-3xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block font-semibold mb-1">Course Title</label>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g. Introduction to Programming"
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Course Code</label>
                            <input
                                name="code"
                                value={form.code}
                                onChange={handleChange}
                                placeholder="e.g. CSC101"
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Department</label>
                            <select
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            >
                                <option value="">Select Department</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Business">Business</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Engineering">Engineering</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Duration (Months)</label>
                            <input
                                name="duration"
                                type="number"
                                value={form.duration}
                                onChange={handleChange}
                                placeholder="e.g. 6"
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block font-semibold mb-1">Instructor</label>
                            <input
                                name="instructor"
                                value={form.instructor}
                                onChange={handleChange}
                                placeholder="e.g. Prof. John Doe"
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block font-semibold mb-1">Course Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Enter detailed course description"
                                rows="4"
                                className="w-full border px-3 py-2 rounded"
                            ></textarea>
                        </div>
                    </div>

                    <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                        Add Course
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AddCourse;

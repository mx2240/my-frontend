import React, { useState } from "react";
import { FaClipboardCheck, FaPlus } from "react-icons/fa";
import AdminLayout from '../../layouts/AdminLayout'


const AdminEnrollmentForm = () => {
    const [form, setForm] = useState({
        studentId: "",
        courseId: "",
        date: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitForm = () => {
        if (!form.studentId || !form.courseId || !form.date)
            return alert("All fields are required");

        alert("Enrollment Submitted!");
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <FaClipboardCheck className="text-purple-600" />
                    Enroll Student
                </h1>

                <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl">
                    <div className="mb-4">
                        <label className="font-medium">Student ID</label>
                        <input
                            name="studentId"
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg mt-1"
                            placeholder="Enter Student ID"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="font-medium">Course ID</label>
                        <input
                            name="courseId"
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg mt-1"
                            placeholder="Enter Course ID"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="font-medium">Enrollment Date</label>
                        <input
                            type="date"
                            name="date"
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg mt-1"
                        />
                    </div>

                    <button
                        onClick={submitForm}
                        className="flex items-center justify-center gap-2 bg-green-600 text-white w-full p-3 rounded-lg hover:bg-green-700"
                    >
                        <FaPlus /> Submit Enrollment
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminEnrollmentForm;

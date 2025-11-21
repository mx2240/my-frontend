// src/pages/Admin/AddStudent.jsx
import React, { useState } from "react";
import { FaUserPlus, FaSave } from "react-icons/fa";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../fetch";   // axios instance

const AddStudent = () => {
    const [student, setStudent] = useState({
        name: "",
        email: "",
        course: "",
        phone: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/admin/students", student);

            if (res.status === 201 || res.data.success) {
                alert(`Student ${student.name} added successfully!`);
                setStudent({ name: "", email: "", course: "", phone: "" });
                window.location.href = "/admin/students";
            } else {
                alert(res.data.message || "Failed to add student");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Server error");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <FaUserPlus className="text-green-600" /> Add Student
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    {/* Name */}
                    <div>
                        <label className="block font-medium">Full Name</label>
                        <input
                            type="text"
                            value={student.name}
                            onChange={(e) =>
                                setStudent({ ...student, name: e.target.value })
                            }
                            className="border p-3 w-full rounded-lg mt-1"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            value={student.email}
                            onChange={(e) =>
                                setStudent({ ...student, email: e.target.value })
                            }
                            className="border p-3 w-full rounded-lg mt-1"
                            required
                        />
                    </div>

                    {/* Course */}
                    <div>
                        <label className="block font-medium">Course</label>
                        <input
                            type="text"
                            value={student.course}
                            onChange={(e) =>
                                setStudent({ ...student, course: e.target.value })
                            }
                            className="border p-3 w-full rounded-lg mt-1"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block font-medium">Phone Number</label>
                        <input
                            type="text"
                            value={student.phone}
                            onChange={(e) =>
                                setStudent({ ...student, phone: e.target.value })
                            }
                            className="border p-3 w-full rounded-lg mt-1"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2 mt-4">
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                        >
                            <FaSave /> Add Student
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AddStudent;

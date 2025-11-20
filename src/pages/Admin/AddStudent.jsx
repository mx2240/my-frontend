// src/pages/Admin/AddStudent.jsx
import React, { useState } from "react";
import { FaUserPlus, FaSave } from "react-icons/fa";
import AdminLayout from "../../layouts/AdminLayout";

const AddStudent = () => {
    const [student, setStudent] = useState({
        name: "",
        email: "",
        class: "",
        rollNumber: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Student ${student.name} added successfully!`);
    };

    return (

        <AdminLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <FaUserPlus className="text-green-600" /> Add Student
                </h1>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">Full Name</label>
                        <input
                            type="text"
                            value={student.name}
                            onChange={(e) => setStudent({ ...student, name: e.target.value })}
                            className="border p-3 w-full rounded-lg mt-1"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            value={student.email}
                            onChange={(e) => setStudent({ ...student, email: e.target.value })}
                            className="border p-3 w-full rounded-lg mt-1"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Class</label>
                        <input
                            type="text"
                            value={student.class}
                            onChange={(e) => setStudent({ ...student, class: e.target.value })}
                            className="border p-3 w-full rounded-lg mt-1"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Roll Number</label>
                        <input
                            type="text"
                            value={student.rollNumber}
                            onChange={(e) => setStudent({ ...student, rollNumber: e.target.value })}
                            className="border p-3 w-full rounded-lg mt-1"
                            required
                        />
                    </div>

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

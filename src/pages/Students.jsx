import React, { useState } from "react";
import { FaSearch, FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";
import AdminLayouts from "../layouts/AdminLayout";

const StudentList = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const students = [
        { id: 1, name: "John Doe", class: "Form 1", email: "john@gmail.com", status: "Active" },
        { id: 2, name: "Sarah Brown", class: "Form 2", email: "sarah@gmail.com", status: "Inactive" },
        { id: 3, name: "Michael King", class: "Form 3", email: "michael@gmail.com", status: "Active" },
    ];

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayouts>
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Student List</h1>

                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                        <FaUserPlus /> <a href="/add-student">Add Student</a>
                    </button>
                </div>

                {/* Search Input */}
                <div className="flex items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow mb-5 border">
                    <FaSearch className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search student..."
                        className="ml-3 w-full focus:outline-none bg-transparent text-gray-700 dark:text-white"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Student Table */}
                <div className="overflow-x-auto">
                    <table className="w-full bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                            <tr>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Class</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr
                                    key={student.id}
                                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                                >
                                    <td className="p-4">{student.name}</td>
                                    <td className="p-4">{student.class}</td>
                                    <td className="p-4">{student.email}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${student.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {student.status}
                                        </span>
                                    </td>

                                    <td className="p-4 flex items-center gap-3">
                                        <button className="text-blue-600 hover:text-blue-800 text-lg">
                                            <FaEdit />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800 text-lg">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredStudents.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center p-5 text-gray-500 dark:text-gray-300">
                                        No students found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayouts>
    );
};

export default StudentList;

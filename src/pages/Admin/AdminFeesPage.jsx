// src/pages/Admin/AdminAssignFees.jsx
import React, { useEffect, useState } from "react";
import fetch from '../../fetch'
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";

const AdminAssignFees = () => {
    const [students, setStudents] = useState([]); // always an array
    const [amount, setAmount] = useState("");
    const token = localStorage.getItem("token");

    // Fetch all students
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await fetch.get("/admin/courses`", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Ensure we always have an array
                setStudents(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Error fetching students:", err);
                toast.error("Failed to load students");
            }
        };
        fetchStudents();
    }, [token]);

    // Assign fee to a student
    const assignFees = async (studentId) => {
        if (!amount || isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        try {
            const res = await axios.post(
                "/api/fees/assign",
                { student: studentId, amount: Number(amount) },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Fee assigned successfully");
        } catch (err) {
            console.error("Error assigning fee:", err);
            toast.error("Failed to assign fee");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Assign Fees to Students</h1>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Fee Amount (GH₵)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border rounded px-3 py-2 w-48"
                        placeholder="Enter amount"
                    />
                </div>

                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    #
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {(Array.isArray(students) ? students : []).map((student, idx) => (
                                <tr key={student._id}>
                                    <td className="px-6 py-4">{idx + 1}</td>
                                    <td className="px-6 py-4">{student.name}</td>
                                    <td className="px-6 py-4">{student.email}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => assignFees(student._id)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                        >
                                            Assign Fee
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {(!Array.isArray(students) || students.length === 0) && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                        No students found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminAssignFees;

import React, { useState } from "react";
import {
    FaMoneyBill,
    FaPlus,
    FaTrash,
    FaUserPlus,
    FaCheckCircle,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";

const AdminFees = () => {
    const [fees, setFees] = useState([
        { id: 1, title: "School Fees", amount: 1500 },
        { id: 2, title: "Hostel Fees", amount: 700 },
    ]);

    const [students] = useState([
        { id: "STU-001", name: "John Doe" },
        { id: "STU-002", name: "Sarah Mensah" },
        { id: "STU-003", name: "Michael Brown" },
    ]);

    const [assignData, setAssignData] = useState({
        studentId: "",
        feeId: "",
    });

    const [newFee, setNewFee] = useState({ title: "", amount: "" });

    // ADD FEE
    const addFee = () => {
        if (!newFee.title || !newFee.amount) return alert("Please fill all fields");

        setFees([
            ...fees,
            { id: Date.now(), title: newFee.title, amount: Number(newFee.amount) },
        ]);

        setNewFee({ title: "", amount: "" });
    };

    // DELETE
    const deleteFee = (id) => {
        setFees(fees.filter((f) => f.id !== id));
    };

    // ASSIGN FEE TO STUDENT
    const assignFee = () => {
        if (!assignData.studentId || !assignData.feeId)
            return alert("Select both fields");

        const student = students.find((s) => s.id === assignData.studentId);
        const fee = fees.find((f) => f.id === Number(assignData.feeId));

        alert(
            `Fee Assigned Successfully:\n\nStudent: ${student.name}\nFee: ${fee.title} - $${fee.amount}`
        );

        setAssignData({ studentId: "", feeId: "" });
    };

    return (
        <AdminLayout>
            <div className="p-6">
                {/* PAGE HEADER */}
                <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <FaMoneyBill className="text-green-600" />
                    Fees Management
                </h1>

                {/* ADD FEE CARD */}
                <div className="bg-white rounded-xl p-6 shadow-md mb-8">
                    <h2 className="text-xl font-semibold mb-4">Add New Fee</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Fee Title"
                            value={newFee.title}
                            onChange={(e) =>
                                setNewFee({ ...newFee, title: e.target.value })
                            }
                            className="border p-3 rounded-lg"
                        />

                        <input
                            type="number"
                            placeholder="Fee Amount"
                            value={newFee.amount}
                            onChange={(e) =>
                                setNewFee({ ...newFee, amount: e.target.value })
                            }
                            className="border p-3 rounded-lg"
                        />

                        <button
                            onClick={addFee}
                            className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"
                        >
                            <FaPlus /> Add Fee
                        </button>
                    </div>
                </div>

                {/* ASSIGN FEE */}
                <div className="bg-white rounded-xl p-6 shadow-md mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <FaUserPlus className="text-purple-600" /> Assign Fee to Student
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* SELECT STUDENT */}
                        <select
                            value={assignData.studentId}
                            onChange={(e) =>
                                setAssignData({ ...assignData, studentId: e.target.value })
                            }
                            className="border p-3 rounded-lg"
                        >
                            <option value="">Select Student</option>
                            {students.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name} ({s.id})
                                </option>
                            ))}
                        </select>

                        {/* SELECT FEE */}
                        <select
                            value={assignData.feeId}
                            onChange={(e) =>
                                setAssignData({ ...assignData, feeId: e.target.value })
                            }
                            className="border p-3 rounded-lg"
                        >
                            <option value="">Select Fee</option>
                            {fees.map((fee) => (
                                <option key={fee.id} value={fee.id}>
                                    {fee.title} — ${fee.amount}
                                </option>
                            ))}
                        </select>

                        {/* ASSIGN BUTTON */}
                        <button
                            onClick={assignFee}
                            className="flex items-center justify-center gap-2 bg-green-600 text-white rounded-lg p-3 hover:bg-green-700"
                        >
                            <FaCheckCircle /> Assign Fee
                        </button>
                    </div>
                </div>

                {/* FEES LIST */}
                <h2 className="text-xl font-semibold mb-4">All Fees</h2>
                <div className="space-y-4">
                    {fees.map((fee) => (
                        <div
                            key={fee.id}
                            className="flex justify-between items-center p-5 bg-white rounded-xl shadow"
                        >
                            <div>
                                <h3 className="text-lg font-bold">{fee.title}</h3>
                                <p className="text-gray-600">${fee.amount}</p>
                            </div>

                            <button
                                onClick={() => deleteFee(fee.id)}
                                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminFees;

// src/pages/Admin/FeesTracking.jsx
import React, { useState, useEffect } from "react";
import { FaDollarSign, FaCheckCircle } from "react-icons/fa";
import AdminLayout from "../../layouts/AdminLayout";

const FeesTracking = () => {
    const [feesList, setFeesList] = useState([]);

    // Mock fetch - replace with your API
    useEffect(() => {
        setFeesList([
            { id: 1, student: "John Doe", class: "Math 101", amount: 200, paid: false },
            { id: 2, student: "Jane Smith", class: "Physics 201", amount: 150, paid: true },
            { id: 3, student: "Michael Johnson", class: "Chemistry 301", amount: 180, paid: false },
        ]);
    }, []);

    const markPaid = (id) => {
        setFeesList((prev) =>
            prev.map((f) => (f.id === id ? { ...f, paid: true } : f))
        );
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <FaDollarSign className="text-green-600" /> Fees Payment Tracking
                </h1>

                <table className="min-w-full border rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Student</th>
                            <th className="p-3 text-left">Class</th>
                            <th className="p-3 text-left">Amount (GH₵)</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feesList.map((f) => (
                            <tr key={f.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{f.student}</td>
                                <td className="p-3">{f.class}</td>
                                <td className="p-3">{f.amount}</td>
                                <td className="p-3">
                                    {f.paid ? (
                                        <span className="text-green-600 flex items-center gap-1">
                                            <FaCheckCircle /> Paid
                                        </span>
                                    ) : (
                                        <span className="text-red-600">Pending</span>
                                    )}
                                </td>
                                <td className="p-3">
                                    {!f.paid && (
                                        <button
                                            onClick={() => markPaid(f.id)}
                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                        >
                                            Mark as Paid
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default FeesTracking;

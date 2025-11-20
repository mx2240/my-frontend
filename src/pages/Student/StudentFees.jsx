// src/pages/Student/Fees.jsx
import React, { useEffect, useState } from "react";
import StudentLayout from "../../layouts/AdminLayout"

const StudentFees = () => {
    const [fees, setFees] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function loadFees() {
            try {
                const res = await fetch("/api/fees/my-fees", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setFees(data);
            } catch (err) {
                console.error("Failed to fetch fees:", err);
            }
        }
        loadFees();
    }, [token]);

    return (
        <StudentLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">My Fees</h1>

                {fees.length === 0 ? (
                    <p>No fees assigned yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border rounded">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4 border">Class</th>
                                    <th className="py-2 px-4 border">Amount (GH₵)</th>
                                    <th className="py-2 px-4 border">Due Date</th>
                                    <th className="py-2 px-4 border">Paid</th>
                                    <th className="py-2 px-4 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fees.map((f) => (
                                    <tr key={f._id}>
                                        <td className="py-2 px-4 border">{f.className}</td>
                                        <td className="py-2 px-4 border">{f.amount}</td>
                                        <td className="py-2 px-4 border">{new Date(f.dueDate).toLocaleDateString()}</td>
                                        <td className="py-2 px-4 border">{f.paid ? "Yes" : "No"}</td>
                                        <td className="py-2 px-4 border">
                                            {!f.paid && (
                                                <button
                                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                                    onClick={() => alert("Payment functionality coming soon!")}
                                                >
                                                    Pay Now
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </StudentLayout>
    );
};

export default StudentFees;

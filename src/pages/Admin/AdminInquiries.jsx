// src/pages/Admin/AdminInquiries.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from '../../layouts/AdminLayout'

const AdminInquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const token = localStorage.getItem("token");

    // Fetch inquiries from backend
    const fetchInquiries = async () => {
        try {
            const res = await fetch("/api/inquiries", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setInquiries(data);
        } catch (err) {
            console.error("Failed to fetch inquiries:", err);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    // Toggle solved status
    const toggleSolved = async (id, currentStatus) => {
        try {
            const res = await fetch(`/api/inquiries/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ solved: !currentStatus }),
            });
            if (res.ok) {
                setInquiries((prev) =>
                    prev.map((inq) =>
                        inq._id === id ? { ...inq, solved: !currentStatus } : inq
                    )
                );
            }
        } catch (err) {
            console.error("Failed to update inquiry:", err);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Student Inquiries</h1>

                {inquiries.length === 0 ? (
                    <p>No inquiries found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border rounded">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4 border">Sender</th>
                                    <th className="py-2 px-4 border">Message</th>
                                    <th className="py-2 px-4 border">Date</th>
                                    <th className="py-2 px-4 border">Status</th>
                                    <th className="py-2 px-4 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inquiries.map((inq) => (
                                    <tr key={inq._id}>
                                        <td className="py-2 px-4 border">{inq.senderName || inq.sender}</td>
                                        <td className="py-2 px-4 border">{inq.message}</td>
                                        <td className="py-2 px-4 border">
                                            {new Date(inq.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-2 px-4 border">
                                            {inq.solved ? "Solved ✅" : "Pending ❌"}
                                        </td>
                                        <td className="py-2 px-4 border">
                                            <button
                                                className={`px-3 py-1 rounded ${inq.solved
                                                    ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                                    : "bg-green-600 text-white hover:bg-green-700"
                                                    }`}
                                                onClick={() => toggleSolved(inq._id, inq.solved)}
                                            >
                                                {inq.solved ? "Mark as Pending" : "Mark as Solved"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminInquiries;

import React, { useEffect, useState } from "react";
import fetch from "../../fetch";
import Studentlayout from '../../layouts/StudentLayout'

const API_URL = "https://my-backend-amber.vercel.app/api/student/fees";

function StudentFees() {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchFees();
    }, []);

    const fetchFees = async () => {
        try {
            const token = localStorage.getItem("studentToken");

            if (!token) {
                setError("No token found — please login again");
                setLoading(false);
                return;
            }

            const res = await fetch.get(`${API_URL}/my-fees`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.ok) {
                setFees(res.data.fees);
            } else {
                setError(res.data.message || "Failed to load fees");
            }
        } catch (err) {
            console.error("Fees fetch error:", err);
            setError("Server error");
        }

        setLoading(false);
    };

    return (
        <Studentlayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-blue-700">📘 My Fees</h1>

                {/* Loading */}
                {loading && (
                    <p className="text-center text-gray-600">Loading fees...</p>
                )}

                {/* Error */}
                {error && (
                    <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
                        {error}
                    </p>
                )}

                {/* Fees Table */}
                {!loading && !error && fees.length === 0 && (
                    <p className="text-center text-gray-500">No fees assigned yet.</p>
                )}

                {!loading && fees.length > 0 && (
                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-blue-600 text-white text-left">
                                    <th className="p-3">Fee Title</th>
                                    <th className="p-3">Amount</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Assigned On</th>
                                </tr>
                            </thead>

                            <tbody>
                                {fees.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="p-3 font-medium">{item.fee?.title}</td>
                                        <td className="p-3 text-green-700 font-semibold">
                                            GH₵{item.fee?.amount}
                                        </td>
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 rounded text-white text-sm ${item.status === "paid"
                                                    ? "bg-green-600"
                                                    : "bg-red-500"
                                                    }`}
                                            >
                                                {item.status?.toUpperCase() || "UNPAID"}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Studentlayout>
    );
}

export default StudentFees;

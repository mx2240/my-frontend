import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import { api } from "../../api";

export default function FeeTracking() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadRecords = async () => {
        try {
            setLoading(true);
            const r = await api("/fees/records");
            if (r.ok) setRecords(r.body);
            else toast.error(r.message || "Failed to fetch records");
        } catch (err) {
            console.error(err);
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRecords();
    }, []);

    const setStatus = async (id, status) => {
        try {
            const r = await api(`/fees/status/${id}`, "PUT", { status });
            if (r.ok) {
                toast.success("Status updated");
                loadRecords();
            } else toast.error(r.message || "Failed to update status");
        } catch (err) {
            console.error(err);
            toast.error("Server error");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Fee Tracking</h2>
                {loading && <p>Loading records...</p>}
                <div className="space-y-4">
                    {records.map((r) => (
                        <div key={r._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                            <div>
                                <div className="font-bold">{r.student?.name}</div>
                                <div>{r.fee?.title} — GH₵{r.fee?.amount}</div>
                                <div className="text-sm text-gray-600">Status: {r.status}</div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setStatus(r._id, "paid")}
                                    className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition"
                                >
                                    Paid
                                </button>
                                <button
                                    onClick={() => setStatus(r._id, "pending")}
                                    className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition"
                                >
                                    Pending
                                </button>
                                <button
                                    onClick={() => setStatus(r._id, "unpaid")}
                                    className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition"
                                >
                                    Unpaid
                                </button>
                            </div>
                        </div>
                    ))}
                    {records.length === 0 && !loading && <p className="text-gray-500">No fee records found.</p>}
                </div>
            </div>
        </AdminLayout>
    );
}

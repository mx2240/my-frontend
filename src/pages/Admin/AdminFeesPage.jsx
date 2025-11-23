import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import fetch from "../../fetch";

export default function AdminFeesPage() {
    const [fees, setFees] = useState([]);
    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newFee, setNewFee] = useState({ title: "", amount: "", description: "" });

    const [assignData, setAssignData] = useState({
        studentId: "",
        feeId: ""
    });

    // Modal control
    const [showAssignModal, setShowAssignModal] = useState(false);

    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = async () => {
        try {
            setLoading(true);

            const fRes = await fetch.get("/fees");
            setFees(Array.isArray(fRes.data) ? fRes.data : []);

            const sRes = await fetch.get("/admin/students/all");
            setStudents(Array.isArray(sRes.data.students) ? sRes.data.students : []);

            const aRes = await fetch.get("/fees/assigned");
            setAssignments(Array.isArray(aRes.data) ? aRes.data : []);

        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    // Add new fee
    const addFee = async () => {
        if (!newFee.title || !newFee.amount) {
            return toast.error("Title and amount required");
        }
        try {
            await fetch.post("/fees", newFee);
            toast.success("Fee created");
            setNewFee({ title: "", amount: "", description: "" });
            loadAll();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create fee");
        }
    };

    // Assign fee
    const assignFee = async () => {
        if (!assignData.studentId || !assignData.feeId) {
            return toast.error("Select student and fee");
        }
        try {
            await fetch.post("/fees/assign", assignData);
            toast.success("Fee assigned");
            setAssignData({ studentId: "", feeId: "" });
            setShowAssignModal(false);
            loadAll();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to assign");
        }
    };

    // Payment update
    const markPaid = async (id) => {
        try {
            await fetch.post(`/fees/pay/${id}`);
            toast.success("Payment updated");
            loadAll();
        } catch {
            toast.error("Failed to update payment");
        }
    };

    // Delete fee
    const deleteFee = async (id) => {
        try {
            await fetch.delete(`/fees/${id}`);
            toast.success("Fee deleted");
            loadAll();
        } catch {
            toast.error("Failed to delete");
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <p className="p-6 text-gray-500">Loading...</p>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Fees & Tracking Dashboard</h2>

                {/* -------------------------------- */}
                {/* CREATE FEE SECTION */}
                {/* -------------------------------- */}
                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">Create Fee Type</h3>

                    <div className="grid md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Fee Title"
                            className="border p-3 rounded"
                            value={newFee.title}
                            onChange={(e) => setNewFee({ ...newFee, title: e.target.value })}
                        />

                        <input
                            type="number"
                            placeholder="Amount"
                            className="border p-3 rounded"
                            value={newFee.amount}
                            onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
                        />

                        <input
                            type="text"
                            placeholder="Description"
                            className="border p-3 rounded"
                            value={newFee.description}
                            onChange={(e) => setNewFee({ ...newFee, description: e.target.value })}
                        />
                    </div>

                    <button
                        onClick={addFee}
                        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                    >
                        Add Fee
                    </button>
                </div>

                {/* -------------------------------- */}
                {/* ASSIGN FEE MODAL BUTTON */}
                {/* -------------------------------- */}
                <button
                    onClick={() => setShowAssignModal(true)}
                    className="bg-purple-600 text-white py-2 px-6 rounded mb-6 hover:bg-purple-700"
                >
                    Assign Fee to Student
                </button>

                {/* -------------------------------- */}
                {/* ASSIGN FEE MODAL */}
                {/* -------------------------------- */}
                {showAssignModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold mb-4 text-gray-700">Assign Fee</h3>

                            <select
                                className="w-full border p-3 rounded mb-3"
                                value={assignData.studentId}
                                onChange={(e) =>
                                    setAssignData({ ...assignData, studentId: e.target.value })
                                }
                            >
                                <option value="">Select Student</option>
                                {students.map((s) => (
                                    <option key={s._id} value={s._id}>
                                        {s.name} ({s.email})
                                    </option>
                                ))}
                            </select>

                            <select
                                className="w-full border p-3 rounded mb-3"
                                value={assignData.feeId}
                                onChange={(e) =>
                                    setAssignData({ ...assignData, feeId: e.target.value })
                                }
                            >
                                <option value="">Select Fee</option>
                                {fees.map((f) => (
                                    <option key={f._id} value={f._id}>
                                        {f.title} – GH₵{f.amount}
                                    </option>
                                ))}
                            </select>

                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => setShowAssignModal(false)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={assignFee}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Assign
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* -------------------------------- */}
                {/* ASSIGNED FEES LIST */}
                {/* -------------------------------- */}
                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">Assigned Fees</h3>

                    {assignments.length === 0 ? (
                        <p className="text-gray-500">No fees assigned yet.</p>
                    ) : (
                        assignments.map((a) => (
                            <div
                                key={a._id}
                                className="p-4 border rounded-lg flex justify-between items-center mb-3"
                            >
                                <div>
                                    <p className="font-bold">{a.student?.name}</p>
                                    <p className="text-gray-600">
                                        Fee: {a.fee?.title} – GH₵{a.fee?.amount}
                                    </p>
                                    <p
                                        className={`font-semibold mt-1 ${a.status === "paid"
                                                ? "text-green-600"
                                                : "text-red-500"
                                            }`}
                                    >
                                        Status: {a.status?.toUpperCase()}
                                    </p>
                                </div>

                                {a.status !== "paid" && (
                                    <button
                                        onClick={() => markPaid(a._id)}
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    >
                                        Mark Paid
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

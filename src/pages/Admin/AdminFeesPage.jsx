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
    const [assign, setAssign] = useState({ studentId: "", feeId: "" });

    // Load all on mount
    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = async () => {
        try {
            setLoading(true);

            // Fetch fees
            const fRes = await fetch.get("/fees");
            setFees(Array.isArray(fRes.data) ? fRes.data : []);

            // Fetch students
            const sRes = await fetch.get("/admin/students/all");
            setStudents(Array.isArray(sRes.data) ? sRes.data : []);

            // Fetch assigned fees
            const aRes = await fetch.get("/fees/assigned");
            setAssignments(Array.isArray(aRes.data) ? aRes.data : []);

        } catch (err) {
            console.error("Load all error:", err);
            toast.error(err.response?.data?.message || "Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    // Add new fee
    const addFee = async () => {
        if (!newFee.title || !newFee.amount) return toast.error("Fill all required fields");
        try {
            await fetch.post("/fees", newFee);
            toast.success("Fee added");
            setNewFee({ title: "", amount: "", description: "" });
            loadAll();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add fee");
        }
    };

    // Assign fee to student
    const assignFee = async () => {
        if (!assign.studentId || !assign.feeId) return toast.error("Select student & fee");
        try {
            await fetch.post("/fees/assign", assign);
            toast.success("Fee assigned");
            setAssign({ studentId: "", feeId: "" });
            loadAll();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to assign fee");
        }
    };

    // Mark fee as paid
    const markPaid = async (id) => {
        try {
            await fetch.post(`/fees/pay/${id}`);
            toast.success("Marked as paid");
            loadAll();
        } catch (err) {
            toast.error("Failed to update payment");
        }
    };

    // Delete fee
    const delFee = async (id) => {
        try {
            await fetch.delete(`/fees/${id}`);
            toast.success("Deleted fee");
            loadAll();
        } catch (err) {
            toast.error("Failed to delete");
        }
    };

    if (loading) return <AdminLayout><p className="p-6 text-gray-600">Loading...</p></AdminLayout>;

    return (
        <AdminLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Fees & Tracking Dashboard</h2>

                {/* --- Add Fee --- */}
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
                    <button onClick={addFee} className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
                        Add Fee
                    </button>
                </div>

                {/* --- Assign Fee --- */}
                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">Assign Fee to Student</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <select
                            value={assign.studentId}
                            onChange={(e) => setAssign({ ...assign, studentId: e.target.value })}
                            className="border p-3 rounded"
                        >
                            <option value="">Select Student</option>
                            {students.map((s) => (
                                <option key={s._id} value={s._id}>{s.name} ({s.email})</option>
                            ))}
                        </select>

                        <select
                            value={assign.feeId}
                            onChange={(e) => setAssign({ ...assign, feeId: e.target.value })}
                            className="border p-3 rounded"
                        >
                            <option value="">Select Fee</option>
                            {fees.map((f) => (
                                <option key={f._id} value={f._id}>{f.title} – GH₵{f.amount}</option>
                            ))}
                        </select>

                        <button onClick={assignFee} className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700">
                            Assign
                        </button>
                    </div>
                </div>

                {/* --- Assigned Fees --- */}
                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">Student Fee Tracking</h3>
                    {assignments.length === 0 ? (
                        <p className="text-gray-500">No fees assigned yet.</p>
                    ) : (
                        assignments.map((a) => (
                            <div key={a._id} className="p-4 border rounded-lg flex justify-between items-center mb-3">
                                <div>
                                    <p className="font-bold">{a.student?.name}</p>
                                    <p className="text-gray-600">Fee: {a.fee?.title} – GH₵{a.fee?.amount}</p>
                                    <p className={`font-semibold mt-1 ${a.status === "paid" ? "text-green-600" : "text-red-500"}`}>
                                        Status: {a.status?.toUpperCase() || "UNPAID"}
                                    </p>
                                </div>
                                {a.status !== "paid" && (
                                    <button onClick={() => markPaid(a._id)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
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

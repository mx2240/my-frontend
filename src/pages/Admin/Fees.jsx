import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import { api } from "../../api";

export default function AdminFeesPage() {
    const [fees, setFees] = useState([]);
    const [students, setStudents] = useState([]);
    const [newFee, setNewFee] = useState({ title: "", amount: "" });
    const [assign, setAssign] = useState({ studentId: "", feeId: "" });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const f = await api("/fees");
            if (f.ok && Array.isArray(f.body)) setFees(f.body);
            else setFees([]);

            const s = await api("/admin/students");
            if (s.ok && Array.isArray(s.body)) setStudents(s.body);
            else setStudents([]);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load data");
        }
    };

    const addFee = async () => {
        if (!newFee.title || newFee.amount === "") return toast.error("Fill all fields");
        try {
            const res = await api("/fees", "POST", newFee);
            if (res.ok) {
                toast.success("Fee added");
                setNewFee({ title: "", amount: "" });
                loadData();
            } else toast.error(res.message || "Failed to add fee");
        } catch (err) {
            console.error(err);
            toast.error("Server error");
        }
    };

    const assignFee = async () => {
        if (!assign.studentId || !assign.feeId) return toast.error("Select both student and fee");
        try {
            const res = await api("/fees/assign", "POST", assign);
            if (res.ok) {
                toast.success("Fee assigned");
                setAssign({ studentId: "", feeId: "" });
                loadData();
            } else toast.error(res.message || "Failed to assign fee");
        } catch (err) {
            console.error(err);
            toast.error("Server error");
        }
    };

    const deleteFee = async (id) => {
        try {
            const res = await api(`/fees/${id}`, "DELETE");
            if (res.ok) {
                toast.success("Fee deleted");
                loadData();
            } else toast.error(res.message || "Failed to delete fee");
        } catch (err) {
            console.error(err);
            toast.error("Server error");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Fees Management</h2>

                {/* Add Fee */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <input
                        className="border p-3 rounded"
                        placeholder="Title"
                        value={newFee.title}
                        onChange={(e) => setNewFee({ ...newFee, title: e.target.value })}
                    />
                    <input
                        className="border p-3 rounded"
                        type="number"
                        placeholder="Amount"
                        value={newFee.amount}
                        onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
                    />
                    <button onClick={addFee} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Add Fee
                    </button>
                </div>

                {/* Assign Fee */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <select
                        value={assign.studentId}
                        onChange={(e) => setAssign({ ...assign, studentId: e.target.value })}
                        className="border p-3 rounded"
                    >
                        <option value="">Select student</option>
                        {Array.isArray(students) &&
                            students.map((s) => (
                                <option key={s._id} value={s._id}>
                                    {s.name}
                                </option>
                            ))}
                    </select>

                    <select
                        value={assign.feeId}
                        onChange={(e) => setAssign({ ...assign, feeId: e.target.value })}
                        className="border p-3 rounded"
                    >
                        <option value="">Select fee</option>
                        {Array.isArray(fees) &&
                            fees.map((f) => (
                                <option key={f._id} value={f._id}>
                                    {f.title} — GH₵{f.amount}
                                </option>
                            ))}
                    </select>

                    <button onClick={assignFee} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Assign Fee
                    </button>
                </div>

                {/* Fees List */}
                <div className="space-y-4">
                    {Array.isArray(fees) &&
                        fees.map((f) => (
                            <div
                                key={f._id}
                                className="p-4 bg-white rounded shadow flex justify-between items-center"
                            >
                                <div>
                                    <h4 className="font-bold">{f.title}</h4>
                                    <p>GH₵{f.amount}</p>
                                </div>
                                <button
                                    onClick={() => deleteFee(f._id)}
                                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </AdminLayout>
    );
}

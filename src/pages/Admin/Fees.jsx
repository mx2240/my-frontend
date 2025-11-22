import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import fetch from "../../fetch"; // axios instance with token

export default function AdminFeesPage() {
    const [fees, setFees] = useState([]);
    const [students, setStudents] = useState([]);
    const [newFee, setNewFee] = useState({ title: "", amount: "" });
    const [assign, setAssign] = useState({ studentId: "", feeId: "" });

    useEffect(() => {
        load();
    }, []);

    // Load fees and students
    const load = async () => {
        try {
            const fRes = await fetch.get("/fees");
            setFees(fRes.data);

            const sRes = await fetch.get("/students");
            setStudents(sRes.data);
        } catch (err) {
            console.error("Error loading fees/students:", err.response?.data || err.message);
            toast.error("Failed to load data");
        }
    };

    // Add new fee
    const addFee = async () => {
        if (!newFee.title || newFee.amount === "") return toast.error("Fill all fields");
        try {
            const res = await fetch.post("/fees", newFee);
            toast.success("Fee added");
            setNewFee({ title: "", amount: "" });
            load();
        } catch (err) {
            console.error("Error adding fee:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Failed to add fee");
        }
    };

    // Assign fee to student
    const assignFee = async () => {
        if (!assign.studentId || !assign.feeId) return toast.error("Select student and fee");
        try {
            const res = await fetch.post("/fees/assign", assign);
            toast.success("Fee assigned");
            setAssign({ studentId: "", feeId: "" });
        } catch (err) {
            console.error("Error assigning fee:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Failed to assign fee");
        }
    };

    // Delete fee
    const del = async (id) => {
        try {
            await fetch.delete(`/fees/${id}`);
            toast.success("Deleted");
            load();
        } catch (err) {
            console.error("Error deleting fee:", err.response?.data || err.message);
            toast.error("Failed to delete");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Fees</h2>

                {/* Add Fee */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <input
                        className="border p-3 rounded"
                        placeholder="Title"
                        value={newFee.title}
                        onChange={e => setNewFee({ ...newFee, title: e.target.value })}
                    />
                    <input
                        className="border p-3 rounded"
                        type="number"
                        placeholder="Amount"
                        value={newFee.amount}
                        onChange={e => setNewFee({ ...newFee, amount: e.target.value })}
                    />
                    <button onClick={addFee} className="bg-blue-600 text-white rounded px-4 py-2">
                        Add Fee
                    </button>
                </div>

                {/* Assign Fee */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <select
                        value={assign.studentId}
                        onChange={e => setAssign({ ...assign, studentId: e.target.value })}
                        className="border p-3 rounded"
                    >
                        <option value="">Select student</option>
                        {students.map(s => (
                            <option key={s._id} value={s._id}>{s.name}</option>
                        ))}
                    </select>
                    <select
                        value={assign.feeId}
                        onChange={e => setAssign({ ...assign, feeId: e.target.value })}
                        className="border p-3 rounded"
                    >
                        <option value="">Select fee</option>
                        {fees.map(f => (
                            <option key={f._id} value={f._id}>{f.title} - GH₵{f.amount}</option>
                        ))}
                    </select>
                    <button onClick={assignFee} className="bg-green-600 text-white rounded px-4 py-2">
                        Assign Fee
                    </button>
                </div>

                {/* Fee List */}
                <div className="space-y-4">
                    {fees.map(f => (
                        <div key={f._id} className="p-4 bg-white rounded shadow flex justify-between">
                            <div>
                                <h4 className="font-bold">{f.title}</h4>
                                <p>GH₵{f.amount}</p>
                                {f.description && <p className="text-sm text-gray-600">{f.description}</p>}
                            </div>
                            <button onClick={() => del(f._id)} className="bg-red-500 text-white px-3 py-2 rounded">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}

// src/pages/Admin/AdminFeesPage.jsx
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

    useEffect(() => { loadAll(); }, []);

    const loadAll = async () => {
        try {
            setLoading(true);
            const [fRes, sRes, aRes] = await Promise.allSettled([
                fetch.get("/fees"),
                fetch.get("/admin/students/all"),
                fetch.get("/fees/assigned"),
            ]);

            // fees
            if (fRes.status === "fulfilled") setFees(Array.isArray(fRes.value.data) ? fRes.value.data : []);
            else { console.error("fees load failed:", fRes.reason); setFees([]); }

            // students (flat array)
            if (sRes.status === "fulfilled") setStudents(Array.isArray(sRes.value.data) ? sRes.value.data : []);
            else { console.error("students load failed:", sRes.reason); setStudents([]); }

            // assignments
            if (aRes.status === "fulfilled") setAssignments(Array.isArray(aRes.value.data) ? aRes.value.data : []);
            else { console.error("assignments load failed:", aRes.reason); setAssignments([]); }

        } catch (err) {
            console.error("Load all error:", err);
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const addFee = async () => {
        if (!newFee.title || newFee.amount === "") return toast.error("Fill required fields");
        try { await fetch.post("/fees", newFee); toast.success("Fee added"); setNewFee({ title: "", amount: "", description: "" }); loadAll(); }
        catch (err) { toast.error(err.message || err?.message || "Failed to add fee"); }
    };

    const assignFee = async () => {
        if (!assign.studentId || !assign.feeId) return toast.error("Select student & fee");
        try { await fetch.post("/fees/assign", assign); toast.success("Assigned"); setAssign({ studentId: "", feeId: "" }); loadAll(); }
        catch (err) { toast.error(err.message || "Failed to assign fee"); }
    };

    const markPaid = async (id) => {
        try { await fetch.post(`/fees/pay/${id}`); toast.success("Marked paid"); loadAll(); }
        catch (err) { toast.error("Failed to mark paid"); }
    };

    const delFee = async (id) => {
        try { await fetch.delete(`/fees/${id}`); toast.success("Deleted"); loadAll(); }
        catch (err) { toast.error("Failed to delete"); }
    };

    if (loading) return <AdminLayout><p className="p-6 text-gray-600">Loading...</p></AdminLayout>;

    return (
        <AdminLayout>
            <div className="p-6 max-w-6xl mx-auto space-y-8">
                <h2 className="text-4xl font-bold">Fees & Tracking Dashboard</h2>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-2xl font-semibold mb-4">Create Fee Type</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <input type="text" placeholder="Title" value={newFee.title} onChange={e => setNewFee({ ...newFee, title: e.target.value })} className="border p-3 rounded" />
                        <input type="number" placeholder="Amount" value={newFee.amount} onChange={e => setNewFee({ ...newFee, amount: e.target.value })} className="border p-3 rounded" />
                        <input type="text" placeholder="Description" value={newFee.description} onChange={e => setNewFee({ ...newFee, description: e.target.value })} className="border p-3 rounded" />
                    </div>
                    <button onClick={addFee} className="mt-4 bg-blue-600 text-white py-2 px-6 rounded">Add Fee</button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-2xl font-semibold mb-4">Assign Fee to Student</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <select className="border p-3 rounded" value={assign.studentId} onChange={e => setAssign({ ...assign, studentId: e.target.value })}>
                            <option value="">Select Student</option>
                            {students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)}
                        </select>

                        <select className="border p-3 rounded" value={assign.feeId} onChange={e => setAssign({ ...assign, feeId: e.target.value })}>
                            <option value="">Select Fee</option>
                            {fees.map(f => <option key={f._id} value={f._1d}>{f.title} – GH₵{f.amount}</option>)}
                        </select>

                        <button onClick={assignFee} className="bg-green-600 text-white py-2 px-6 rounded">Assign</button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-2xl font-semibold mb-4">Student Fee Tracking</h3>
                    {assignments.length === 0 ? <p className="text-gray-500">No fees assigned yet.</p> : assignments.map(a => (
                        <div key={a._id} className="p-4 border rounded-lg flex justify-between items-center mb-3">
                            <div>
                                <p className="font-bold">{a.student?.name}</p>
                                <p className="text-gray-600">Fee: {a.fee?.title} – GH₵{a.fee?.amount}</p>
                                <p className={`font-semibold ${a.status === "paid" ? "text-green-600" : "text-red-500"}`}>Status: {a.status?.toUpperCase()}</p>
                            </div>
                            {a.status !== "paid" && <button onClick={() => markPaid(a._id)} className="bg-green-600 text-white px-4 py-2 rounded">Mark Paid</button>}
                        </div>
                    ))}
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-2xl font-semibold mb-4">All Fee Types</h3>
                    {fees.length === 0 ? <p className="text-gray-500">No fees created yet.</p> : fees.map(f => (
                        <div key={f._id} className="p-4 border rounded-lg flex justify-between items-center mb-3">
                            <div><p className="font-bold">{f.title}</p><p className="text-gray-600">GH₵{f.amount}</p></div>
                            <button onClick={() => delFee(f._id)} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}

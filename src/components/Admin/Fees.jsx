import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import fetch from "../../fetch";

// --- Helper to always return a VALID array ---
const safeList = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.body)) return data.body;
    return [];
};

export default function AdminFeesPage() {
    const [fees, setFees] = useState([]);
    const [students, setStudents] = useState([]);
    const [tracking, setTracking] = useState([]);

    const [loading, setLoading] = useState(true);

    const [newFee, setNewFee] = useState({
        title: "",
        amount: "",
        description: "",
    });

    const [assign, setAssign] = useState({
        studentId: "",
        feeId: "",
    });

    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = async () => {
        try {
            setLoading(true);

            const fRes = await fetch.get("/fees");
            const sRes = await fetch.get("/admin/students");
            const tRes = await fetch.get("/fees/assigned");

            setFees(safeList(fRes.data));
            setStudents(safeList(sRes.data));
            setTracking(safeList(tRes.data));

        } catch (err) {
            console.error("LOAD ERROR:", err.response?.data || err.message);
            toast.error("Failed loading fees/students");
        }
        setLoading(false);
    };

    // Add Fee
    const addFee = async () => {
        if (!newFee.title || !newFee.amount)
            return toast.error("Fill required fields");

        try {
            await fetch.post("/fees", newFee);
            toast.success("Fee created");
            setNewFee({ title: "", amount: "", description: "" });
            loadAll();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add fee");
        }
    };

    // Assign Fee
    const assignFee = async () => {
        if (!assign.studentId || !assign.feeId)
            return toast.error("Select student and fee");

        try {
            await fetch.post("/fees/assign", assign);
            toast.success("Fee assigned");
            setAssign({ studentId: "", feeId: "" });
            loadAll();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to assign fee");
        }
    };

    // Delete fee
    const deleteFee = async (id) => {
        try {
            await fetch.delete(`/fees/${id}`);
            toast.success("Fee deleted");
            loadAll();
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto space-y-10">

                {/* PAGE HEADER */}
                <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                    Fees & Payment Tracking
                </h2>

                {/* ADD FEE */}
                <div className="bg-white p-6 rounded-xl shadow-xl space-y-4 border-l-4 border-blue-600">
                    <h3 className="text-xl font-semibold text-gray-700">Add New Fee</h3>

                    <div className="grid md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Fee Title"
                            value={newFee.title}
                            onChange={(e) => setNewFee({ ...newFee, title: e.target.value })}
                            className="border p-3 rounded w-full"
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={newFee.amount}
                            onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
                            className="border p-3 rounded w-full"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={newFee.description}
                            onChange={(e) =>
                                setNewFee({ ...newFee, description: e.target.value })
                            }
                            className="border p-3 rounded w-full"
                        />
                    </div>

                    <button
                        onClick={addFee}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Add Fee
                    </button>
                </div>

                {/* ASSIGN FEE */}
                <div className="bg-white p-6 rounded-xl shadow-xl space-y-4 border-l-4 border-green-600">
                    <h3 className="text-xl font-semibold text-gray-700">Assign Fee to Student</h3>

                    <div className="grid md:grid-cols-3 gap-4">
                        <select
                            value={assign.studentId}
                            onChange={(e) =>
                                setAssign({ ...assign, studentId: e.target.value })
                            }
                            className="border p-3 rounded"
                        >
                            <option value="">Select Student</option>
                            {students.map((s) => (
                                <option key={s._id} value={s._id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={assign.feeId}
                            onChange={(e) =>
                                setAssign({ ...assign, feeId: e.target.value })
                            }
                            className="border p-3 rounded"
                        >
                            <option value="">Select Fee</option>
                            {fees.map((f) => (
                                <option key={f._id} value={f._id}>
                                    {f.title} – GH₵{f.amount}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={assignFee}
                            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                        >
                            Assign
                        </button>
                    </div>
                </div>

                {/* FEES LIST */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">All Fees</h3>

                    {fees.length === 0 ? (
                        <p>No fees available.</p>
                    ) : (
                        fees.map((f) => (
                            <div
                                key={f._id}
                                className="p-4 bg-white rounded-xl shadow-md flex justify-between items-center hover:shadow-xl transition"
                            >
                                <div>
                                    <h4 className="font-bold text-gray-800">{f.title}</h4>
                                    <p className="text-gray-600">GH₵{f.amount}</p>
                                    {f.description && (
                                        <p className="text-sm text-gray-500">{f.description}</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => deleteFee(f._id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* FEE TRACKING */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Fee Payment Tracking
                    </h3>

                    {tracking.length === 0 ? (
                        <p>No fee assignments yet.</p>
                    ) : (
                        tracking.map((t) => (
                            <div
                                key={t._id}
                                className="p-4 bg-gray-50 border rounded-xl shadow-sm"
                            >
                                <h4 className="font-semibold text-lg text-gray-800">
                                    {t.student?.name}
                                </h4>
                                <p className="text-gray-700">
                                    Fee: <strong>{t.fee?.title}</strong> – GH₵{t.fee?.amount}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Status:{" "}
                                    <span className="font-semibold text-green-600">
                                        {t.status || "Pending"}
                                    </span>
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

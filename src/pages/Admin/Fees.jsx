// src/pages/Admin/FeesPage.jsx
import React, { useEffect, useState } from "react";
import { FaMoneyBill, FaPlus, FaTrash, FaUserPlus, FaCheckCircle } from "react-icons/fa";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";

const AdminFeesPage = () => {
    const [fees, setFees] = useState([]);
    const [students, setStudents] = useState([]);
    const [assignData, setAssignData] = useState({ studentId: "", feeId: "" });
    const [newFee, setNewFee] = useState({ title: "", amount: "" });
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            fetchFees();
            fetchStudents();
        }
    }, []);

    const fetchFees = async () => {
        try {
            const res = await fetch(`${process.env}/fees`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setFees(Array.isArray(data) ? data : []);
        } catch (err) { console.error(err); }
    };

    const fetchStudents = async () => {
        try {
            const res = await fetch(`${process.env}/students`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setStudents(Array.isArray(data) ? data : []);
        } catch (err) { console.error(err); }
    };

    const addFee = async () => {
        if (!newFee.title || !newFee.amount) return toast.error("Fill all fields");
        try {
            const res = await fetch(`${process.env}/fees`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(newFee),
            });
            const data = await res.json();
            if (res.ok) { toast.success("Fee added"); setNewFee({ title: "", amount: "" }); fetchFees(); }
            else toast.error(data.message || "Failed");
        } catch (err) { console.error(err); }
    };

    const assignFee = async () => {
        if (!assignData.studentId || !assignData.feeId) return toast.error("Select both fields");
        try {
            const res = await fetch(`${process.env}/fees/assign`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(assignData),
            });
            const data = await res.json();
            if (res.ok) { toast.success("Fee assigned"); setAssignData({ studentId: "", feeId: "" }); }
            else toast.error(data.message || "Failed");
        } catch (err) { console.error(err); }
    };

    const deleteFee = async (id) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/fees/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) { toast.success("Deleted"); fetchFees(); }
            else toast.error("Failed to delete");
        } catch (err) { console.error(err); }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6 flex items-center gap-3"><FaMoneyBill className="text-green-600" /> Fees Management</h1>

                {/* ADD FEE */}
                <div className="bg-white rounded-xl p-6 shadow-md mb-8">
                    <h2 className="text-xl font-semibold mb-4">Add New Fee</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input type="text" placeholder="Fee Title" value={newFee.title} onChange={(e) => setNewFee({ ...newFee, title: e.target.value })} className="border p-3 rounded-lg" />
                        <input type="number" placeholder="Fee Amount" value={newFee.amount} onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })} className="border p-3 rounded-lg" />
                        <button onClick={addFee} className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"><FaPlus /> Add Fee</button>
                    </div>
                </div>

                {/* ASSIGN FEE */}
                <div className="bg-white rounded-xl p-6 shadow-md mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FaUserPlus className="text-purple-600" /> Assign Fee to Student</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select value={assignData.studentId} onChange={(e) => setAssignData({ ...assignData, studentId: e.target.value })} className="border p-3 rounded-lg">
                            <option value="">Select Student</option>
                            {students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                        </select>
                        <select value={assignData.feeId} onChange={(e) => setAssignData({ ...assignData, feeId: e.target.value })} className="border p-3 rounded-lg">
                            <option value="">Select Fee</option>
                            {fees.map(f => <option key={f._id} value={f._id}>{f.title} — GH₵{f.amount}</option>)}
                        </select>
                        <button onClick={assignFee} className="flex items-center justify-center gap-2 bg-green-600 text-white rounded-lg p-3 hover:bg-green-700"><FaCheckCircle /> Assign Fee</button>
                    </div>
                </div>

                {/* FEES LIST */}
                <h2 className="text-xl font-semibold mb-4">All Fees</h2>
                <div className="space-y-4">
                    {fees.map(f => (
                        <div key={f._id} className="flex justify-between items-center p-5 bg-white rounded-xl shadow">
                            <div>
                                <h3 className="text-lg font-bold">{f.title}</h3>
                                <p className="text-gray-600">GH₵{f.amount}</p>
                            </div>
                            <button onClick={() => deleteFee(f._id)} className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"><FaTrash /></button>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminFeesPage;

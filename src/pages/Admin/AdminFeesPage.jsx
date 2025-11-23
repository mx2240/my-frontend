import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import fetch from "../../fetch";
import { jsPDF } from "jspdf";

export default function AdminFeesPage() {
    const [fees, setFees] = useState([]);
    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newFee, setNewFee] = useState({ title: "", amount: "", description: "" });
    const [assignData, setAssignData] = useState({ studentId: "", feeId: "" });
    const [studentSearch, setStudentSearch] = useState("");
    const [studentClassFilter, setStudentClassFilter] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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

            // Fetch assigned fees with pagination
            loadAssignments(currentPage);
        } catch (err) {
            console.error("Load all error:", err);
            toast.error(err.response?.data?.message || "Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const loadAssignments = async (page = 1) => {
        try {
            const aRes = await fetch.get(`/fees/assigned?page=${page}&limit=5`);
            setAssignments(Array.isArray(aRes.data.assignments) ? aRes.data.assignments : []);
            setTotalPages(aRes.data.totalPages || 1);
            setCurrentPage(aRes.data.page || 1);
        } catch (err) {
            toast.error("Failed to load assigned fees");
        }
    };

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

    const assignFee = async () => {
        if (!assignData.studentId || !assignData.feeId) return toast.error("Select student & fee");
        try {
            await fetch.post("/fees/assign", assignData);
            toast.success("Fee assigned");
            setAssignData({ studentId: "", feeId: "" });
            loadAssignments(currentPage);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to assign fee");
        }
    };

    const markPaid = async (id) => {
        try {
            await fetch.post(`/fees/pay/${id}`);
            toast.success("Marked as paid");
            loadAssignments(currentPage);
        } catch (err) {
            toast.error("Failed to update payment");
        }
    };

    const delFee = async (id) => {
        if (!window.confirm("Are you sure you want to delete this fee?")) return;
        try {
            await fetch.delete(`/fees/${id}`);
            toast.success("Deleted fee");
            loadAll();
        } catch (err) {
            toast.error("Failed to delete");
        }
    };

    const generateReceipt = (assignment) => {
        const doc = new jsPDF();
        doc.text("School Fee Receipt", 20, 20);
        doc.text(`Student: ${assignment.student?.name}`, 20, 40);
        doc.text(`Email: ${assignment.student?.email}`, 20, 50);
        doc.text(`Fee: ${assignment.fee?.title}`, 20, 60);
        doc.text(`Amount: GH₵${assignment.fee?.amount}`, 20, 70);
        doc.text(`Status: ${assignment.status.toUpperCase()}`, 20, 80);
        doc.save(`Receipt_${assignment.student?.name}.pdf`);
    };

    const filteredStudents = students
        .filter(s =>
            (!studentClassFilter || s.studentClass === studentClassFilter) &&
            (!studentSearch || s.name.toLowerCase().includes(studentSearch.toLowerCase()))
        );

    if (loading) return <AdminLayout><p className="p-6 text-gray-600">Loading...</p></AdminLayout>;

    return (
        <AdminLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Fees & Tracking Dashboard</h2>

                {/* --- Add Fee --- */}
                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">Create Fee Type</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <input type="text" placeholder="Fee Title" className="border p-3 rounded" value={newFee.title} onChange={(e) => setNewFee({ ...newFee, title: e.target.value })} />
                        <input type="number" placeholder="Amount" className="border p-3 rounded" value={newFee.amount} onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })} />
                        <input type="text" placeholder="Description" className="border p-3 rounded" value={newFee.description} onChange={(e) => setNewFee({ ...newFee, description: e.target.value })} />
                    </div>
                    <button onClick={addFee} className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">Add Fee</button>
                </div>

                {/* --- Assign Fee --- */}
                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">Assign Fee to Student</h3>

                    <input type="text" placeholder="Search student..." className="border p-2 rounded mb-2 w-full" value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} />
                    <select className="border p-2 rounded mb-2 w-full" value={studentClassFilter} onChange={(e) => setStudentClassFilter(e.target.value)}>
                        <option value="">Filter by class</option>
                        <option value="Class 1">Class 1</option>
                        <option value="Class 2">Class 2</option>
                        <option value="Class 3">Class 3</option>
                    </select>

                    <select className="w-full border p-3 rounded mb-3" value={assignData.studentId} onChange={(e) => setAssignData({ ...assignData, studentId: e.target.value })}>
                        <option value="">Select Student</option>
                        {filteredStudents.map(s => (
                            <option key={s._id} value={s._id}>{s.name} ({s.email})</option>
                        ))}
                    </select>

                    <select className="w-full border p-3 rounded mb-3" value={assignData.feeId} onChange={(e) => setAssignData({ ...assignData, feeId: e.target.value })}>
                        <option value="">Select Fee</option>
                        {fees.map(f => (
                            <option key={f._id} value={f._id}>{f.title} – GH₵{f.amount}</option>
                        ))}
                    </select>

                    <button onClick={assignFee} className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700">Assign Fee</button>
                </div>

                {/* --- Assigned Fees --- */}
                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">Student Fee Tracking</h3>
                    {assignments.length === 0 ? (
                        <p className="text-gray-500">No fees assigned yet.</p>
                    ) : (
                        assignments.map(a => (
                            <div key={a._id} className="p-4 border rounded-lg flex justify-between items-center mb-3">
                                <div>
                                    <p className="font-bold">{a.student?.name}</p>
                                    <p className="text-gray-600">Fee: {a.fee?.title} – GH₵{a.fee?.amount}</p>
                                    <p className={`font-semibold mt-1 ${a.status === "paid" ? "text-green-600" : "text-red-500"}`}>Status: {a.status?.toUpperCase() || "UNPAID"}</p>
                                </div>
                                <div className="flex gap-2">
                                    {a.status !== "paid" && <button onClick={() => markPaid(a._id)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Mark Paid</button>}
                                    <button onClick={() => generateReceipt(a)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Receipt</button>
                                    <button onClick={() => toast("Redirect to payment gateway")} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Pay Online</button>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-4">
                            <button disabled={currentPage <= 1} onClick={() => loadAssignments(currentPage - 1)} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">Prev</button>
                            <span className="px-3 py-1">{currentPage} / {totalPages}</span>
                            <button disabled={currentPage >= totalPages} onClick={() => loadAssignments(currentPage + 1)} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">Next</button>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

// src/pages/Admin/AdminFeesPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import fetch from "../../fetch";
import { FaSearch, FaReceipt, FaMoneyBillAlt, FaTimes } from "react-icons/fa";

export default function AdminFeesPage() {
    const [fees, setFees] = useState([]);
    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newFee, setNewFee] = useState({ title: "", amount: "", description: "" });

    // assign modal state
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [modalStudent, setModalStudent] = useState("");
    const [modalFee, setModalFee] = useState("");

    // search & filter
    const [studentSearch, setStudentSearch] = useState("");
    const [filterClass, setFilterClass] = useState("");

    // pagination for assignments
    const [page, setPage] = useState(1);
    const pageSize = 6;

    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = async () => {
        try {
            setLoading(true);
            const [fRes, sRes, aRes] = await Promise.all([
                fetch.get("/fees"),
                fetch.get("/admin/students/all"),
                fetch.get("/fees/assigned"),
            ]);

            setFees(Array.isArray(fRes.data) ? fRes.data : []);
            setStudents(Array.isArray(sRes.data) ? sRes.data : []);
            setAssignments(Array.isArray(aRes.data) ? aRes.data : []);
        } catch (err) {
            console.error("Load all error:", err);
            toast.error(err.response?.data?.message || "Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    // create fee
    const addFee = async () => {
        if (!newFee.title || !newFee.amount) return toast.error("Fill required fields");
        try {
            await fetch.post("/fees", newFee);
            toast.success("Fee added");
            setNewFee({ title: "", amount: "", description: "" });
            loadAll();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to add fee");
        }
    };

    // open modal
    const openAssignModal = () => {
        setModalStudent("");
        setModalFee("");
        setShowAssignModal(true);
    };

    // assign from modal
    const assignFee = async () => {
        if (!modalStudent || !modalFee) return toast.error("Select student & fee");
        try {
            await fetch.post("/fees/assign", { studentId: modalStudent, feeId: modalFee });
            toast.success("Fee assigned");
            setShowAssignModal(false);
            loadAll();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to assign fee");
        }
    };

    const markPaid = async (id) => {
        try {
            await fetch.post(`/fees/pay/${id}`);
            toast.success("Marked as paid");
            loadAll();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update payment");
        }
    };

    const delFee = async (id) => {
        if (!confirm("Delete this fee type?")) return;
        try {
            await fetch.delete(`/fees/${id}`);
            toast.success("Deleted");
            loadAll();
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete");
        }
    };

    // client-side filtered student list
    const filteredStudents = useMemo(() => {
        let list = students;
        if (filterClass) {
            list = list.filter(s => (s.studentClass || "").toLowerCase() === filterClass.toLowerCase());
        }
        if (studentSearch.trim()) {
            const q = studentSearch.trim().toLowerCase();
            list = list.filter(s => (s.name || "").toLowerCase().includes(q) || (s.email || "").toLowerCase().includes(q));
        }
        return list;
    }, [students, studentSearch, filterClass]);

    // assignments pagination slice
    const totalPages = Math.max(1, Math.ceil(assignments.length / pageSize));
    const paginatedAssignments = assignments.slice((page - 1) * pageSize, page * pageSize);

    // receipt / invoice print
    const printReceipt = (assignment) => {
        const html = `
      <html>
        <head>
          <title>Receipt - ${assignment._id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; }
            .card { max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px; }
            h1 { margin-bottom: 4px; font-size: 20px; }
            p { margin: 6px 0; }
            .bold { font-weight: 700; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Fee Receipt</h1>
            <p><span class="bold">Receipt ID:</span> ${assignment._id}</p>
            <p><span class="bold">Student:</span> ${assignment.student?.name} (${assignment.student?.email})</p>
            <p><span class="bold">Fee:</span> ${assignment.fee?.title} — GH₵${assignment.fee?.amount}</p>
            <p><span class="bold">Status:</span> ${assignment.status}</p>
            <p><span class="bold">Date:</span> ${new Date(assignment.createdAt).toLocaleString()}</p>
            <hr />
            <p>Thank you.</p>
          </div>
        </body>
      </html>
    `;
        const w = window.open("", "_blank", "noopener,noreferrer");
        if (w) {
            w.document.write(html);
            w.document.close();
            w.focus();
            // optionally auto-print:
            // w.print();
        } else {
            toast.error("Unable to open receipt window (popup blocked)");
        }
    };

    if (loading) return <AdminLayout><p className="p-6 text-gray-600">Loading...</p></AdminLayout>;

    return (
        <AdminLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Fees & Tracking</h2>
                    <div className="flex gap-3">
                        <button onClick={openAssignModal} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            <FaMoneyBillAlt /> Assign Fee
                        </button>
                    </div>
                </div>

                {/* Create fee */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="grid md:grid-cols-3 gap-3">
                        <input placeholder="Title" value={newFee.title} onChange={e => setNewFee({ ...newFee, title: e.target.value })} className="border p-2 rounded" />
                        <input placeholder="Amount" type="number" value={newFee.amount} onChange={e => setNewFee({ ...newFee, amount: e.target.value })} className="border p-2 rounded" />
                        <input placeholder="Description" value={newFee.description} onChange={e => setNewFee({ ...newFee, description: e.target.value })} className="border p-2 rounded" />
                    </div>
                    <div className="mt-3">
                        <button onClick={addFee} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Fee</button>
                    </div>
                </div>

                {/* Assign form (inline) */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="grid md:grid-cols-4 gap-3 items-end">
                        <div>
                            <label className="text-sm text-gray-600">Search students</label>
                            <div className="flex items-center border rounded">
                                <input className="p-2 flex-1" placeholder="Search name or email..." value={studentSearch} onChange={e => setStudentSearch(e.target.value)} />
                                <div className="px-3 text-gray-500"><FaSearch /></div>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Filter by class</label>
                            <input className="border p-2 rounded w-full" placeholder="e.g. Grade 10" value={filterClass} onChange={e => setFilterClass(e.target.value)} />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Student</label>
                            <select value={assign.studentId} onChange={e => setAssign({ ...assign, studentId: e.target.value })} className="border p-2 rounded w-full">
                                <option value="">Select student</option>
                                {filteredStudents.map(s => (
                                    <option key={s._id} value={s._1d || s._id}>{s.name} ({s.email})</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Fee</label>
                            <select value={assign.feeId} onChange={e => setAssign({ ...assign, feeId: e.target.value })} className="border p-2 rounded w-full">
                                <option value="">Select fee</option>
                                {fees.map(f => <option key={f._id} value={f._id}>{f.title} — GH₵{f.amount}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="mt-3">
                        <button onClick={assignFee} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Assign selected</button>
                        <button onClick={openAssignModal} className="ml-2 text-gray-600 underline">Open assign modal</button>
                    </div>
                </div>

                {/* Assigned fees list with pagination */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <h3 className="text-xl font-semibold mb-4">Student Fee Tracking</h3>

                    {assignments.length === 0 ? <p className="text-gray-500">No fees assigned yet.</p> : (
                        <>
                            <div className="space-y-3">
                                {paginatedAssignments.map(a => (
                                    <div key={a._id} className="flex justify-between items-center border p-3 rounded">
                                        <div>
                                            <div className="font-bold">{a.student?.name}</div>
                                            <div className="text-sm text-gray-600">Fee: {a.fee?.title} — GH₵{a.fee?.amount}</div>
                                            <div className={`mt-1 font-semibold ${a.status === "paid" ? "text-green-600" : "text-red-500"}`}>Status: {a.status}</div>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            {a.status !== "paid" && <button onClick={() => markPaid(a._id)} className="bg-green-600 text-white px-3 py-1 rounded">Mark Paid</button>}
                                            <button onClick={() => printReceipt(a)} className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2"><FaReceipt /> Receipt</button>
                                            {/* Pay online placeholder (replace URL with real checkout) */}
                                            <a href={`/payments/checkout?assignmentId=${a._id}`} target="_blank" rel="noreferrer" className="bg-blue-600 text-white px-3 py-1 rounded">Pay Online</a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* pagination controls */}
                            <div className="flex justify-between items-center mt-4">
                                <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
                                <div className="flex gap-2">
                                    <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
                                    <button disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded">Next</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* All fee types */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4">All Fee Types</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {fees.map(f => (
                            <div key={f._id} className="border rounded p-3 flex justify-between items-center">
                                <div>
                                    <div className="font-bold">{f.title}</div>
                                    <div className="text-sm text-gray-600">GH₵{f.amount}</div>
                                    {f.description && <div className="text-xs text-gray-500">{f.description}</div>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button onClick={() => delFee(f._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal (basic) */}
            {showAssignModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-lg w-full max-w-lg p-4 relative">
                        <button onClick={() => setShowAssignModal(false)} className="absolute top-3 right-3 text-gray-600"><FaTimes /></button>
                        <h3 className="text-lg font-semibold mb-3">Assign Fee (Modal)</h3>

                        <div className="space-y-3">
                            <div>
                                <label className="text-sm text-gray-600">Student</label>
                                <select value={modalStudent} onChange={e => setModalStudent(e.target.value)} className="border p-2 rounded w-full">
                                    <option value="">Select student</option>
                                    {students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Fee</label>
                                <select value={modalFee} onChange={e => setModalFee(e.target.value)} className="border p-2 rounded w-full">
                                    <option value="">Select fee</option>
                                    {fees.map(f => <option key={f._id} value={f._id}>{f.title} — GH₵{f.amount}</option>)}
                                </select>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button onClick={() => setShowAssignModal(false)} className="px-3 py-1 border rounded">Cancel</button>
                                <button onClick={assignFee} className="bg-green-600 text-white px-3 py-1 rounded">Assign</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

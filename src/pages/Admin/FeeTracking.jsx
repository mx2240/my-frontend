// // // import React, { useEffect, useState } from "react";
// // // import fetch from "../../fetch";
// // // import AdminLayout from "../../layouts/AdminLayout";

// // // function FeeTracking() {
// // //     const [students, setStudents] = useState([]);
// // //     const token = localStorage.getItem("token");

// // //     useEffect(() => {
// // //         loadStudents();
// // //     }, []);

// // //     const loadStudents = async () => {
// // //         const res = await fetch.get(
// // //             "/fees/students",
// // //             { headers: { Authorization: `Bearer ${token}` } }
// // //         );
// // //         setStudents(res.data.students);
// // //     };

// // //     const updateStatus = async (assignmentId, status) => {
// // //         try {
// // //             await fetch.put(
// // //                 "/fees/status",
// // //                 { assignmentId, status },
// // //                 { headers: { Authorization: `Bearer ${token}` } }
// // //             );

// // //             loadStudents(); // refresh
// // //         } catch (err) {
// // //             alert("Failed to update status");
// // //         }
// // //     };

// // //     return (
// // //         <AdminLayout>

// // //             <div className="fee-container">
// // //                 <h2>Fee Tracking</h2>

// // //                 {students.map(s => (
// // //                     <div key={s._id} className="student-card">
// // //                         <h3>{s.name}</h3>
// // //                         <p>Email: {s.email}</p>

// // //                         {s.fees.length === 0 ? (
// // //                             <p>No fees assigned</p>
// // //                         ) : (
// // //                             s.fees.map(f => (
// // //                                 <div className="fee-box" key={f._id}>
// // //                                     <p>
// // //                                         <strong>{f.fee.title}</strong> — GH₵{f.fee.amount}
// // //                                     </p>

// // //                                     <p>Status: {f.status}</p>

// // //                                     <button
// // //                                         onClick={() => updateStatus(f._id, "paid")}
// // //                                         className="btn-paid"
// // //                                     >
// // //                                         Mark as Paid
// // //                                     </button>

// // //                                     <button
// // //                                         onClick={() => updateStatus(f._id, "unpaid")}
// // //                                         className="btn-unpaid"
// // //                                     >
// // //                                         Mark Unpaid
// // //                                     </button>
// // //                                 </div>
// // //                             ))
// // //                         )}
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //         </AdminLayout>
// // //     );
// // // }

// // // export default FeeTracking;



import React, { useEffect, useState } from "react";
import fetch from '../../fetch';
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";

// const API = "https://my-backend-amber.vercel.app/api";

export default function AdminFeeTracking() {
    const [fees, setFees] = useState([]);
    const [selectedFee, setSelectedFee] = useState(null);
    const [assigned, setAssigned] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load all fees
    const fetchFees = async () => {
        try {
            const res = await fetch.get(`/fees`);
            setFees(res.data.fees || []);
        } catch (err) {
            toast.error("Failed to load fees");
        }
    };

    // Load assigned students for selected fee
    const fetchAssigned = async (feeId) => {
        setLoading(true);
        try {
            const res = await fetch.get(`/assign-fee/${feeId}/students`);
            setAssigned(res.data.data || []);
        } catch (err) {
            toast.error("Failed to load assigned students");
        }
        setLoading(false);
    };

    // Update payment status
    const updateStatus = async (assignId, status) => {
        try {
            await fetch.put(`/assign-fee/${assignId}/status`, { status });
            toast.success("Updated!");
            fetchAssigned(selectedFee._id);
        } catch (err) {
            toast.error("Error updating status");
        }
    };

    // Delete assignment
    const deleteAssignment = async (assignId) => {
        if (!window.confirm("Delete assigned fee?")) return;

        try {
            await fetch.delete(`/assign-fee/${assignId}`);
            toast.success("Removed");
            fetchAssigned(selectedFee._id);
        } catch (err) {
            toast.error("Error deleting assignment");
        }
    };

    useEffect(() => {
        fetchFees();
    }, []);

    return (

        <AdminLayout>
            <div className="p-5 md:p-10 bg-gray-50 min-h-screen">

                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Admin Fee Tracking
                </h1>

                {/* Fee List */}
                <div className="grid md:grid-cols-3 gap-4">
                    {fees.map((fee) => (
                        <div
                            key={fee._id}
                            onClick={() => {
                                setSelectedFee(fee);
                                fetchAssigned(fee._id);
                            }}
                            className={`cursor-pointer p-5 bg-white shadow rounded-xl border hover:border-blue-500 transition ${selectedFee?._id === fee._id ? "border-blue-500" : "border-gray-200"
                                }`}
                        >
                            <h3 className="text-lg font-semibold">{fee.title}</h3>
                            <p className="text-sm text-gray-600">Amount: GH₵ {fee.amount}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {fee.dueDate ? new Date(fee.dueDate).toLocaleDateString() : "No due date"}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Assigned Students Table */}
                {selectedFee && (
                    <div className="mt-10 bg-white shadow rounded-xl p-6">
                        <h2 className="text-2xl font-semibold mb-4">
                            Assigned Students — <span className="text-blue-600">{selectedFee.title}</span>
                        </h2>

                        {loading ? (
                            <p className="text-gray-600">Loading...</p>
                        ) : assigned.length === 0 ? (
                            <p className="text-gray-600">No students assigned to this fee.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100 text-left">
                                            <th className="p-3">Student</th>
                                            <th className="p-3">Class</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {assigned.map((item) => (
                                            <tr key={item._id} className="border-b hover:bg-gray-50">
                                                <td className="p-3">{item.student?.name}</td>
                                                <td className="p-3">{item.student?.studentClass || "-"}</td>

                                                <td className="p-3">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-white text-sm ${item.status === "paid"
                                                                ? "bg-green-600"
                                                                : "bg-orange-500"
                                                            }`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>

                                                <td className="p-3 flex gap-3">
                                                    {/* Mark as Paid */}
                                                    <button
                                                        onClick={() => updateStatus(item._id, "paid")}
                                                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                                    >
                                                        Mark Paid
                                                    </button>

                                                    {/* Mark Pending */}
                                                    <button
                                                        onClick={() => updateStatus(item._id, "pending")}
                                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                                    >
                                                        Pending
                                                    </button>

                                                    {/* Delete */}
                                                    <button
                                                        onClick={() => deleteAssignment(item._id)}
                                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

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



// // 


import React, { useEffect, useState } from "react";
import fetch from "../../fetch";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";

function FeeTracking() {
    const [assignedFees, setAssignedFees] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAssignments = async () => {
        try {
            const res = await fetch.get("/assign-fee/");
            setAssignedFees(res.data.data || []);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load assignments");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await fetch.put(`/assign-fee/${id}/status`, { status });
            toast.success("Status updated");
            fetchAssignments();
        } catch (error) {
            toast.error("Failed to update");
        }
    };

    const deleteAssignment = async (id) => {
        if (!window.confirm("Delete this assigned fee?")) return;

        try {
            await fetch.delete(`/assign-fee/${id}`);
            toast.success("Deleted");
            fetchAssignments();
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (

        <AdminLayout>
            <div className="p-5">
                <h2 className="text-2xl font-bold mb-5">Fee Tracking</h2>

                {assignedFees.length === 0 ? (
                    <p>No assigned fees found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-2 border">Student</th>
                                    <th className="p-2 border">Fee Title</th>
                                    <th className="p-2 border">Amount</th>
                                    <th className="p-2 border">Status</th>
                                    <th className="p-2 border">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {assignedFees.map((item) => (
                                    <tr key={item._id} className="text-center">
                                        <td className="p-2 border">
                                            {item.student?.name}
                                        </td>
                                        <td className="p-2 border">
                                            {item.fee?.title}
                                        </td>
                                        <td className="p-2 border">
                                            GH₵ {item.fee?.amount}
                                        </td>

                                        {/* Status */}
                                        <td className="p-2 border">
                                            <select
                                                value={item.status}
                                                onChange={(e) =>
                                                    updateStatus(
                                                        item._id,
                                                        e.target.value
                                                    )
                                                }
                                                className="border px-2 py-1"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="paid">Paid</option>
                                            </select>
                                        </td>

                                        <td className="p-2 border">
                                            <button
                                                onClick={() =>
                                                    deleteAssignment(item._id)
                                                }
                                                className="bg-red-600 text-white px-3 py-1 rounded"
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
        </AdminLayout>
    );
}

export default FeeTracking;


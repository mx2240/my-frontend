// import React, { useEffect, useState } from "react";
// import fetch from "../../fetch";
// import AdminLayout from "../../layouts/AdminLayout";

// function FeeTracking() {
//     const [students, setStudents] = useState([]);
//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         loadStudents();
//     }, []);

//     const loadStudents = async () => {
//         const res = await fetch.get(
//             "/fees/students",
//             { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setStudents(res.data.students);
//     };

//     const updateStatus = async (assignmentId, status) => {
//         try {
//             await fetch.put(
//                 "/fees/status",
//                 { assignmentId, status },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             loadStudents(); // refresh
//         } catch (err) {
//             alert("Failed to update status");
//         }
//     };

//     return (
//         <AdminLayout>

//             <div className="fee-container">
//                 <h2>Fee Tracking</h2>

//                 {students.map(s => (
//                     <div key={s._id} className="student-card">
//                         <h3>{s.name}</h3>
//                         <p>Email: {s.email}</p>

//                         {s.fees.length === 0 ? (
//                             <p>No fees assigned</p>
//                         ) : (
//                             s.fees.map(f => (
//                                 <div className="fee-box" key={f._id}>
//                                     <p>
//                                         <strong>{f.fee.title}</strong> — GH₵{f.fee.amount}
//                                     </p>

//                                     <p>Status: {f.status}</p>

//                                     <button
//                                         onClick={() => updateStatus(f._id, "paid")}
//                                         className="btn-paid"
//                                     >
//                                         Mark as Paid
//                                     </button>

//                                     <button
//                                         onClick={() => updateStatus(f._id, "unpaid")}
//                                         className="btn-unpaid"
//                                     >
//                                         Mark Unpaid
//                                     </button>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </AdminLayout>
//     );
// }

// export default FeeTracking;



import React, { useEffect, useState } from "react";
import fetch from "../../fetch";
import AdminLayout from "../../layouts/AdminLayout";

export default function FeeTracking() {
    const [fees, setFees] = useState([]);
    const [selectedFee, setSelectedFee] = useState(null);
    const [assignedStudents, setAssignedStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    // const BASE_URL = "https://my-backend-amber.vercel.app/api";

    // Load all fees
    useEffect(() => {
        const loadFees = async () => {
            try {
                const res = await fetch.get(`/fees`);
                setFees(res.data.fees || []);
            } catch (err) {
                console.error("Failed to load fees:", err);
            }
        };
        loadFees();
    }, []);

    // Load assigned students when a fee is clicked
    const fetchAssignedStudents = async (feeId) => {
        try {
            const res = await axios.get(`/fees/${feeId}/assigned`);
            setAssigned(res.data.assignedStudents);
        } catch (err) {
            console.log(err);
        }
    };


    // Update payment status
    const updateStatus = async (studentId, feeId, newStatus) => {
        try {
            await fetch.put(`/fees/update-status`, {
                studentId,
                feeId,
                status: newStatus,
            });

            // Update UI instantly
            setAssignedStudents((prev) =>
                prev.map((s) =>
                    s._id === studentId ? { ...s, status: newStatus } : s
                )
            );
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 w-full">

                {/* PAGE TITLE */}
                <h1 className="text-2xl font-bold mb-5 text-gray-800">Fee Tracking</h1>

                {/* FEES NAVIGATION */}
                <div className="flex gap-3 overflow-x-auto pb-3 mb-6">
                    {fees.map((fee) => (
                        <button
                            key={fee._id}
                            onClick={() => loadFeeAssignments(fee._id)}
                            className={`px-4 py-2 rounded-xl border text-sm font-medium whitespace-nowrap 
              ${selectedFee === fee._id
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-800 border-gray-300"
                                }`}
                        >
                            {fee.title} – GH₵{fee.amount}
                        </button>
                    ))}
                </div>

                {/* MAIN CONTENT */}
                <div className="bg-white rounded-2xl shadow p-5">

                    {!selectedFee ? (
                        <p className="text-gray-500 text-center py-10">
                            Select a fee from the top bar to view assigned students.
                        </p>
                    ) : loading ? (
                        <p className="text-center py-10 font-medium">Loading students...</p>
                    ) : assignedStudents.length === 0 ? (
                        <p className="text-center text-gray-500 py-10">
                            No students assigned to this fee yet.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {assignedStudents.map((student) => (
                                <div
                                    key={student._id}
                                    className="flex justify-between items-center border p-4 rounded-xl"
                                >
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {student.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">{student.email}</p>
                                    </div>

                                    {/* STATUS BADGE */}
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold 
                    ${student.status === "Paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {student.status}
                                    </span>

                                    {/* DROPDOWN */}
                                    <select
                                        value={student.status}
                                        onChange={(e) =>
                                            updateStatus(student._id, selectedFee, e.target.value)
                                        }
                                        className="border rounded-lg px-3 py-1 text-sm"
                                    >
                                        <option value="Paid">Paid</option>
                                        <option value="Unpaid">Unpaid</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

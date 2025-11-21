// // src/pages/Admin/FeeTracking.jsx
// import React, { useEffect, useState } from "react";
// import AdminLayout from "../../layouts/AdminLayout";
// import toast from "react-hot-toast";
// import { FaMoneyBill, FaCheck, FaTimes, FaClock } from "react-icons/fa";

// const FeeTracking = () => {
//     const [records, setRecords] = useState([]);
//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         loadFees();
//     }, []);

//     const loadFees = async () => {
//         try {
//             const res = await fetch(`${process.env.REACT_APP_API_URL}/fees/records`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             const data = await res.json();
//             setRecords(Array.isArray(data) ? data : []);
//         } catch (err) {
//             toast.error("Failed to load records");
//         }
//     };

//     const updateStatus = async (id, status) => {
//         try {
//             const res = await fetch(`${process.env}/fees/status/${id}`, {
//                 method: "PUT",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ status }),
//             });

//             if (res.ok) {
//                 toast.success("Status updated");
//                 loadFees();
//             }
//         } catch (err) {
//             toast.error("Error updating status");
//         }
//     };

//     return (
//         <AdminLayout>
//             <div className="p-6">
//                 <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
//                     <FaMoneyBill className="text-green-600" /> Fee Tracking
//                 </h1>

//                 <div className="space-y-4">
//                     {records.map((r) => (
//                         <div key={r._id} className="p-6 bg-white rounded-xl shadow flex justify-between items-center">
//                             <div>
//                                 <h3 className="font-bold text-lg">{r.student.name}</h3>
//                                 <p className="text-gray-600">{r.fee.title} - GH₵{r.fee.amount}</p>
//                                 <p className="mt-1">
//                                     Status:{" "}
//                                     <span className="font-bold">
//                                         {r.status === "paid" && "Paid"}
//                                         {r.status === "pending" && "Pending"}
//                                         {r.status === "unpaid" && "Unpaid"}
//                                     </span>
//                                 </p>
//                             </div>

//                             <div className="flex gap-3">
//                                 <button
//                                     onClick={() => updateStatus(r._id, "paid")}
//                                     className="p-3 bg-green-600 text-white rounded-lg flex items-center gap-1"
//                                 >
//                                     <FaCheck /> Paid
//                                 </button>

//                                 <button
//                                     onClick={() => updateStatus(r._id, "pending")}
//                                     className="p-3 bg-yellow-500 text-white rounded-lg flex items-center gap-1"
//                                 >
//                                     <FaClock /> Pending
//                                 </button>

//                                 <button
//                                     onClick={() => updateStatus(r._id, "unpaid")}
//                                     className="p-3 bg-red-600 text-white rounded-lg flex items-center gap-1"
//                                 >
//                                     <FaTimes /> Unpaid
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </AdminLayout>
//     );
// };

// export default FeeTracking;







import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import { api } from "../../api";

export default function FeeTracking() {
    const [records, setRecords] = useState([]);
    useEffect(() => { load(); }, []);
    const load = async () => { const r = await api("/fees/records"); if (r.ok) setRecords(r.body); };

    const setStatus = async (id, status) => { const r = await api(`/fees/status/${id}`, "PUT", { status }); if (r.ok) { toast.success("Updated"); load(); } else toast.error("Failed"); };

    return (
        <AdminLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Fee Tracking</h2>
                <div className="space-y-4">
                    {records.map(r => (
                        <div key={r._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                            <div>
                                <div className="font-bold">{r.student?.name}</div>
                                <div>{r.fee?.title} — GH₵{r.fee?.amount}</div>
                                <div className="text-sm text-gray-600">Status: {r.status}</div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setStatus(r._id, "paid")} className="bg-green-600 text-white px-3 py-2 rounded">Paid</button>
                                <button onClick={() => setStatus(r._id, "pending")} className="bg-yellow-500 text-white px-3 py-2 rounded">Pending</button>
                                <button onClick={() => setStatus(r._id, "unpaid")} className="bg-red-600 text-white px-3 py-2 rounded">Unpaid</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}


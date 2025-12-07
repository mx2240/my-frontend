// import React, { useEffect, useState } from "react";
// import api from "../../utils/api"
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import StudentLayout from "../../layouts/StudentLayout";

// function StudentPaymentPage() {
//     const [fees, setFees] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchFees();
//     }, []);

//     async function fetchFees() {
//         try {
//             const res = await api.get("/student/my-fees");
//             if (res.data.ok) setFees(res.data.fees);
//         } catch (err) {
//             toast.error("Unable to load fees");
//         }
//     }

//     async function handlePay(assignedFeeId) {
//         try {
//             const res = await api.post("/paystack/initiate", { assignedFeeId });

//             if (res.data.ok) {
//                 window.location.href = res.data.authorization_url; // redirect to paystack
//             }

//         } catch (err) {
//             toast.error("Payment init failed");
//         }
//     }

//     return (
//         <StudentLayout>
//             <div className="p-5">
//                 <h2 className="text-2xl font-bold mb-4">My Fees & Payments</h2>

//                 <div className="space-y-4">
//                     {fees.map((item) => (
//                         <div key={item._id} className="border p-4 rounded shadow bg-white">
//                             <h3 className="font-bold text-lg">{item.fee.title}</h3>
//                             <p>Amount: GH₵ {item.fee.amount}</p>
//                             <p>Status:
//                                 <span
//                                     className={`ml-2 px-2 py-1 rounded text-white 
//                                 ${item.status === "paid" ? "bg-green-600" : "bg-red-600"}`}>
//                                     {item.status}
//                                 </span>
//                             </p>

//                             {item.status !== "paid" && (
//                                 <button
//                                     className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
//                                     onClick={() => handlePay(item._id)}
//                                 >
//                                     Pay Now
//                                 </button>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </StudentLayout>
//     );
// }

// export default StudentPaymentPage;




import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-hot-toast"
import StudentLayout from "../../layouts/StudentLayout";

export default function StudentFeesPage() {
    const [fees, setFees] = useState([]);

    useEffect(() => {
        fetchFees();
    }, []);

    async function fetchFees() {
        try {
            const res = await api.get("/student/my-fees");

            if (res.data.ok) {
                // safety filter
                const clean = res.data.fees.filter(f => f && f.fee);
                setFees(clean);
            }
        } catch (err) {
            toast.error("Unable to load your fees.");
        }
    }

    async function handlePay(assignedFeeId) {
        try {
            const res = await api.post("/paystack/initiate", { assignedFeeId });

            if (res.data.ok) {
                window.location.href = res.data.authorization_url;
            }
        } catch (err) {
            toast.error("Payment initiation failed");
        }
    }

    return (
        <StudentLayout>
            <div className="fees-container">
                <h2 className="fees-title">My Fees & Payments</h2>

                {fees.length === 0 ? (
                    <div className="empty-box">No fees assigned yet.</div>
                ) : (
                    <div className="fees-grid">
                        {fees.map(f => (
                            <div className="fee-card" key={f._id}>

                                <div className="fee-header">
                                    <h3>{f.fee.title}</h3>
                                    <span className={`status-badge ${f.status}`}>
                                        {f.status === "paid" ? "Paid" : "Pending"}
                                    </span>
                                </div>

                                <p className="fee-desc">
                                    {f.fee.description || "No description provided."}
                                </p>

                                <div className="fee-details">
                                    <p><strong>Amount:</strong> ₦{f.fee.amount}</p>
                                    <p><strong>Due Date:</strong> {f.fee.dueDate ? new Date(f.fee.dueDate).toDateString() : "No due date"}</p>
                                </div>

                                {f.status === "pending" ? (
                                    <button
                                        className="pay-btn"
                                        onClick={() => handlePay(f._id)}
                                    >
                                        Pay Now
                                    </button>
                                ) : (
                                    <button className="paid-btn" disabled>
                                        Payment Completed
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}

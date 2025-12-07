// import { useEffect, useState } from "react";
// import api from "../../utils/api";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import StudentLayout from "../../layouts/StudentLayout";

// export default function StudentFeesPage() {
//     const [fees, setFees] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         loadFees();
//     }, []);

//     async function loadFees() {
//         try {
//             const res = await api.get("/student/my-fees");

//             if (res.data.ok) {
//                 setFees(res.data.fees);
//             } else {
//                 toast.error("Unable to load fees");
//             }
//         } catch (err) {
//             toast.error("Server error loading fees");
//         } finally {
//             setLoading(false);
//         }
//     }

//     async function handlePay(assignedFeeId) {
//         try {
//             const res = await api.post("/payments/initiate", { assignedFeeId });

//             if (res.data.ok) {
//                 window.location.href = res.data.authorization_url;
//             } else {
//                 toast.error("Payment failed to start");
//             }
//         } catch (err) {
//             toast.error("Payment error");
//         }
//     }

//     if (loading) {
//         return (
//             <StudentLayout>
//                 <div className="p-6 text-center text-lg font-semibold">
//                     Loading fees...
//                 </div>
//             </StudentLayout>
//         );
//     }

//     return (
//         <StudentLayout>
//             <div className="p-6">
//                 <h2 className="text-2xl font-bold mb-4">My Fees</h2>

//                 {fees.length === 0 ? (
//                     <div className="text-center text-gray-600 pt-10">
//                         No assigned fees yet.
//                     </div>
//                 ) : (
//                     <div className="overflow-x-auto">
//                         <table className="w-full border-collapse shadow-md">
//                             <thead>
//                                 <tr className="bg-gray-100">
//                                     <th className="p-3 border">Title</th>
//                                     <th className="p-3 border">Amount</th>
//                                     <th className="p-3 border">Status</th>
//                                     <th className="p-3 border">Action</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {fees.map((fee) => (
//                                     <tr key={fee._id} className="text-center">
//                                         <td className="border p-3">{fee.fee.title}</td>
//                                         <td className="border p-3">GHS{fee.fee.amount.toLocaleString()}</td>
//                                         <td className="border p-3">
//                                             {fee.isPaid ? (
//                                                 <span className="bg-green-200 text-green-800 px-3 py-1 rounded">
//                                                     PAID
//                                                 </span>
//                                             ) : (
//                                                 <span className="bg-red-200 text-red-800 px-3 py-1 rounded">
//                                                     PENDING
//                                                 </span>
//                                             )}
//                                         </td>

//                                         <td className="border p-3">
//                                             {fee.isPaid ? (
//                                                 <button
//                                                     className="bg-gray-400 cursor-default text-white px-4 py-2 rounded"
//                                                     disabled
//                                                 >
//                                                     Paid
//                                                 </button>
//                                             ) : (
//                                                 <button
//                                                     onClick={() => handlePay(fee._id)}
//                                                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//                                                 >
//                                                     Pay Now
//                                                 </button>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </StudentLayout>
//     );
// }



import { useEffect, useState } from "react";
import api from "../../fetch";
import toast from "react-hot-toast";
import StudentLayout from "../../layouts/StudentLayout";

export default function StudentFeesPage() {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStudentFees();
    }, []);

    // 📌 Get student assigned fees
    const loadStudentFees = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get("/student/my-fees", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.ok) {
                setFees(res.data.assigned);
            }
        } catch (err) {
            toast.error("Unable to load fees");
        } finally {
            setLoading(false);
        }
    };

    // 📌 Handle Pay (Paystack)
    const handlePay = async (assignedId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.post(
                "/payments/initiate",
                { assignedFeeId: assignedId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.ok) {
                window.location.href = res.data.authorization_url;
            }
        } catch (err) {
            toast.error("Payment failed");
        }
    };

    return (
        <StudentLayout>
            <div className="p-5 max-w-5xl mx-auto">

                {/* PAGE TITLE */}
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    💳 My Fees & Payments
                </h1>

                {/* LOADING STATE */}
                {loading && (
                    <p className="text-center text-gray-600">Loading fees...</p>
                )}

                {/* NO FEES */}
                {!loading && fees.length === 0 && (
                    <p classimper="text-center text-gray-600">
                        No assigned fees yet.
                    </p>
                )}

                {/* FEES LIST */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fees.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-2xl shadow-md border p-5 hover:shadow-lg transition"
                        >
                            <h2 className="text-xl font-semibold text-gray-800">
                                {item.fee?.title}
                            </h2>

                            <p className="text-gray-600 mt-2">
                                {item.fee?.description || "No description"}
                            </p>

                            <div className="mt-3">
                                <p className="text-lg font-bold text-gray-900">
                                    GH₵ {item.fee?.amount}
                                </p>
                            </div>

                            {/* STATUS */}
                            <div className="mt-3">
                                {item.isPaid ? (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-lg">
                                        Paid ✓
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded-lg">
                                        Pending
                                    </span>
                                )}
                            </div>

                            {/* PAY BUTTON */}
                            {!item.isPaid && (
                                <button
                                    onClick={() => handlePay(item._id)}
                                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                                >
                                    Pay Now
                                </button>
                            )}

                            {item.isPaid && (
                                <button
                                    disabled
                                    className="w-full mt-4 bg-gray-300 text-gray-600 py-2 rounded-lg cursor-not-allowed"
                                >
                                    Payment Completed
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </StudentLayout>
    );
}

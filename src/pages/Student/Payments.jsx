// import React, { useEffect, useState } from "react";
// import fetch from "../../fetch";
// import toast from "react-hot-toast";
// import StudentLayout from "../../layouts/StudentLayout";

// function StudentPaymentPage() {
//     const [fees, setFees] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const API_BASE = "https://my-backend-amber.vercel.app";

//     const token = localStorage.getItem("studentToken");

//     useEffect(() => {
//         fetchFees();
//     }, []);

//     const fetchFees = async () => {
//         try {
//             const res = await fetch.get(`${API_BASE}/api/student/my-fees`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             if (res.data.ok) {
//                 setFees(res.data.fees);
//             }
//         } catch (err) {
//             console.error(err);
//             toast.error("Failed to load fees");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ▶️ Paystack Initiate Payment
//     const handlePayNow = async (assignedFeeId) => {
//         try {
//             const res = await fetch.post(
//                 `${API_BASE}/api/payments/initiate`,
//                 { assignedFeeId },
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );

//             if (res.data.ok) {
//                 window.location.href = res.data.authorization_url; // redirect to paystack
//             }
//         } catch (err) {
//             console.error(err);
//             toast.error("Unable to initiate payment");
//         }
//     };

//     if (loading) return <StudentLayout><p>Loading fees...</p>;</StudentLayout>


//     return (
//         <StudentLayout>
//             <div style={styles.container}>
//                 <h2 style={styles.header}>My Fees & Payment</h2>

//                 {fees.length === 0 ? (
//                     <p>No fees assigned.</p>
//                 ) : (
//                     <div style={styles.cardWrapper}>
//                         {fees.map((item) => (
//                             <div key={item._id} style={styles.card}>
//                                 <h3>{item.fee.title}</h3>
//                                 <p><strong>Amount:</strong> GHS {item.fee.amount}</p>
//                                 <p><strong>Status:</strong>
//                                     <span
//                                         style={{
//                                             color: item.status === "paid" ? "green" : "red",
//                                             fontWeight: "bold",
//                                         }}
//                                     >
//                                         {item.status.toUpperCase()}
//                                     </span>
//                                 </p>

//                                 {/* Show Pay Now if unpaid */}
//                                 {item.status !== "paid" && (
//                                     <button
//                                         style={styles.payBtn}
//                                         onClick={() => handlePayNow(item._id)}
//                                     >
//                                         Pay Now
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </StudentLayout>
//     );
// }

// const styles = {
//     container: {
//         padding: "30px",
//         maxWidth: "900px",
//         margin: "0 auto",
//         fontFamily: "Arial",
//     },
//     header: {
//         marginBottom: "20px",
//     },
//     cardWrapper: {
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//         gap: "20px",
//     },
//     card: {
//         padding: "20px",
//         borderRadius: "10px",
//         background: "#fff",
//         boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
//     },
//     payBtn: {
//         padding: "10px 15px",
//         background: "green",
//         color: "white",
//         border: "none",
//         borderRadius: "5px",
//         cursor: "pointer",
//         marginTop: "10px",
//     },
// };

// export default StudentPaymentPage;






import React, { useEffect, useState } from "react";
import fetch from "../../fetch";
import toast from "react-hot-toast";
import StudentLayout from "../../layouts/StudentLayout";

export default function StudentPaymentPage() {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE = "https://my-backend-amber.vercel.app";
    const token = localStorage.getItem("studentToken");

    useEffect(() => {
        fetchFees();
    }, []);

    const fetchFees = async () => {
        try {
            const res = await fetch.get(`${API_BASE}/api/student/my-fees`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.ok) setFees(res.data.fees);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load fees");
        } finally {
            setLoading(false);
        }
    };

    const handlePayNow = async (assignedFeeId) => {
        try {
            const res = await fetch.post(
                `${API_BASE}/api/payments/initiate`,
                { assignedFeeId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.ok) window.location.href = res.data.authorization_url;
        } catch (err) {
            console.error(err);
            toast.error("Unable to initiate payment");
        }
    };

    if (loading)
        return (
            <StudentLayout>
                <p className="text-center text-gray-600 mt-10">Loading fees...</p>
            </StudentLayout>
        );

    return (
        <StudentLayout>
            <div className="max-w-6xl mx-auto p-6">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">💰 My Fees & Payments</h2>

                {fees.length === 0 ? (
                    <p className="text-center text-gray-500">No fees assigned yet.</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {fees.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{item.fee.title}</h3>
                                    <p className="text-gray-700 mb-1">
                                        <strong>Amount:</strong> GH₵ {item.fee.amount}
                                    </p>
                                    <p className="mb-2">
                                        <strong>Status:</strong>{" "}
                                        <span
                                            className={`font-bold ${item.status === "paid" ? "text-green-600" : "text-red-600"
                                                }`}
                                        >
                                            {item.status.toUpperCase()}
                                        </span>
                                    </p>
                                </div>

                                {item.status !== "paid" && (
                                    <button
                                        onClick={() => handlePayNow(item._id)}
                                        className="mt-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
                                    >
                                        Pay Now
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

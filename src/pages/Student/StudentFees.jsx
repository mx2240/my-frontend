import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import api from "../../fetch"; // Axios instance
import toast from "react-hot-toast";
import StudentLayout from "../../layouts/StudentLayout";

export default function StudentPaymentPage() {
    const { token } = useContext(AuthContext);
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) fetchFees();
    }, [token]);

    async function fetchFees() {
        try {
            const res = await api.get("/student/my-fees", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.ok) {
                setFees(res.data.fees);
            } else {
                toast.error(res.data.message || "Unable to load fees");
            }
        } catch (err) {
            console.error(err);
            toast.error("Unable to load fees");
        } finally {
            setLoading(false);
        }
    }

    async function handlePay(assignedFeeId) {
        try {
            const res = await api.post(
                "/paystack/initiate",
                { assignedFeeId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.ok) {
                // Paystack redirect
                window.location.href = res.data.authorization_url;
            } else {
                toast.error(res.data.message || "Payment failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Payment init failed");
        }
    }

    return (
        <StudentLayout>
            <div className="p-6 max-w-3xl mx-auto">

                <h2 className="text-2xl font-bold mb-4">My Fees & Payments</h2>

                {/* Loading */}
                {loading && (
                    <div className="p-4 bg-white rounded shadow">Loading fees…</div>
                )}

                {/* If no fees */}
                {!loading && fees.length === 0 && (
                    <div className="p-4 bg-white rounded shadow">
                        You don't have any assigned fees yet.
                    </div>
                )}

                {/* Fees List */}
                <div className="space-y-4">
                    {fees.map(fee => (
                        <div
                            key={fee._id}
                            className="p-4 bg-white rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold text-lg">{fee.fee.title}</h3>
                                <p className="text-gray-500 text-sm">
                                    Amount: GH₵ {fee.fee.amount}
                                </p>
                                <p
                                    className={`font-medium ${fee.status === "paid"
                                        ? "text-green-600"
                                        : "text-red-600"
                                        }`}
                                >
                                    Status: {fee.status.toUpperCase()}
                                </p>
                            </div>

                            {/* Only show Pay button if not paid */}
                            {fee.status !== "paid" && (
                                <button
                                    onClick={() => handlePay(fee._id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Pay Now
                                </button>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </StudentLayout>
    );
}

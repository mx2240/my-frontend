import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../../layouts/StudentLayout";

export default function StudentFeesPage() {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadFees();
    }, []);

    async function loadFees() {
        try {
            const res = await api.get("/student/my-fees");

            if (res.data.ok) {
                setFees(res.data.fees);
            } else {
                toast.error("Unable to load fees");
            }
        } catch (err) {
            toast.error("Server error loading fees");
        } finally {
            setLoading(false);
        }
    }

    async function handlePay(assignedFeeId) {
        try {
            const res = await api.post("/payments/initiate", { assignedFeeId });

            if (res.data.ok) {
                window.location.href = res.data.authorization_url;
            } else {
                toast.error("Payment failed to start");
            }
        } catch (err) {
            toast.error("Payment error");
        }
    }

    if (loading) {
        return (
            <StudentLayout>
                <div className="p-6 text-center text-lg font-semibold">
                    Loading fees...
                </div>
            </StudentLayout>
        );
    }

    return (
        <StudentLayout>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">My Fees</h2>

                {fees.length === 0 ? (
                    <div className="text-center text-gray-600 pt-10">
                        No assigned fees yet.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse shadow-md">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 border">Title</th>
                                    <th className="p-3 border">Amount</th>
                                    <th className="p-3 border">Status</th>
                                    <th className="p-3 border">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {fees.map((fee) => (
                                    <tr key={fee._id} className="text-center">
                                        <td className="border p-3">{fee.fee.title}</td>
                                        <td className="border p-3">GHS{fee.fee.amount.toLocaleString()}</td>
                                        <td className="border p-3">
                                            {fee.isPaid ? (
                                                <span className="bg-green-200 text-green-800 px-3 py-1 rounded">
                                                    PAID
                                                </span>
                                            ) : (
                                                <span className="bg-red-200 text-red-800 px-3 py-1 rounded">
                                                    PENDING
                                                </span>
                                            )}
                                        </td>

                                        <td className="border p-3">
                                            {fee.isPaid ? (
                                                <button
                                                    className="bg-gray-400 cursor-default text-white px-4 py-2 rounded"
                                                    disabled
                                                >
                                                    Paid
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handlePay(fee._id)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                                >
                                                    Pay Now
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}

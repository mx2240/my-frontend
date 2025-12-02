import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function StudentPaymentPage() {
    const [fees, setFees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFees();
    }, []);

    async function fetchFees() {
        try {
            const res = await api.get("/student-fees/my-fees");
            if (res.data.ok) setFees(res.data.fees);
        } catch (err) {
            toast.error("Unable to load fees");
        }
    }

    async function handlePay(assignedFeeId) {
        try {
            const res = await api.post("/paystack/initiate", { assignedFeeId });

            if (res.data.ok) {
                window.location.href = res.data.authorization_url; // redirect to paystack
            }

        } catch (err) {
            toast.error("Payment init failed");
        }
    }

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">My Fees & Payments</h2>

            <div className="space-y-4">
                {fees.map((item) => (
                    <div key={item._id} className="border p-4 rounded shadow bg-white">
                        <h3 className="font-bold text-lg">{item.fee.title}</h3>
                        <p>Amount: GH₵ {item.fee.amount}</p>
                        <p>Status:
                            <span
                                className={`ml-2 px-2 py-1 rounded text-white 
                                ${item.status === "paid" ? "bg-green-600" : "bg-red-600"}`}>
                                {item.status}
                            </span>
                        </p>

                        {item.status !== "paid" && (
                            <button
                                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                                onClick={() => handlePay(item._id)}
                            >
                                Pay Now
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentPaymentPage;

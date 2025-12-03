


import React, { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import fetch from "../../fetch";
import toast from "react-hot-toast";

export default function StudentFees() {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [payLoading, setPayLoading] = useState(false);

    async function load() {
        try {
            setLoading(true);
            const res = await fetch.get("/student/my-fees");
            if (res.data.ok) setFees(res.data.fees);
            else toast.error(res.data.message || "Failed to load fees");
        } catch (err) {
            console.error(err);
            toast.error("Failed to load fees");
        } finally { setLoading(false); }
    }

    useEffect(() => { load(); }, []);

    const pay = async (assignment) => {
        try {
            setPayLoading(true);
            // call your paystack init endpoint
            const res = await fetch.post("/payments/initiate", {
                assignmentId: assignment._id,
                email: assignment.studentEmail || (JSON.parse(localStorage.getItem("student") || "null")?.email)
            });

            if (res.data.ok && res.data.authorization_url) {
                // open paystack checkout in new tab
                window.open(res.data.authorization_url, "_blank");
                toast.success("Opening Paystack checkout...");
            } else {
                toast.error("Payment initialization failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Payment init failed");
        } finally { setPayLoading(false); }
    };

    return (
        <StudentLayout>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Your Fees</h2>

                {loading ? <div>Loading...</div> : (
                    <div className="grid gap-4">
                        {fees.length === 0 ? (
                            <div className="p-4 bg-white rounded shadow">No fees assigned yet.</div>
                        ) : fees.map(f => (
                            <div key={f._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                                <div>
                                    <div className="font-semibold">{f.fee.title} — GH₵{f.fee.amount}</div>
                                    <div className="text-sm text-gray-600">{f.fee.description}</div>
                                    <div className="mt-2 text-sm">Assigned: {new Date(f.createdAt).toLocaleDateString()}</div>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <div className={`font-semibold ${f.status === "paid" ? "text-green-600" : "text-red-600"}`}>{f.status?.toUpperCase()}</div>
                                    {f.status !== "paid" && (
                                        <div className="flex gap-2">
                                            <button onClick={() => pay(f)} disabled={payLoading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                                {payLoading ? "Processing..." : "Pay Online"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}

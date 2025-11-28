import React, { useEffect, useState } from "react";
import fetch from "../../fetch";
import toast from "react-hot-toast";
import Studentlayout from "../../layouts/StudentLayout";

function MyFees() {
    const [fees, setFees] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch.get("/fees/my/fees");
                setFees(res.data.assigned);
            } catch (err) {
                toast.error("Could not load fees");
            }
        };
        load();
    }, []);

    return (
        <Studentlayout>
            <div className="p-5">
                <h2 className="text-2xl font-bold mb-5">My Fees</h2>

                {fees.length === 0 ? (
                    <p>No fees assigned yet</p>
                ) : (
                    <div className="space-y-4">
                        {fees.map((item) => (
                            <div key={item._id} className="p-4 border rounded shadow">
                                <h3 className="font-bold text-lg">
                                    {item.fee?.title}
                                </h3>

                                <p>Amount: GH₵ {item.fee?.amount}</p>
                                <p>Status:
                                    <span
                                        className={`ml-2 font-semibold ${item.status === "paid"
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </p>

                                <p className="text-sm text-gray-600">
                                    Due: {item.fee?.dueDate?.substring(0, 10)}
                                </p>

                                {item.status === "pending" && (
                                    <button
                                        className="mt-3 bg-blue-600 text-white px-4 py-1 rounded"
                                    >
                                        Pay Now
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Studentlayout>
    );
}

export default MyFees;

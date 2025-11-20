import React, { useContext, useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { AuthContext } from "../../context/AuthProvider";

const Payments = () => {
    const { token } = useContext(AuthContext);
    const [fees, setFees] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/fees/my-fees", { headers: { Authorization: `Bearer ${token}` } });
                const data = await res.json();
                setFees(Array.isArray(data) ? data : []);
            } catch (err) { console.error(err); }
        })();
    }, [token]);

    return (
        <StudentLayout>
            <h2 className="text-xl font-semibold mb-4">My Payments</h2>
            <div className="grid gap-4">
                {fees.length === 0 && <div className="p-4 bg-white rounded shadow">No fees found.</div>}
                {fees.map(f => (
                    <div key={f._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">{f.title}</h3>
                            <p className="text-sm text-gray-500">Amount: GH₵{f.amount}</p>
                        </div>
                        <div>
                            <span className={`px-3 py-1 rounded ${f.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{f.isPaid ? 'Paid' : 'Pending'}</span>
                        </div>
                    </div>
                ))}
            </div>
        </StudentLayout>
    );
};
export default Payments;

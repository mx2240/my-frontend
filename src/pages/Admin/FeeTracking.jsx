import React, { useEffect, useState } from "react";
import fetch from "../../fetch";
import AdminLayout from "../../layouts/AdminLayout";

function FeeTracking() {
    const [students, setStudents] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        const res = await fetch.get(
            "/fees/students",
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setStudents(res.data.students);
    };

    const updateStatus = async (assignmentId, status) => {
        try {
            await fetch.put(
                "/fees/status",
                { assignmentId, status },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            loadStudents(); // refresh
        } catch (err) {
            alert("Failed to update status");
        }
    };

    return (
        <AdminLayout>

            <div className="fee-container">
                <h2>Fee Tracking</h2>

                {students.map(s => (
                    <div key={s._id} className="student-card">
                        <h3>{s.name}</h3>
                        <p>Email: {s.email}</p>

                        {s.fees.length === 0 ? (
                            <p>No fees assigned</p>
                        ) : (
                            s.fees.map(f => (
                                <div className="fee-box" key={f._id}>
                                    <p>
                                        <strong>{f.fee.title}</strong> — GH₵{f.fee.amount}
                                    </p>

                                    <p>Status: {f.status}</p>

                                    <button
                                        onClick={() => updateStatus(f._id, "paid")}
                                        className="btn-paid"
                                    >
                                        Mark as Paid
                                    </button>

                                    <button
                                        onClick={() => updateStatus(f._id, "unpaid")}
                                        className="btn-unpaid"
                                    >
                                        Mark Unpaid
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}

export default FeeTracking;

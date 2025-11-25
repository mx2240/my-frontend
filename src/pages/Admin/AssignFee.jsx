import React, { useState, useEffect } from "react";
import fetch from '../../fetch'
import AdminLayout from "../../layouts/AdminLayout";

function AssignFee() {
    const [students, setStudents] = useState([]);
    const [fees, setFees] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedFee, setSelectedFee] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const s = await fetch.get(
            "/students",
            { headers: { Authorization: `Bearer ${token}` } }
        );

        const f = await fetch.get(
            "/fees/all",
            { headers: { Authorization: `Bearer ${token}` } }
        );

        setStudents(s.data.students);
        setFees(f.data.fees);
    };

    const assignFee = async () => {
        if (!selectedStudent || !selectedFee) return alert("Select both");

        try {
            await fetch.post(
                "/fees/assign",
                { studentId: selectedStudent, feeId: selectedFee },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Fee assigned successfully");
        } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Failed to assign fee");
        }
    };

    return (
        <AdminLayout>

            <div className="fee-container">
                <h2>Assign Fee to Student</h2>

                <label>Select Student</label>
                <select onChange={e => setSelectedStudent(e.target.value)}>
                    <option value="">Choose one</option>
                    {students.map(s => (
                        <option key={s._id} value={s._id}>
                            {s.name}
                        </option>
                    ))}
                </select>

                <label>Select Fee</label>
                <select onChange={e => setSelectedFee(e.target.value)}>
                    <option value="">Choose one</option>
                    {fees.map(f => (
                        <option key={f._id} value={f._id}>
                            {f.title} — GH₵{f.amount}
                        </option>
                    ))}
                </select>

                <button onClick={assignFee}>Assign Fee</button>
            </div>
        </AdminLayout>
    );
}

export default AssignFee;

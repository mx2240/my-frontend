// import React, { useState, useEffect } from "react";
// import fetch from "../../fetch";
// import AdminLayout from "../../layouts/AdminLayout";

// const AssignFee = () => {
//     const [students, setStudents] = useState([]);
//     const [fees, setFees] = useState([]);
//     const [studentId, setStudentId] = useState("");
//     const [feeId, setFeeId] = useState("");
//     const [loading, setLoading] = useState(false);

//     const token = localStorage.getItem("token");

//     // Load students
//     useEffect(() => {
//         fetch
//             .get("/students")
//             .then((res) => {
//                 if (res.data.ok) setStudents(res.data.students);
//             })
//             .catch((err) => console.log("Student Load Error:", err));
//     }, []);

//     // Load fees
//     useEffect(() => {
//         fetch
//             .get("/fees/all", {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//             .then((res) => {
//                 if (res.data.ok) setFees(res.data.fees);
//             })
//             .catch((err) => console.log("Fee Load Error:", err));
//     }, [token]);

//     // Submit Assign
//     const assignFee = async () => {
//         if (!studentId || !feeId) return alert("Select student and fee");

//         setLoading(true);

//         try {
//             const res = await fetch.post(
//                 "/fees/assign",
//                 { studentId, feeId },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             if (res.data.ok) {
//                 alert("Fee assigned successfully");
//                 setStudentId("");
//                 setFeeId("");
//             }
//         } catch (err) {
//             alert(err?.response?.data?.message || "Failed to assign");
//         }

//         setLoading(false);
//     };

//     return (

//         <AdminLayout>
//             <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow rounded">
//                 <h2 className="text-2xl font-bold mb-5">Assign Fee</h2>

//                 {/* Student Dropdown */}
//                 <label className="block mb-2 font-semibold">Select Student</label>
//                 <select
//                     value={studentId}
//                     onChange={(e) => setStudentId(e.target.value)}
//                     className="w-full p-2 border rounded mb-4"
//                 >
//                     <option value="">Choose student</option>
//                     {students.map((s) => (
//                         <option key={s._id} value={s._id}>
//                             {s.name} — {s.email}
//                         </option>
//                     ))}
//                 </select>

//                 {/* Fee Dropdown */}
//                 <label className="block mb-2 font-semibold">Select Fee</label>
//                 <select
//                     value={feeId}
//                     onChange={(e) => setFeeId(e.target.value)}
//                     className="w-full p-2 border rounded mb-4"
//                 >
//                     <option value="">Choose fee</option>
//                     {fees.map((f) => (
//                         <option key={f._id} value={f._id}>
//                             {f.title} — GHC {f.amount}
//                         </option>
//                     ))}
//                 </select>

//                 {/* Submit Button */}
//                 <button
//                     onClick={assignFee}
//                     disabled={loading}
//                     className="w-full bg-blue-600 text-white py-2 rounded mt-4"
//                 >
//                     {loading ? "Assigning..." : "Assign Fee"}
//                 </button>
//             </div>
//         </AdminLayout>
//     );
// };

// export default AssignFee;



import React, { useEffect, useState } from "react";
import fetch from "../../fetch";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";


function AssignFee() {
    const [students, setStudents] = useState([]);
    const [fees, setFees] = useState([]);
    const [studentId, setStudentId] = useState("");
    const [feeId, setFeeId] = useState("");

    const loadData = async () => {
        try {
            const resStudents = await fetch.get("/students");
            const resFees = await fetch.get("/fees");

            setStudents(resStudents.data.students);
            setFees(resFees.data.fees);
        } catch (error) {
            toast.error("Failed loading data");
        }
    };

    const assignFee = async (e) => {
        e.preventDefault();

        if (!studentId || !feeId) {
            toast.error("All fields required");
            return;
        }

        try {
            const res = await fetch.post("/assign-fee/assign", {
                studentId,
                feeId,
            });

            toast.success("Fee assigned successfully");
            setStudentId("");
            setFeeId("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error assigning");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <AdminLayout>
            <div className="p-5">
                <h2 className="text-2xl font-bold mb-5">Assign Fee to Student</h2>

                <form className="max-w-md space-y-4" onSubmit={assignFee}>
                    <div>
                        <label className="font-semibold">Select Student</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                        >
                            <option value="">-- Select --</option>
                            {students.map((s) => (
                                <option key={s._id} value={s._id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="font-semibold">Select Fee</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={feeId}
                            onChange={(e) => setFeeId(e.target.value)}
                        >
                            <option value="">-- Select --</option>
                            {fees.map((f) => (
                                <option key={f._id} value={f._id}>
                                    {f.title} — GH₵{f.amount}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Assign Fee
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}

export default AssignFee;


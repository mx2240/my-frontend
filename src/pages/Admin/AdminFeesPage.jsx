// import { useEffect, useState } from "react";
// import fetch from "../../fetch";
// import toast from "react-hot-toast";
// import AdminLayout from "../../layouts/AdminLayout";

// // const API = "/api";

// export default function FeesPage() {
//     const [fees, setFees] = useState([]);
//     const [students, setStudents] = useState([]);

//     const [newFee, setNewFee] = useState({
//         title: "",
//         amount: "",
//         description: "",
//     });

//     const [assignData, setAssignData] = useState({
//         studentId: "",
//         feeId: "",
//     });

//     useEffect(() => {
//         loadFees();
//         loadStudents();
//     }, []);

//     const loadFees = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const res = await fetch.get(`/fees`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             if (res.data.ok) setFees(res.data.fees);
//         } catch {
//             toast.error("Failed to load fees");
//         }
//     };

//     const loadStudents = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const res = await fetch.get(`/students`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             if (res.data.ok) setStudents(res.data.students);
//         } catch {
//             toast.error("Failed to load students");
//         }
//     };

//     const createFee = async (e) => {
//         e.preventDefault();

//         if (!newFee.title || !newFee.amount) {
//             return toast.error("Title & Amount are required");
//         }

//         try {
//             const token = localStorage.getItem("token");
//             const res = await fetch.post(`/fees`, newFee, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             if (res.data.ok) {
//                 toast.success("Fee created");
//                 setNewFee({ title: "", amount: "", description: "" });
//                 loadFees();
//             }
//         } catch {
//             toast.error("Error creating fee");
//         }
//     };

//     const deleteFee = async (feeId) => {
//         if (!window.confirm("Delete this fee?")) return;

//         try {
//             const token = localStorage.getItem("token");
//             const res = await fetch.delete(`/fees/${feeId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             if (res.data.ok) {
//                 toast.success("Fee deleted");
//                 loadFees();
//             }
//         } catch {
//             toast.error("Error deleting fee");
//         }
//     };

//     const assignFee = async (e) => {
//         e.preventDefault();
//         if (!assignData.studentId || !assignData.feeId) {
//             return toast.error("Please select fee and student");
//         }

//         try {
//             const token = localStorage.getItem("token");
//             const res = await fetch.post(`/assign-fee/assign`, assignData, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             if (res.data.ok) {
//                 toast.success("Fee assigned");
//                 setAssignData({ studentId: "", feeId: "" });
//             }
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Failed to assign");
//         }
//     };

//     return (

//         <AdminLayout>


//             <div className="p-6 max-w-6xl mx-auto">

//                 {/* PAGE TITLE */}
//                 <h1 className="text-3xl font-bold mb-6 text-gray-800">🎓 Fee Management</h1>

//                 {/* CREATE FEE */}
//                 <div className="bg-white shadow-md rounded-xl p-5 mb-8">
//                     <h2 className="text-xl font-semibold mb-4">➕ Create New Fee</h2>

//                     <form onSubmit={createFee} className="grid md:grid-cols-3 gap-4">
//                         <input
//                             type="text"
//                             className="input"
//                             placeholder="Fee Title"
//                             value={newFee.title}
//                             onChange={(e) => setNewFee({ ...newFee, title: e.target.value })}
//                         />

//                         <input
//                             type="number"
//                             className="input"
//                             placeholder="Amount"
//                             value={newFee.amount}
//                             onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
//                         />

//                         <input
//                             type="text"
//                             className="input"
//                             placeholder="Description"
//                             value={newFee.description}
//                             onChange={(e) =>
//                                 setNewFee({ ...newFee, description: e.target.value })
//                             }
//                         />

//                         <button
//                             type="submit"
//                             className="col-span-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
//                         >
//                             Create Fee
//                         </button>
//                     </form>
//                 </div>

//                 {/* FEE LIST */}
//                 <div className="bg-white shadow-md rounded-xl p-5 mb-8 overflow-x-auto">
//                     <h2 className="text-xl font-semibold mb-4">📋 Fee List</h2>

//                     <table className="w-full min-w-[700px]">
//                         <thead>
//                             <tr className="bg-gray-100 text-left">
//                                 <th className="p-2">Title</th>
//                                 <th className="p-2">Amount</th>
//                                 <th className="p-2">Description</th>
//                                 <th className="p-2">Action</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {fees.map((fee) => (
//                                 <tr key={fee._id} className="border-t">
//                                     <td className="p-2">{fee.title}</td>
//                                     <td className="p-2">GH₵ {fee.amount}</td>
//                                     <td className="p-2">{fee.description}</td>
//                                     <td className="p-2">
//                                         <button
//                                             onClick={() => deleteFee(fee._id)}
//                                             className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}

//                             {fees.length === 0 && (
//                                 <tr>
//                                     <td colSpan="4" className="text-center p-4 text-gray-500">
//                                         No fees yet.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* ASSIGN FEE */}
//                 <div className="bg-white shadow-md rounded-xl p-5">
//                     <h2 className="text-xl font-semibold mb-4">📌 Assign Fee</h2>

//                     <form
//                         onSubmit={assignFee}
//                         className="grid md:grid-cols-2 gap-4 items-center"
//                     >
//                         <select
//                             className="input"
//                             value={assignData.studentId}
//                             onChange={(e) =>
//                                 setAssignData({ ...assignData, studentId: e.target.value })
//                             }
//                         >
//                             <option value="">Select Student</option>
//                             {students.map((s) => (
//                                 <option key={s._id} value={s._id}>
//                                     {s.name} — {s.email}
//                                 </option>
//                             ))}
//                         </select>

//                         <select
//                             className="input"
//                             value={assignData.feeId}
//                             onChange={(e) =>
//                                 setAssignData({ ...assignData, feeId: e.target.value })
//                             }
//                         >
//                             <option value="">Select Fee</option>
//                             {fees.map((f) => (
//                                 <option key={f._id} value={f._id}>
//                                     {f.title} — GH₵ {f.amount}
//                                 </option>
//                             ))}
//                         </select>

//                         <button
//                             type="submit"
//                             className="col-span-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
//                         >
//                             Assign Fee
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </AdminLayout>
//     );
// }



import { useEffect, useState } from "react";
import fetch from "../../fetch";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";

export default function FeesPage() {
    const [fees, setFees] = useState([]);
    const [students, setStudents] = useState([]);

    const [newFee, setNewFee] = useState({
        title: "",
        amount: "",
        description: "",
    });

    const [assignData, setAssignData] = useState({
        studentId: "",
        feeId: "",
    });

    useEffect(() => {
        loadFees();
        loadStudents();
    }, []);

    const loadFees = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch.get(`/fees`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.ok) setFees(res.data.fees);
        } catch {
            toast.error("Failed to load fees");
        }
    };

    const loadStudents = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch.get(`/students`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.ok) setStudents(res.data.students);
        } catch {
            toast.error("Failed to load students");
        }
    };

    const createFee = async (e) => {
        e.preventDefault();

        if (!newFee.title || !newFee.amount || !newFee.description) {
            return toast.error("Title, Amount, and Description are required");
        }

        try {
            const token = localStorage.getItem("token");
            const res = await fetch.post(`/fees`, newFee, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Create Fee Response:", res.data);

            if (res.data.ok || res.data.success) {
                toast.success("Fee created 🎉");
                setNewFee({ title: "", amount: "", description: "" });
                loadFees();
            } else {
                toast.error("Unexpected response");
            }

        } catch (err) {
            toast.error(err.response?.data?.message || "Error creating fee");
        }
    };


    const deleteFee = async (feeId) => {
        if (!window.confirm("Do you really want to delete this fee?")) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch.delete(`/fees/${feeId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.ok) {
                toast.success("Fee deleted");
                loadFees();
            }
        } catch {
            toast.error("Error deleting fee");
        }
    };

    const assignFee = async (e) => {
        e.preventDefault();

        if (!assignData.studentId || !assignData.feeId) {
            return toast.error("Please select both Student and Fee");
        }

        try {
            const token = localStorage.getItem("token");
            const res = await fetch.post(`/assign-fee/assign`, assignData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.ok) {
                toast.success("Fee Assigned Successfully ✔");
                setAssignData({ studentId: "", feeId: "" });
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to assign fee");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    💰 Fee Management
                </h1>

                {/* GRID WRAPPER */}
                <div className="grid lg:grid-cols-2 gap-8 mb-10">

                    {/* CREATE FEE CARD */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <h2 className="text-xl font-semibold mb-5 text-gray-700">
                            ➕ Create New Fee
                        </h2>

                        <form onSubmit={createFee} className="grid gap-4">
                            <input
                                type="text"
                                placeholder="Fee Title"
                                className="input"
                                value={newFee.title}
                                onChange={(e) =>
                                    setNewFee({ ...newFee, title: e.target.value })
                                }
                            />

                            <input
                                type="number"
                                placeholder="Amount"
                                className="input"
                                value={newFee.amount}
                                onChange={(e) =>
                                    setNewFee({ ...newFee, amount: e.target.value })
                                }
                            />

                            <input
                                type="text"
                                placeholder="Description"
                                className="input"
                                value={newFee.description}
                                onChange={(e) =>
                                    setNewFee({ ...newFee, description: e.target.value })
                                }
                            />

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow"
                            >
                                Create Fee
                            </button>
                        </form>
                    </div>

                    {/* ASSIGN FEE CARD */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">
                            📌 Assign Fee
                        </h2>

                        <form onSubmit={assignFee} className="grid gap-4">

                            <select
                                className="input"
                                value={assignData.studentId}
                                onChange={(e) =>
                                    setAssignData({ ...assignData, studentId: e.target.value })
                                }
                            >
                                <option value="">Select Student</option>
                                {students.map((s) => (
                                    <option key={s._id} value={s._id}>
                                        {s.name} — {s.email}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="input"
                                value={assignData.feeId}
                                onChange={(e) =>
                                    setAssignData({ ...assignData, feeId: e.target.value })
                                }
                            >
                                <option value="">Select Fee</option>
                                {fees.map((f) => (
                                    <option key={f._id} value={f._id}>
                                        {f.title} — GH₵ {f.amount}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow"
                            >
                                Assign Fee
                            </button>
                        </form>
                    </div>
                </div>

                {/* FEE LIST */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">📋 All Fees</h2>

                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-left">
                                <th className="p-3">Title</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Description</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {fees.map((fee) => (
                                <tr
                                    key={fee._id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="p-3">{fee.title}</td>
                                    <td className="p-3 font-semibold">GH₵ {fee.amount}</td>
                                    <td className="p-3">{fee.description}</td>

                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => deleteFee(fee._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full shadow-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {fees.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-gray-500">
                                        No fees have been added yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}

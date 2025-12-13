
// import { useEffect, useState } from "react";
// import fetch from "../../fetch";
// import toast from "react-hot-toast";
// import AdminLayout from "../../layouts/AdminLayout";

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
//         if (!window.confirm("Do you really want to delete this fee?")) return;

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
//             return toast.error("Please select both Student and Fee");
//         }

//         try {
//             const token = localStorage.getItem("token");
//             const res = await fetch.post(`/assign-fee/assign`, assignData, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             if (res.data.ok) {
//                 toast.success("Fee Assigned Successfully ✔");
//                 setAssignData({ studentId: "", feeId: "" });
//             }
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Failed to assign fee");
//         }
//     };

//     return (
//         <AdminLayout>
//             <div className="p-6 max-w-7xl mx-auto">

//                 <h1 className="text-3xl font-bold mb-6 text-gray-800">
//                     💰 Fee Management
//                 </h1>

//                 {/* GRID WRAPPER */}
//                 <div className="grid lg:grid-cols-2 gap-8 mb-10">

//                     {/* CREATE FEE CARD */}
//                     <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
//                         <h2 className="text-xl font-semibold mb-5 text-gray-700">
//                             ➕ Create New Fee
//                         </h2>

//                         <form onSubmit={createFee} className="grid gap-4">
//                             <input
//                                 type="text"
//                                 placeholder="Fee Title"
//                                 className="input"
//                                 value={newFee.title}
//                                 onChange={(e) =>
//                                     setNewFee({ ...newFee, title: e.target.value })
//                                 }
//                             />

//                             <input
//                                 type="number"
//                                 placeholder="Amount"
//                                 className="input"
//                                 value={newFee.amount}
//                                 onChange={(e) =>
//                                     setNewFee({ ...newFee, amount: e.target.value })
//                                 }
//                             />

//                             <input
//                                 type="text"
//                                 placeholder="Description"
//                                 className="input"
//                                 value={newFee.description}
//                                 onChange={(e) =>
//                                     setNewFee({ ...newFee, description: e.target.value })
//                                 }
//                             />

//                             <button
//                                 type="submit"
//                                 className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow"
//                             >
//                                 Create Fee
//                             </button>
//                         </form>
//                     </div>

//                     {/* ASSIGN FEE CARD */}
//                     <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
//                         <h2 className="text-xl font-semibold mb-4 text-gray-700">
//                             📌 Assign Fee
//                         </h2>

//                         <form onSubmit={assignFee} className="grid gap-4">

//                             <select
//                                 className="input"
//                                 value={assignData.studentId}
//                                 onChange={(e) =>
//                                     setAssignData({ ...assignData, studentId: e.target.value })
//                                 }
//                             >
//                                 <option value="">Select Student</option>
//                                 {students.map((s) => (
//                                     <option key={s._id} value={s._id}>
//                                         {s.name} — {s.email}
//                                     </option>
//                                 ))}
//                             </select>

//                             <select
//                                 className="input"
//                                 value={assignData.feeId}
//                                 onChange={(e) =>
//                                     setAssignData({ ...assignData, feeId: e.target.value })
//                                 }
//                             >
//                                 <option value="">Select Fee</option>
//                                 {fees.map((f) => (
//                                     <option key={f._id} value={f._id}>
//                                         {f.title} — GH₵ {f.amount}
//                                     </option>
//                                 ))}
//                             </select>

//                             <button
//                                 type="submit"
//                                 className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow"
//                             >
//                                 Assign Fee
//                             </button>
//                         </form>
//                     </div>
//                 </div>

//                 {/* FEE LIST */}
//                 <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 overflow-x-auto">
//                     <h2 className="text-xl font-semibold mb-4 text-gray-700">📋 All Fees</h2>

//                     <table className="w-full min-w-[700px]">
//                         <thead>
//                             <tr className="bg-gray-100 text-gray-700 text-left">
//                                 <th className="p-3">Title</th>
//                                 <th className="p-3">Amount</th>
//                                 <th className="p-3">Description</th>
//                                 <th className="p-3 text-center">Action</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {fees.map((fee) => (
//                                 <tr
//                                     key={fee._id}
//                                     className="border-b hover:bg-gray-50 transition"
//                                 >
//                                     <td className="p-3">{fee.title}</td>
//                                     <td className="p-3 font-semibold">GH₵ {fee.amount}</td>
//                                     <td className="p-3">{fee.description}</td>

//                                     <td className="p-3 text-center">
//                                         <button
//                                             onClick={() => deleteFee(fee._id)}
//                                             className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full shadow-sm"
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}

//                             {fees.length === 0 && (
//                                 <tr>
//                                     <td colSpan="4" className="text-center py-6 text-gray-500">
//                                         No fees have been added yet.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
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
    const [newFee, setNewFee] = useState({ title: "", amount: "", description: "" });
    const [assignData, setAssignData] = useState({ studentId: "", feeId: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadFees();
        loadStudents();
    }, []);

    const loadFees = async () => {
        try {
            const res = await fetch.get("/fees");
            if (res.data.ok) setFees(res.data.fees);
        } catch {
            toast.error("Failed to load fees");
        }
    };

    const loadStudents = async () => {
        try {
            const res = await fetch.get("/students");
            if (res.data.ok) setStudents(res.data.students);
        } catch {
            toast.error("Failed to load students");
        }
    };

    const createFee = async (e) => {
        e.preventDefault();
        if (!newFee.title || !newFee.amount) return toast.error("Title & Amount required");

        try {
            setLoading(true);
            const res = await fetch.post("/fees", newFee);
            if (res.data.ok) {
                toast.success("Fee created successfully");
                setNewFee({ title: "", amount: "", description: "" });
                loadFees();
            }
        } catch {
            toast.error("Error creating fee");
        } finally {
            setLoading(false);
        }
    };

    const deleteFee = async (id) => {
        if (!window.confirm("Are you sure you want to delete this fee?")) return;
        try {
            const res = await fetch.delete(`/fees/${id}`);
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
        if (!assignData.studentId || !assignData.feeId) return toast.error("All fields required");

        try {
            setLoading(true);
            await fetch.post("/assign-fee/assign", assignData);
            toast.success("Fee assigned successfully");
            setAssignData({ studentId: "", feeId: "" });
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to assign fee");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold mb-6 text-gray-800">💰 Fee Management</h1>

                {/* GRID: Create Fee & Assign Fee */}
                <div className="grid lg:grid-cols-2 gap-8 mb-10">

                    {/* CREATE FEE */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <h2 className="text-xl font-semibold mb-5 text-gray-700">➕ Create New Fee</h2>

                        <form onSubmit={createFee} className="grid gap-4">
                            <input
                                type="text"
                                placeholder="Fee Title"
                                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={newFee.title}
                                onChange={(e) => setNewFee({ ...newFee, title: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={newFee.amount}
                                onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Description (optional)"
                                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={newFee.description}
                                onChange={(e) => setNewFee({ ...newFee, description: e.target.value })}
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow font-semibold transition"
                            >
                                {loading ? "Creating..." : "Create Fee"}
                            </button>
                        </form>
                    </div>

                    {/* ASSIGN FEE */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <h2 className="text-xl font-semibold mb-5 text-gray-700">📌 Assign Fee</h2>

                        <form onSubmit={assignFee} className="grid gap-4">
                            <select
                                className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                                value={assignData.studentId}
                                onChange={(e) => setAssignData({ ...assignData, studentId: e.target.value })}
                            >
                                <option value="">Select Student</option>
                                {students.map((s) => (
                                    <option key={s._id} value={s._id}>
                                        {s.name} — {s.email}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                                value={assignData.feeId}
                                onChange={(e) => setAssignData({ ...assignData, feeId: e.target.value })}
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
                                disabled={loading}
                                className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow font-semibold transition"
                            >
                                {loading ? "Assigning..." : "Assign Fee"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* FEE LIST */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">📋 All Fees</h2>
                    <table className="w-full min-w-[700px] text-left">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-3">Title</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Description</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fees.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-gray-500">
                                        No fees available.
                                    </td>
                                </tr>
                            ) : (
                                fees.map((fee) => (
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
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full shadow-sm transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </AdminLayout>
    );
}


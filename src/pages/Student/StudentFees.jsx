// import React, { useEffect, useState } from "react";
// import fetch from "../../fetch";
// import toast from "react-hot-toast";
// import Studentlayout from "../../layouts/StudentLayout";

// function MyFees() {
//     const [fees, setFees] = useState([]);

//     useEffect(() => {
//         const load = async () => {
//             try {
//                 const res = await fetch.get("/fees/my/fees");
//                 setFees(res.data.assigned);
//             } catch (err) {
//                 toast.error("Could not load fees");
//             }
//         };
//         load();
//     }, []);

//     return (
//         <Studentlayout>
//             <div className="p-5">
//                 <h2 className="text-2xl font-bold mb-5">My Fees</h2>

//                 {fees.length === 0 ? (
//                     <p>No fees assigned yet</p>
//                 ) : (
//                     <div className="space-y-4">
//                         {fees.map((item) => (
//                             <div key={item._id} className="p-4 border rounded shadow">
//                                 <h3 className="font-bold text-lg">
//                                     {item.fee?.title}
//                                 </h3>

//                                 <p>Amount: GH₵ {item.fee?.amount}</p>
//                                 <p>Status:
//                                     <span
//                                         className={`ml-2 font-semibold ${item.status === "paid"
//                                             ? "text-green-600"
//                                             : "text-red-600"
//                                             }`}
//                                     >
//                                         {item.status}
//                                     </span>
//                                 </p>

//                                 <p className="text-sm text-gray-600">
//                                     Due: {item.fee?.dueDate?.substring(0, 10)}
//                                 </p>

//                                 {item.status === "pending" && (
//                                     <button
//                                         className="mt-3 bg-blue-600 text-white px-4 py-1 rounded"
//                                     >
//                                         Pay Now
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </Studentlayout>
//     );
// }

// export default MyFees;



import React, { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import fetch from "../../fetch";

const StudentFees = () => {
    const [fees, setFees] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchFees = async () => {
            try {
                const res = await fetch.get(
                    `/fees/my/fees`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setFees(res.data.assigned || []);
            } catch (err) {
                console.log(err);
            }
        };

        fetchFees();
    }, []);

    return (
        <StudentLayout>
            <h1 className="text-2xl font-bold mb-4">My Fees</h1>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Amount</th>
                            <th className="p-3 text-left">Due Date</th>
                            <th className="p-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fees.map((item) => (
                            <tr key={item._id} className="border-b">
                                <td className="p-3">{item.fee?.title}</td>
                                <td className="p-3">₵{item.fee?.amount}</td>
                                <td className="p-3">{item.fee?.dueDate?.slice(0, 10)}</td>
                                <td className="p-3">
                                    <span className={`px-3 py-1 rounded text-white 
                                        ${item.status === "paid" ? "bg-green-600" : "bg-red-500"}`}>
                                        {item.status || "unpaid"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </StudentLayout>
    );
};

export default StudentFees;


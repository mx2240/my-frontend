// import React, { useEffect, useState } from "react";
// import AdminLayout from "../../layouts/AdminLayout"

// const AdminEnrollments = () => {
//     const [enrollments, setEnrollments] = useState([]);

//     useEffect(() => {
//         const token = localStorage.getItem("token");

//         async function load() {
//             try {
//                 const res = await fetch("/admin/enroll", {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });

//                 const data = await res.json();
//                 setEnrollments(data || []);
//             } catch (err) {
//                 console.error("Error loading enrollments:", err);
//             }
//         }

//         load();
//     }, []);

//     return (
//         <AdminLayout>
//             <div className="p-6">
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-2xl font-semibold text-gray-800">
//                         Student Enrollments
//                     </h1>

//                     <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
//                         <a href="/admin/enrollment/form">  + Add Enrollment</a>
//                     </button>
//                 </div>

//                 {/* Table */}
//                 <div className="bg-white shadow rounded-lg overflow-x-auto">
//                     <table className="w-full">
//                         <thead>
//                             <tr className="bg-gray-100 text-left">
//                                 <th className="p-3 text-gray-700 font-medium">Student</th>
//                                 <th className="p-3 text-gray-700 font-medium">Course</th>
//                                 <th className="p-3 text-gray-700 font-medium">Status</th>
//                                 <th className="p-3 text-gray-700 font-medium">Date</th>
//                                 <th className="p-3 text-gray-700 font-medium">Actions</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {enrollments.length > 0 ? (
//                                 enrollments.map((enroll) => (
//                                     <tr key={enroll._id} className="border-b hover:bg-gray-50">
//                                         <td className="p-3 font-semibold">
//                                             {enroll.student?.name || "Unknown"}
//                                         </td>
//                                         <td className="p-3">
//                                             {enroll.course?.title || "N/A"}
//                                         </td>

//                                         {/* Status Badge */}
//                                         <td className="p-3">
//                                             <span
//                                                 className={`px-3 py-1 text-sm rounded-full ${enroll.status === "active"
//                                                     ? "bg-green-100 text-green-700"
//                                                     : "bg-yellow-100 text-yellow-700"
//                                                     }`}
//                                             >
//                                                 {enroll.status || "pending"}
//                                             </span>
//                                         </td>

//                                         <td className="p-3">
//                                             {new Date(enroll.createdAt).toLocaleDateString()}
//                                         </td>

//                                         {/* Action Buttons */}
//                                         <td className="p-3 flex gap-2">
//                                             <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
//                                                 View
//                                             </button>
//                                             <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
//                                                 Remove
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td
//                                         colSpan="5"
//                                         className="text-center p-4 text-gray-500"
//                                     >
//                                         No enrollments found.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </AdminLayout>
//     );
// };

// export default AdminEnrollments;







import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import { api } from "../../api";

export default function EnrollStudent() {
    const [students, setStudents] = useState([]); const [courses, setCourses] = useState([]);
    const [data, setData] = useState({ studentId: "", courseId: "" });

    useEffect(() => { load(); }, []);
    const load = async () => { try { const s = await api("/students"); if (s.ok) setStudents(s.body); const c = await api("/courses"); if (c.ok) setCourses(c.body); } catch (e) { } };

    const submit = async e => { e.preventDefault(); try { const res = await api("/enrollments/admin/enroll", "POST", data); if (res.ok) { toast.success("Enrolled"); setData({ studentId: "", courseId: "" }); } else toast.error(res.body.message || "Failed"); } catch (err) { toast.error("Server error"); } };



    return (
        <AdminLayout>
            <div className="p-6 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Enroll Student</h2>
                <form onSubmit={submit} className="bg-white p-6 rounded shadow space-y-4">
                    <select required value={data.studentId} onChange={e => setData({ ...data, studentId: e.target.value })} className="border p-3 rounded w-full">
                        <option value="">Select student</option>
                        {students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                    </select>
                    <select required value={data.courseId} onChange={e => setData({ ...data, courseId: e.target.value })} className="border p-3 rounded w-full">
                        <option value="">Select course</option>
                        {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded">Enroll</button>
                </form>
            </div>
        </AdminLayout>
    );
}

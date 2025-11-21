// // src/pages/Admin/AddStudent.jsx
// import React, { useState } from "react";
// import { FaUserPlus, FaSave } from "react-icons/fa";
// import AdminLayout from "../../layouts/AdminLayout";
// import toast from "react-hot-toast";

// const AddStudent = () => {
//     const [student, setStudent] = useState({
//         name: "",
//         email: "",
//         course: "",
//         phone: "",
//     });

//     const token = localStorage.getItem("token");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!token) return toast.error("No token found. Please login.");

//         try {
//             const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/students`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(student),
//             });
//             const data = await res.json();

//             if (res.ok) {
//                 toast.success(`Student ${student.name} added successfully!`);
//                 setStudent({ name: "", email: "", course: "", phone: "" });
//             } else {
//                 toast.error(data.message || "Failed to add student");
//             }
//         } catch (err) {
//             console.error(err);
//             toast.error("Server error");
//         }
//     };

//     return (
//         <AdminLayout>
//             <div className="p-6">
//                 <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
//                     <FaUserPlus className="text-green-600" /> Add Student
//                 </h1>

//                 <form
//                     onSubmit={handleSubmit}
//                     className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-2 gap-4"
//                 >
//                     <div>
//                         <label className="block font-medium">Full Name</label>
//                         <input
//                             type="text"
//                             value={student.name}
//                             onChange={(e) => setStudent({ ...student, name: e.target.value })}
//                             className="border p-3 w-full rounded-lg mt-1"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label className="block font-medium">Email</label>
//                         <input
//                             type="email"
//                             value={student.email}
//                             onChange={(e) => setStudent({ ...student, email: e.target.value })}
//                             className="border p-3 w-full rounded-lg mt-1"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label className="block font-medium">Course</label>
//                         <input
//                             type="text"
//                             value={student.course}
//                             onChange={(e) => setStudent({ ...student, course: e.target.value })}
//                             className="border p-3 w-full rounded-lg mt-1"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label className="block font-medium">Phone</label>
//                         <input
//                             type="text"
//                             value={student.phone}
//                             onChange={(e) => setStudent({ ...student, phone: e.target.value })}
//                             className="border p-3 w-full rounded-lg mt-1"
//                             required
//                         />
//                     </div>

//                     <div className="md:col-span-2 mt-4">
//                         <button
//                             type="submit"
//                             className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
//                         >
//                             <FaSave /> Add Student
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </AdminLayout>
//     );
// };

// export default AddStudent;






import React, { useState, useContext } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import { api } from "../../api";
import { AuthContext } from "../../context/AuthProvider";
import fetch from "../../fetch";

export default function AddStudent() {
    const [student, setStudent] = useState({ name: "", email: "", phone: "", course: "" });
    const { user } = useContext(AuthContext);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch.post("/students/create", "POST", student);
            if (res.ok) { toast.success("Student added"); setStudent({ name: "", email: "", phone: "", course: "" }); }
            else toast.error(res.body.message || "Failed");
        } catch (err) { toast.error("Server error"); }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Add Student</h2>
                <form onSubmit={submit} className="bg-white p-6 rounded shadow space-y-4">
                    <input required value={student.name} onChange={e => setStudent({ ...student, name: e.target.value })} placeholder="Full name" className="border p-3 rounded w-full" />
                    <input required value={student.email} onChange={e => setStudent({ ...student, email: e.target.value })} placeholder="Email" type="email" className="border p-3 rounded w-full" />
                    <input value={student.phone} onChange={e => setStudent({ ...student, phone: e.target.value })} placeholder="Phone" className="border p-3 rounded w-full" />
                    <input value={student.course} onChange={e => setStudent({ ...student, course: e.target.value })} placeholder="Course ID (optional)" className="border p-3 rounded w-full" />
                    <button className="bg-green-600 text-white px-4 py-2 rounded">Add Student</button>
                </form>
            </div>
        </AdminLayout>
    );
}


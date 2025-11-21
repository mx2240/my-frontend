// // src/pages/Admin/AddCourse.jsx
// import React, { useState } from "react";
// import AdminLayout from "../../layouts/AdminLayout";
// import toast from "react-hot-toast";
// import { FaBook, FaSave } from "react-icons/fa";

// const AddCourse = () => {
//     const [course, setCourse] = useState({
//         title: "",
//         description: "",
//         duration: "",
//     });

//     const token = localStorage.getItem("token");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!token) return toast.error("No token found, please login.");

//         try {
//             const res = await fetch(`${process.env.REACT_APP_API_URL}/courses`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(course),
//             });

//             const data = await res.json();
//             if (res.ok) {
//                 toast.success("Course added successfully!");
//                 setCourse({ title: "", description: "", duration: "" });
//             } else {
//                 toast.error(data.message || "Failed to add course");
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
//                     <FaBook className="text-blue-600" /> Add Course
//                 </h1>

//                 <form
//                     onSubmit={handleSubmit}
//                     className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-2 gap-4"
//                 >
//                     <div className="md:col-span-2">
//                         <label className="block font-medium">Course Title</label>
//                         <input
//                             type="text"
//                             value={course.title}
//                             onChange={(e) => setCourse({ ...course, title: e.target.value })}
//                             className="border p-3 w-full rounded-lg mt-1"
//                             required
//                         />
//                     </div>

//                     <div className="md:col-span-2">
//                         <label className="block font-medium">Description</label>
//                         <textarea
//                             value={course.description}
//                             onChange={(e) =>
//                                 setCourse({ ...course, description: e.target.value })
//                             }
//                             className="border p-3 w-full rounded-lg mt-1"
//                             required
//                         ></textarea>
//                     </div>

//                     <div>
//                         <label className="block font-medium">Duration (e.g. 3 Months)</label>
//                         <input
//                             type="text"
//                             value={course.duration}
//                             onChange={(e) =>
//                                 setCourse({ ...course, duration: e.target.value })
//                             }
//                             className="border p-3 w-full rounded-lg mt-1"
//                             required
//                         />
//                     </div>

//                     <div className="md:col-span-2 mt-4">
//                         <button
//                             type="submit"
//                             className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//                         >
//                             <FaSave /> Add Course
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </AdminLayout>
//     );
// };

// export default AddCourse;


import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import { api } from "../../api";

export default function AddCourse() {
    const [course, setCourse] = useState({ title: "", description: "", duration: "" });
    const submit = async e => {
        e.preventDefault();
        try {
            const res = await api("/create-course", "POST", course);
            if (res.ok) { toast.success("Course created"); setCourse({ title: "", description: "", duration: "" }); }
            else toast.error(res.body.message || "Failed");
        } catch (err) { toast.error("Server error"); }
    };


    return (
        <AdminLayout>
            <div className="p-6 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Add Course</h2>
                <form onSubmit={submit} className="bg-white p-6 rounded shadow space-y-4">
                    <input required className="border p-3 rounded w-full" placeholder="Title" value={course.title} onChange={e => setCourse({ ...course, title: e.target.value })} />
                    <textarea required className="border p-3 rounded w-full" placeholder="Description" value={course.description} onChange={e => setCourse({ ...course, description: e.target.value })} />
                    <input className="border p-3 rounded w-full" placeholder="Duration" value={course.duration} onChange={e => setCourse({ ...course, duration: e.target.value })} />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">Create Course</button>
                </form>
            </div>
        </AdminLayout>
    );
}


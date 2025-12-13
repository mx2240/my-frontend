// import React, { useEffect, useState } from "react";
// import StudentLayout from "../../layouts/StudentLayout";
// import fetch from "../../fetch";
// import toast from "react-hot-toast";

// export default function Profile() {
//     const [form, setForm] = useState({ name: "", phone: "", studentClass: "", password: "" });
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         (async () => {
//             try {
//                 const res = await fetch.get("/student/profile/me");
//                 if (res.data.ok) setForm({ ...form, ...res.data.student, password: "" });
//             } catch (err) {
//                 console.error(err);
//                 toast.error("Failed to load profile");
//             }
//         })();
//         // eslint-disable-next-line
//     }, []);

//     const update = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             const res = await fetch.put("/student/profile/me", form);
//             if (res.data.ok) {
//                 toast.success("Profile updated");
//                 // update local storage user if present
//                 const curr = JSON.parse(localStorage.getItem("student") || "null");
//                 if (curr) {
//                     localStorage.setItem("student", JSON.stringify(res.data.student));
//                 }
//             } else toast.error(res.data.message || "Update failed");
//         } catch (err) {
//             console.error(err);
//             toast.error("Update failed");
//         } finally { setLoading(false); }
//     };

//     return (
//         <StudentLayout>
//             <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
//                 <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
//                 <form onSubmit={update} className="flex flex-col gap-3">
//                     <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="p-2 border rounded" />
//                     <input type="text" placeholder="Class" value={form.studentClass} onChange={e => setForm({ ...form, studentClass: e.target.value })} className="p-2 border rounded" />
//                     <input type="text" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="p-2 border rounded" />
//                     <input type="password" placeholder="New password (leave empty to keep)" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="p-2 border rounded" />
//                     <button disabled={loading} className="py-2 px-4 bg-blue-600 text-white rounded">{loading ? "Saving..." : "Save changes"}</button>
//                 </form>
//             </div>
//         </StudentLayout>
//     );
// }



import React, { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import fetch from "../../fetch";
import toast from "react-hot-toast";

export default function Profile() {
    const [form, setForm] = useState({ name: "", phone: "", studentClass: "", password: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch.get("/student/profile/me");
                if (res.data.ok) setForm({ ...form, ...res.data.student, password: "" });
            } catch (err) {
                console.error(err);
                toast.error("Failed to load profile");
            }
        })();
        // eslint-disable-next-line
    }, []);

    const update = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch.put("/student/profile/me", form);
            if (res.data.ok) {
                toast.success("Profile updated successfully");
                const curr = JSON.parse(localStorage.getItem("student") || "null");
                if (curr) localStorage.setItem("student", JSON.stringify(res.data.student));
            } else {
                toast.error(res.data.message || "Update failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <StudentLayout>
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">

                <h2 className="text-2xl font-bold mb-6 text-gray-800">👤 Your Profile</h2>

                <form onSubmit={update} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-600">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-600">Class</label>
                        <input
                            type="text"
                            placeholder="Enter your class"
                            value={form.studentClass}
                            onChange={e => setForm({ ...form, studentClass: e.target.value })}
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-600">Phone</label>
                        <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-600">New Password</label>
                        <input
                            type="password"
                            placeholder="Leave empty to keep current password"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow transition"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </StudentLayout>
    );
}

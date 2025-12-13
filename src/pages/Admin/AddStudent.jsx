// import React, { useState, useEffect } from "react";
// import fetch from '../../fetch'
// import Adminlayout from "../../layouts/AdminLayout"

// function StudentPage() {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         studentClass: "",
//         phone: ""
//     });
//     const [students, setStudents] = useState([]);
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         loadStudents();
//     }, []);

//     const loadStudents = async () => {
//         const res = await fetch.get("/students");
//         setStudents(res.data.students || []);
//     };

//     const handleChange = e => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async e => {
//         e.preventDefault();
//         setMessage("");

//         try {
//             const res = await fetch.post("/students", form);
//             setMessage(res.data.message);
//             setForm({ name: "", email: "", studentClass: "", phone: "" });
//             loadStudents();
//         } catch (err) {
//             setMessage(err.response?.data?.message || "Error occurred");
//         }
//     };

//     return (

//         <Adminlayout>

//             <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px" }}>
//                 <h2>Add Student</h2>

//                 {message && (
//                     <p style={{
//                         background: "#eee",
//                         padding: "10px",
//                         borderRadius: "5px",
//                         marginBottom: "10px"
//                     }}>
//                         {message}
//                     </p>
//                 )}

//                 <form onSubmit={handleSubmit} style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "10px"
//                 }}>
//                     <input type="text" name="name" placeholder="Student Name"
//                         value={form.name} onChange={handleChange} required />

//                     <input type="email" name="email" placeholder="Email"
//                         value={form.email} onChange={handleChange} required />

//                     <input type="text" name="studentClass" placeholder="Class"
//                         value={form.studentClass} onChange={handleChange} />

//                     <input type="text" name="phone" placeholder="Phone"
//                         value={form.phone} onChange={handleChange} />

//                     <input type="password" name="password" placeholder="password"
//                         value={form.password} onChange={handleChange} />



//                     <button style={{
//                         padding: "10px",
//                         background: "black",
//                         color: "white",
//                         borderRadius: "5px",
//                         cursor: "pointer"
//                     }}>
//                         Add Student
//                     </button>
//                 </form>

//                 <hr style={{ margin: "20px 0" }} />

//                 <h3>All Students</h3>

//                 <ul>
//                     {students.map(s => (
//                         <li key={s._id}>
//                             {s.name} — {s.email} — {s.studentClass}
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//         </Adminlayout>
//     );
// }

// export default StudentPage;




import React, { useState, useEffect } from "react";
import fetch from '../../fetch';
import AdminLayout from "../../layouts/AdminLayout";

function StudentPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        studentClass: "",
        phone: "",
        password: ""
    });
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const res = await fetch.get("/students");
            setStudents(res.data.students || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch.post("/students", form);
            setMessage(res.data.message);
            setForm({ name: "", email: "", studentClass: "", phone: "", password: "" });
            loadStudents();
        } catch (err) {
            setMessage(err.response?.data?.message || "Error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-4xl mx-auto space-y-8">

                {/* Page Header */}
                <h2 className="text-3xl font-bold text-gray-800">Add Student</h2>

                {/* Message */}
                {message && (
                    <div className="bg-gray-100 border-l-4 border-blue-500 text-gray-700 p-4 rounded">
                        {message}
                    </div>
                )}

                {/* Form Card */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="name"
                            placeholder="Student Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full"
                        />

                        <input
                            type="text"
                            name="studentClass"
                            placeholder="Class"
                            value={form.studentClass}
                            onChange={handleChange}
                            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full"
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            {loading ? "Adding..." : "Add Student"}
                        </button>
                    </form>
                </div>

                {/* Student List */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">All Students</h3>

                    {students.length === 0 ? (
                        <p className="text-gray-500">No students available.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b text-gray-600">
                                        <th className="text-left py-2 px-3">Name</th>
                                        <th className="text-left py-2 px-3">Email</th>
                                        <th className="text-left py-2 px-3">Class</th>
                                        <th className="text-left py-2 px-3">Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map(s => (
                                        <tr key={s._id} className="border-b hover:bg-gray-50">
                                            <td className="py-2 px-3 font-medium">{s.name}</td>
                                            <td className="py-2 px-3">{s.email}</td>
                                            <td className="py-2 px-3">{s.studentClass || "-"}</td>
                                            <td className="py-2 px-3">{s.phone || "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </AdminLayout>
    );
}

export default StudentPage;


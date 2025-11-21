// import React, { useState } from "react";

// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         password: "",
//         role: "student",
//     });

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };
//     const submitForm = async (e) => {
//         e.preventDefault();

//         try {
//             const data = await api("/auth/register", "POST", form);

//             if (data.success) {
//                 alert("Account created");
//                 window.location.href = "/login";
//             } else {
//                 alert(data.message);
//             }
//         } catch (err) {
//             alert("Server error");
//         }
//     };
//     return (
//         <div className="register-container">
//             <div className="register-card">
//                 <h1>Create Account</h1>
//                 <p className="subtitle">Join our portal today</p>

//                 <form onSubmit={handleSubmit}>
//                     <label>Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={form.name}
//                         onChange={handleChange}
//                         placeholder="Enter full name"
//                     />

//                     <label>Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={form.email}
//                         onChange={handleChange}
//                         placeholder="Enter email"
//                     />

//                     <label>Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={form.password}
//                         onChange={handleChange}
//                         placeholder="Enter password"
//                     />

//                     <label>Select Role</label>
//                     <select name="role" value={form.role} onChange={handleChange}>
//                         <option value="student">Student</option>
//                         <option value="admin">Admin</option>
//                     </select>

//                     <button type="submit" className="btn-register">
//                         Register
//                     </button>
//                 </form>

//                 <p className="bottom-text">
//                     Already have an account?{" "}
//                     <span className="link" onClick={() => navigate("/login")}>
//                         Login
//                     </span>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Register;


import React, { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../api";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
    const submit = async e => {
        e.preventDefault();
        try {
            const r = await api("/auth/register", "POST", form);
            if (r.ok) { toast.success("Registered"); window.location.href = "/login"; }
            else toast.error(r.body.message || "Failed");
        } catch (err) { toast.error("Server error"); }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <input required className="border p-3 rounded w-full mb-3" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input required className="border p-3 rounded w-full mb-3" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <input required type="password" className="border p-3 rounded w-full mb-3" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <select className="border p-3 rounded w-full mb-3" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
            </form>
        </div>
    );
}











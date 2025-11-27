// import React, { useState } from "react";
// import fetch from '../fetch'


// export default function AddStudent() {
//     const [form, setForm] = useState({
//         fullName: "",
//         email: "",
//         gender: "",
//         classLevel: "",
//         age: "",
//     });

//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const submitForm = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");

//         try {
//             const token = localStorage.getItem("token");

//             const res = await fetch.post(
//                 "/students",
//                 form,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             setMessage("Student Registered Successfully ✔");
//             setForm({
//                 fullName: "",
//                 email: "",
//                 gender: "",
//                 classLevel: "",
//                 age: "",
//             });
//         } catch (err) {
//             console.error(err);

//             if (err.response?.data?.message === "Duplicate value") {
//                 setMessage("⚠ Email already exists");
//             } else {
//                 setMessage("❌ Failed to register student");
//             }
//         }

//         setLoading(false);
//     };

//     return (
//         <div className="add-student-container">
//             <h2>Add New Student</h2>

//             {message && <div className="alert">{message}</div>}

//             <form onSubmit={submitForm} className="student-form">

//                 <div className="form-group">
//                     <label>Full Name</label>
//                     <input
//                         type="text"
//                         name="fullName"
//                         value={form.fullName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={form.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Gender</label>
//                     <select
//                         name="gender"
//                         value={form.gender}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                     </select>
//                 </div>

//                 <div className="form-group">
//                     <label>Class Level</label>
//                     <input
//                         type="text"
//                         name="classLevel"
//                         value={form.classLevel}
//                         onChange={handleChange}
//                         placeholder="Example: JHS 1, SHS 2"
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Age</label>
//                     <input
//                         type="number"
//                         name="age"
//                         value={form.age}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <a href="/login">already have account login</a>

//                 <button type="submit" disabled={loading}>
//                     {loading ? "Saving..." : "Register Student"}
//                 </button>

//             </form>
//         </div>
//     );
// }

import React, { useState } from "react";
import fetch from "../fetch";
// import "./Register.css";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "Student",
    });

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg("");

        try {
            const res = await fetch.post(
                "auth/register",
                form
            );

            setMsg("✔ Registration Successful");
            setForm({ name: "", email: "", password: "", role: "admin" });
        } catch (err) {
            console.error(err);

            const message = err.response?.data?.message || "Registration failed";
            setMsg("❌ " + message);
        }

        setLoading(false);
    };

    return (
        <div className="reg-container">
            <h2> Student Account</h2>

            {msg && <div className="alert">{msg}</div>}

            <form onSubmit={submitForm} className="reg-form">
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="example@mail.com"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Select Role</label>
                    <select name="role" value={form.role} onChange={onChange}>
                        <option value="teacher">Student</option>
                    </select>
                </div>
                <a href="/login">login</a>

                <button disabled={loading}>
                    {loading ? "Creating account..." : "Register"}
                </button>
            </form>
        </div>
    );
}

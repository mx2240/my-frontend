import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import fetch from "../utils/fetch";

const Register = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch.post("/auth/register", form);
            login(res.data.user);

            if (res.data.user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/student/dashboard");
            }
        } catch (error) {
            console.error(error);
            alert("Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full p-3 border rounded-lg mb-3"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full p-3 border rounded-lg mb-3"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded-lg mb-3"
                    onChange={handleChange}
                />

                {/* ROLE SELECTION */}
                <select
                    name="role"
                    className="w-full p-3 border rounded-lg mb-4"
                    onChange={handleChange}
                >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                >
                    Register
                </button>

                <p className="text-center mt-4 text-sm">
                    Already have an account?
                    <span
                        onClick={() => navigate("/login")}
                        className="text-blue-600 cursor-pointer ml-1"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;












// import { useState } from "react";
// import fetch from "../fetch";


// const Register = () => {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         password: "",
//         role: "student",
//     });

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await fetch.post("/auth/register", form, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             console.log(res.data);
//         } catch (error) {
//             console.error(error.response?.data || error.message);
//         }
//     };

//     return (
//         <div className="auth-container luxury-bg">
//             <form className="auth-card luxury-card" onSubmit={handleSubmit}>
//                 <h2>Create Account</h2>

//                 <input name="name" placeholder="Full Name" onChange={handleChange} required />
//                 <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//                 <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

//                 <select name="role" onChange={handleChange}>
//                     <option value="student">Student</option>
//                     <option value="admin">Admin</option>
//                 </select>

//                 <button type="submit" className="luxury-btn">Register</button>
//             </form>
//         </div>
//     );
// };

// export default Register;


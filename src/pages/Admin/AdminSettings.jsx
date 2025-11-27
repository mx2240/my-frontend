// import React, { useState } from "react";
// import { FaCog, FaMoon, FaSun, FaUser } from "react-icons/fa";
// import AdminLayout from "../../layouts/AdminLayout";

// const AdminSettings = () => {
//     const [darkMode, setDarkMode] = useState(false);

//     const toggleDark = () => setDarkMode(!darkMode);

//     const handleSave = () => {
//         /*************  ✨ Windsurf Command ⭐  *************/
//         const handleSave = async () => {
//             try {
//                 const res = await fetch('/admin/settings', {
//                     method: 'PUT',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ darkMode })
//                 });
//                 const data = await res.json();
//                 if (res.ok) {
//                     toast.success(data.message);
//                 } else {
//                     toast.error(data.message);
//                 }
//             } catch (err) {
//                 console.error(err);
//                 toast.error('Save failed');
//             }
//         };

//     };






//     return (

//         <AdminLayout>

//             <div className={`p-6 ${darkMode ? "bg-gray-900 text-white" : ""}`}>
//                 <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
//                     <FaCog className="text-blue-600" />
//                     Settings
//                 </h1>

//                 {/* DARK MODE TOGGLE */}
//                 {/* <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-xl mb-6">
//                     <h2 className="text-xl font-semibold mb-3">Appearance</h2>

//                     <button
//                         onClick={toggleDark}
//                         className="flex items-center gap-3 px-5 py-3 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700"
//                     >
//                         {darkMode ? <FaSun /> : <FaMoon />}
//                         {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
//                     </button>
//                 </div> */}

//                 {/* PROFILE SETTINGS */}
//                 <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-xl mb-6">
//                     <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                         <FaUser /> Admin Profile
//                     </h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <input
//                             placeholder="Full Name"
//                             className="p-3 rounded-lg border dark:bg-gray-700"
//                         />
//                         <input
//                             placeholder="Email Address"
//                             className="p-3 rounded-lg border dark:bg-gray-700"
//                         />
//                         <input
//                             placeholder="Phone Number"
//                             className="p-3 rounded-lg border dark:bg-gray-700"
//                         />
//                         <input
//                             placeholder="Change Password"
//                             className="p-3 rounded-lg border dark:bg-gray-700"
//                         />
//                     </div>

//                     <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg">
//                         Save Changes
//                     </button>
//                 </div>

//                 {/* SCHOOL INFORMATION */}
//                 <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-xl">
//                     <h2 className="text-xl font-semibold mb-3">School Information</h2>

//                     <input
//                         placeholder="School Name"
//                         className="w-full p-3 rounded-lg border dark:bg-gray-700 mb-3"
//                     />

//                     <textarea
//                         placeholder="School Description"
//                         rows="4"
//                         className="w-full p-3 rounded-lg border dark:bg-gray-700"
//                     />

//                     <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg">
//                         Update School Info
//                     </button>
//                 </div>
//             </div>
//         </AdminLayout>
//     );
// };

// export default AdminSettings;









import React, { useState, useEffect } from "react";
import fetch from '../../fetch'

export default function AdminSettings() {
    const [admin, setAdmin] = useState(null);
    const [message, setMessage] = useState("");
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
    });

    // Fetch logged-in admin info
    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get("/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setAdmin(res.data.user))
            .catch(() => setMessage("Unable to load profile"));
    }, []);

    const changePassword = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            await fetch.put(
                "/auth/change-password",
                passwords,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage("✔ Password updated successfully");
        } catch (err) {
            setMessage("❌ " + (err.response?.data?.message || "Error updating password"));
        }
    };

    return (
        <div className="settings-page">
            <h2>Admin Settings</h2>

            {message && <div className="alert">{message}</div>}

            {admin ? (
                <>
                    <div className="info-box">
                        <h3>Profile Details</h3>
                        <p><strong>Name:</strong> {admin.name}</p>
                        <p><strong>Email:</strong> {admin.email}</p>
                        <p><strong>Role:</strong> {admin.role}</p>
                    </div>

                    <form onSubmit={changePassword} className="settings-form">
                        <h3>Change Password</h3>

                        <label>Old Password</label>
                        <input
                            type="password"
                            name="oldPassword"
                            onChange={(e) =>
                                setPasswords({ ...passwords, oldPassword: e.target.value })
                            }
                        />

                        <label>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            onChange={(e) =>
                                setPasswords({ ...passwords, newPassword: e.target.value })
                            }
                        />

                        <button type="submit">Update Password</button>
                    </form>
                </>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}


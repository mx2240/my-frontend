// import React, { useState } from "react";
// import { FaCog, FaMoon, FaSun, FaUser } from "react-icons/fa";
// import AdminLayout from "../../layouts/AdminLayout";

// const AdminSettings = () => {
//     const [darkMode] = useState(false);








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









import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminSettings() {
    const [adminData, setAdminData] = useState({
        name: "",
        email: "",
    });

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
    });

    // Load current admin profile 
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setAdminData(res.data.user))
            .catch(() => toast.error("Failed to load admin profile"));
    }, []);

    // Update profile handler
    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            const res = await axios.put(
                "/update-profile",
                adminData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success("Profile updated");
        } catch (err) {
            toast.error("Update failed");
        }
    };

    // Change password handler
    const changePassword = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "/auth/change-password",
                passwords,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success("Password updated");
            setPasswords({ currentPassword: "", newPassword: "" });
        } catch (err) {
            toast.error(err.response?.data?.message || "Password change failed");
        }
    };

    // Logout handler
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className="settings-container">
            <h2>Admin Settings</h2>

            {/* Update Profile */}
            <div className="settings-box">
                <h3>Update Profile</h3>
                <form onSubmit={updateProfile}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={adminData.name}
                        onChange={(e) =>
                            setAdminData({ ...adminData, name: e.target.value })
                        }
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={adminData.email}
                        onChange={(e) =>
                            setAdminData({ ...adminData, email: e.target.value })
                        }
                        required
                    />

                    <button type="submit">Save Changes</button>
                </form>
            </div>

            {/* Change Password */}
            <div className="settings-box">
                <h3>Change Password</h3>
                <form onSubmit={changePassword}>
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={passwords.currentPassword}
                        onChange={(e) =>
                            setPasswords({ ...passwords, currentPassword: e.target.value })
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={passwords.newPassword}
                        onChange={(e) =>
                            setPasswords({ ...passwords, newPassword: e.target.value })
                        }
                        required
                    />

                    <button type="submit">Update Password</button>
                </form>
            </div>

            {/* Logout */}
            <button className="logout-btn" onClick={logout}>
                Logout
            </button>
        </div>
    );
}

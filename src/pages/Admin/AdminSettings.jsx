import React, { useState } from "react";
import { FaCog, FaMoon, FaSun, FaUser } from "react-icons/fa";
import AdminLayout from "../../layouts/AdminLayout";

const AdminSettings = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDark = () => setDarkMode(!darkMode);

    const handleSave = () => {
        /*************  ✨ Windsurf Command ⭐  *************/
        const handleSave = async () => {
            try {
                const res = await fetch('/admin/settings', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ darkMode })
                });
                const data = await res.json();
                if (res.ok) {
                    toast.success(data.message);
                } else {
                    toast.error(data.message);
                }
            } catch (err) {
                console.error(err);
                toast.error('Save failed');
            }
        };

    };






    return (

        <AdminLayout>

            <div className={`p-6 ${darkMode ? "bg-gray-900 text-white" : ""}`}>
                <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <FaCog className="text-blue-600" />
                    Settings
                </h1>

                {/* DARK MODE TOGGLE */}
                {/* <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-xl mb-6">
                    <h2 className="text-xl font-semibold mb-3">Appearance</h2>

                    <button
                        onClick={toggleDark}
                        className="flex items-center gap-3 px-5 py-3 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
                        {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
                    </button>
                </div> */}

                {/* PROFILE SETTINGS */}
                <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-xl mb-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <FaUser /> Admin Profile
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            placeholder="Full Name"
                            className="p-3 rounded-lg border dark:bg-gray-700"
                        />
                        <input
                            placeholder="Email Address"
                            className="p-3 rounded-lg border dark:bg-gray-700"
                        />
                        <input
                            placeholder="Phone Number"
                            className="p-3 rounded-lg border dark:bg-gray-700"
                        />
                        <input
                            placeholder="Change Password"
                            className="p-3 rounded-lg border dark:bg-gray-700"
                        />
                    </div>

                    <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg">
                        Save Changes
                    </button>
                </div>

                {/* SCHOOL INFORMATION */}
                <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-xl">
                    <h2 className="text-xl font-semibold mb-3">School Information</h2>

                    <input
                        placeholder="School Name"
                        className="w-full p-3 rounded-lg border dark:bg-gray-700 mb-3"
                    />

                    <textarea
                        placeholder="School Description"
                        rows="4"
                        className="w-full p-3 rounded-lg border dark:bg-gray-700"
                    />

                    <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg">
                        Update School Info
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminSettings;

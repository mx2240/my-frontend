import { useState, useEffect } from "react";
import { FaUserCog, FaLock, FaSignOutAlt } from "react-icons/fa";
import fetch from "../../fetch";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";

const API = "/auth";

export default function AdminSettings() {
    const [adminData, setAdminData] = useState({ name: "", email: "" });
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
    });

    useEffect(() => {
        const loadAdmin = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch.get(`${API}/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.data.ok) setAdminData(res.data.user);
            } catch {
                toast.error("Failed to load admin profile");
            }
        };

        loadAdmin();
    }, []);

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await fetch.put(`${API}/update-profile`, adminData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Profile updated successfully");
        } catch {
            toast.error("Update failed");
        }
    };

    const changePassword = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await fetch.post(`${API}/change-password`, passwords, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Password updated");
            setPasswords({ currentPassword: "", newPassword: "" });
        } catch (err) {
            toast.error(err.response?.data?.message || "Error updating password");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <AdminLayout>
            <div className="min-h-[calc(100vh-56px)] bg-gray-50 dark:bg-gray-900 px-4 md:px-6 py-6 overflow-hidden">

                {/* PAGE HEADER */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Admin Settings
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage your account & security preferences
                    </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* PROFILE SETTINGS */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white mb-4">
                            <FaUserCog className="text-blue-600" />
                            Profile Information
                        </h2>

                        <form onSubmit={updateProfile} className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-500">Full Name</label>
                                <input
                                    type="text"
                                    value={adminData.name}
                                    onChange={(e) =>
                                        setAdminData({ ...adminData, name: e.target.value })
                                    }
                                    className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-500">Email Address</label>
                                <input
                                    type="email"
                                    value={adminData.email}
                                    onChange={(e) =>
                                        setAdminData({ ...adminData, email: e.target.value })
                                    }
                                    className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>

                    {/* SECURITY */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white mb-4">
                            <FaLock className="text-red-500" />
                            Security
                        </h2>

                        <form onSubmit={changePassword} className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-500">Current Password</label>
                                <input
                                    type="password"
                                    value={passwords.currentPassword}
                                    onChange={(e) =>
                                        setPasswords({
                                            ...passwords,
                                            currentPassword: e.target.value,
                                        })
                                    }
                                    className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-500">New Password</label>
                                <input
                                    type="password"
                                    value={passwords.newPassword}
                                    onChange={(e) =>
                                        setPasswords({
                                            ...passwords,
                                            newPassword: e.target.value,
                                        })
                                    }
                                    className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
                            >
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>

                {/* LOGOUT */}
                <div className="mt-8">
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 px-5 py-3 rounded-lg transition"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}

import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import {
    getAdminProfile,
    getAllStudents,
    getAllAdmins,
} from "../../myapi/Admin";
import {
    FaUserShield,
    FaUsers,
    FaUserTie,
    FaEnvelope,
} from "react-icons/fa";

const StatCard = ({ icon: Icon, label, value }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex items-center gap-4">
        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600">
            <Icon className="text-xl" />
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
                {value}
            </p>
        </div>
    </div>
);

export default function AdminProfile() {
    const [profile, setProfile] = useState({});
    const [students, setStudents] = useState([]);
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const p = await getAdminProfile();
            if (p?.data?.ok) setProfile(p.data.body);

            const s = await getAllStudents();
            if (s?.data?.ok) setStudents(s.data.body);

            const a = await getAllAdmins();
            if (a?.data?.ok) setAdmins(a.data.body);
        } catch (err) {
            toast.error("Failed to load admin data");
        }
    };

    return (
        <AdminLayout>
            {/* PAGE WRAPPER */}
            <div className="min-h-[calc(100vh-56px)] bg-gray-50 dark:bg-gray-900 px-4 md:px-6 py-6 overflow-hidden">

                {/* HEADER */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Admin Profile
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage your account & overview
                    </p>
                </div>

                {/* PROFILE CARD */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                    <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
                        {profile?.name?.charAt(0) || "A"}
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                            {profile?.name}
                        </h2>
                        <p className="flex items-center justify-center md:justify-start gap-2 text-gray-500 dark:text-gray-400">
                            <FaEnvelope /> {profile?.email}
                        </p>

                        <span className="inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                            Super Admin
                        </span>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <StatCard
                        icon={FaUsers}
                        label="Total Students"
                        value={students.length}
                    />
                    <StatCard
                        icon={FaUserTie}
                        label="Total Admins"
                        value={admins.length}
                    />
                    <StatCard
                        icon={FaUserShield}
                        label="Role"
                        value="Administrator"
                    />
                </div>

                {/* LISTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Students */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                            Recent Students
                        </h3>
                        <ul className="space-y-3 max-h-64 overflow-y-auto">
                            {students.slice(0, 6).map((s) => (
                                <li
                                    key={s._id}
                                    className="flex justify-between items-center text-sm"
                                >
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {s.name}
                                    </span>
                                    <span className="text-gray-400 text-xs">{s.email}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Admins */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                            Admin Team
                        </h3>
                        <ul className="space-y-3 max-h-64 overflow-y-auto">
                            {admins.map((a) => (
                                <li
                                    key={a._id}
                                    className="flex justify-between items-center text-sm"
                                >
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {a.name}
                                    </span>
                                    <span className="text-gray-400 text-xs">{a.email}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

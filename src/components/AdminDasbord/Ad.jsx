

// import React, { useEffect, useState } from "react";
// import AdminLayout from "../../layouts/AdminLayout";
// import toast from "react-hot-toast";
// import { getAdminProfile, getAllStudents, getAllAdmins } from '../../myapi/Admin';
// import fetch from "../../fetch";

// export default function AdminDashboard() {
//     const [profile, setProfile] = useState({});
//     const [students, setStudents] = useState([]);
//     const [admins, setAdmins] = useState([]);

//     useEffect(() => {
//         loadData();
//     }, []);

//     const loadData = async () => {
//         try {
//             // ✅ Fetch admin profile
//             const p = await getAdminProfile();
//             console.log("Admin profile response:", p);

//             if (p?.data?.ok) setProfile(p.data.body);

//             // ✅ Fetch students
//             const s = await getAllStudents();
//             if (s?.data?.ok) setStudents(s.data.body);

//             // ✅ Fetch admins
//             const a = await getAllAdmins();
//             if (a?.data?.ok) setAdmins(a.data.body);

//         } catch (err) {
//             console.error(err.response?.data || err.message);
//             toast.error("Failed to load admin data");
//         }
//     };

//     return (
//         <AdminLayout>
//             <div className="p-6 max-w-5xl mx-auto">
//                 <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

//                 <section className="mb-6">
//                     <h3 className="font-bold">Profile</h3>
//                     <p>Name: {profile.name}</p>
//                     <p>Email: {profile.email}</p>
//                 </section>

//                 <section className="mb-6">
//                     <h3 className="font-bold">Students</h3>
//                     <ul className="list-disc pl-6">
//                         {students.map(s => (
//                             <li key={s._id}>{s.name} ({s.email})</li>
//                         ))}
//                     </ul>
//                 </section>

//                 <section>
//                     <h3 className="font-bold">Admins</h3>
//                     <ul className="list-disc pl-6">
//                         {admins.map(a => (
//                             <li key={a._id}>{a.name} ({a.email})</li>
//                         ))}
//                     </ul>
//                 </section>
//             </div>
//         </AdminLayout>
//     );
// }




import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import {
    getAdminProfile,
    getAllStudents,
    getAllAdmins,
} from "../../myapi/Admin";
import { FaUserShield, FaUsers, FaUserTie } from "react-icons/fa";

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
            console.error(err);
            toast.error("Failed to load admin data");
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto p-6 space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Admin Profile
                    </h1>
                    <span className="text-sm text-gray-500">
                        Manage your account & overview
                    </span>
                </div>

                {/* Profile Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
                        {profile?.name?.charAt(0) || "A"}
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                            {profile.name || "Admin User"}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-300">
                            {profile.email}
                        </p>
                        <p className="mt-2 inline-block px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                            Super Admin
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard
                        icon={<FaUsers />}
                        label="Total Students"
                        value={students.length}
                        color="blue"
                    />
                    <StatCard
                        icon={<FaUserTie />}
                        label="Total Admins"
                        value={admins.length}
                        color="green"
                    />
                    <StatCard
                        icon={<FaUserShield />}
                        label="Role"
                        value="Administrator"
                        color="purple"
                    />
                </div>

                {/* Lists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Students */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                            Recent Students
                        </h3>
                        <ul className="space-y-3 max-h-64 overflow-auto">
                            {students.map((s) => (
                                <li
                                    key={s._id}
                                    className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 text-sm"
                                >
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {s.name}
                                    </span>
                                    <span className="text-gray-400">{s.email}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Admins */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                            Admin Accounts
                        </h3>
                        <ul className="space-y-3 max-h-64 overflow-auto">
                            {admins.map((a) => (
                                <li
                                    key={a._id}
                                    className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 text-sm"
                                >
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {a.name}
                                    </span>
                                    <span className="text-gray-400">{a.email}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}

/* Reusable stat card */
const StatCard = ({ icon, label, value, color }) => {
    const colors = {
        blue: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
        green: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
        purple: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex items-center gap-4">
            <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${colors[color]}`}
            >
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    {value}
                </p>
            </div>
        </div>
    );
};


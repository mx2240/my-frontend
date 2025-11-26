

import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import { getAdminProfile, getAllStudents, getAllAdmins } from '../../myapi/Admin';
import fetch from "../../fetch";

export default function AdminDashboard() {
    const [profile, setProfile] = useState({});
    const [students, setStudents] = useState([]);
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            // ✅ Fetch admin profile
            const p = await getAdminProfile();
            console.log("Admin profile response:", p);

            if (p?.data?.ok) setProfile(p.data.body);

            // ✅ Fetch students
            const s = await getAllStudents();
            if (s?.data?.ok) setStudents(s.data.body);

            // ✅ Fetch admins
            const a = await getAllAdmins();
            if (a?.data?.ok) setAdmins(a.data.body);

        } catch (err) {
            console.error(err.response?.data || err.message);
            toast.error("Failed to load admin data");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

                <section className="mb-6">
                    <h3 className="font-bold">Profile</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                </section>

                <section className="mb-6">
                    <h3 className="font-bold">Students</h3>
                    <ul className="list-disc pl-6">
                        {students.map(s => (
                            <li key={s._id}>{s.name} ({s.email})</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h3 className="font-bold">Admins</h3>
                    <ul className="list-disc pl-6">
                        {admins.map(a => (
                            <li key={a._id}>{a.name} ({a.email})</li>
                        ))}
                    </ul>
                </section>
            </div>
        </AdminLayout>
    );
}



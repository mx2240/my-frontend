// src/pages/Admin/AdminProfile.jsx
import React, { useState } from "react";
import { FaUserCircle, FaEdit, FaSave } from "react-icons/fa";

const AdminProfile = () => {
    const [profile, setProfile] = useState({
        name: "Admin User",
        email: "admin@example.com",
        role: "Administrator",
    });



    const handleSave = () => {

        const handleSave = async () => {
            try {
                const res = await fetch(`/admin/profile/${profile._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(profile),
                });
                const data = await res.json();
                if (res.ok) setProfile(data.admin);
                alert("Profile updated!");
            } catch (err) {
                console.error(err.response?.data || err.message);
                alert("Save failed");
            }
        };






        alert("Profile updated!");
    };






    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <FaUserCircle className="text-blue-600" /> Admin Profile
            </h1>

            <div className="bg-white p-6 rounded-xl shadow mb-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-28 h-28 rounded-full overflow-hidden border shadow">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1 w-full">
                    <div className="mb-4">
                        <label className="block font-medium">Full Name</label>
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="border p-3 w-full rounded-lg mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="border p-3 w-full rounded-lg mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium">Role</label>
                        <input
                            type="text"
                            value={profile.role}
                            readOnly
                            className="border p-3 w-full rounded-lg mt-1 bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                        <FaSave /> Save Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;

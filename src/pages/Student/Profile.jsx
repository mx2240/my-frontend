// import React, { useContext, useState } from "react";
// import StudentLayout from "../../layouts/StudentLayout";
// import { AuthContext } from "../../context/AuthProvider";

// const Profile = () => {
//     const { user, token, login } = useContext(AuthContext);
//     const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });

//     const handleSave = async () => {
//         try {
//             const res = await fetch(`/api/users/${user._id}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//                 body: JSON.stringify(form)
//             });
//             const data = await res.json();
//             if (res.ok) login(data.user, token); // update context and localStorage
//             alert(data.message || "Profile updated");
//         } catch (err) { console.error(err); alert("Save failed"); }
//     };

//     return (
//         <StudentLayout>
//             <h2 className="text-xl font-semibold mb-4">Profile</h2>
//             <div className="bg-white p-6 rounded shadow max-w-xl">
//                 <label className="block mb-2">Full name</label>
//                 <input className="w-full p-2 border rounded mb-4" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
//                 <label className="block mb-2">Email</label>
//                 <input className="w-full p-2 border rounded mb-4" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
//                 <button onClick={handleSave} className="px-4 py-2 bg-[var(--navy)] text-white rounded">Save</button>
//             </div>
//         </StudentLayout>
//     );
// };
// export default Profile;

import { useState } from "react";
import { FaUser } from "react-icons/fa";

const StudentProfile = () => {
    const [profilePic, setProfilePic] = useState(null);

    const handlePicUpload = (e) => {
        const file = e.target.files[0];
        if (file) setProfilePic(URL.createObjectURL(file));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow rounded-xl p-8 max-w-3xl mx-auto">

                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Student Profile
                </h1>

                {/* Profile Picture */}
                <div className="flex flex-col items-center mb-8">
                    <img
                        src={
                            profilePic ||
                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        className="w-32 h-32 rounded-full shadow mb-4 object-cover"
                    />

                    <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Upload Photo
                        <input type="file" className="hidden" onChange={handlePicUpload} />
                    </label>
                </div>

                {/* Profile Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="text-gray-600 text-sm">Full Name</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-3 border rounded-lg"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="text-gray-600 text-sm">Email Address</label>
                        <input
                            type="email"
                            className="w-full mt-1 p-3 border rounded-lg"
                            placeholder="student@example.com"
                        />
                    </div>

                    <div>
                        <label className="text-gray-600 text-sm">Phone Number</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-3 border rounded-lg"
                            placeholder="+233 50 000 0000"
                        />
                    </div>

                    <div>
                        <label className="text-gray-600 text-sm">Program</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-3 border rounded-lg"
                            placeholder="BSc Computer Science"
                        />
                    </div>
                </div>

                <button className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default StudentProfile;




// // import React from "react";
// // import StudentLayout from "../../layouts/StudentLayout";

// // const StudentDashboard = () => {
// //     return (
// //         <StudentLayout>
// //             {/* Header */}
// //             <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

// //             {/* Stats Cards */}
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// //                 <div className="bg-white shadow rounded-xl p-6">
// //                     <h3 className="text-gray-500 text-sm">My Courses</h3>
// //                     <p className="text-3xl font-bold mt-3">6</p>
// //                 </div>

// //                 <div className="bg-white shadow rounded-xl p-6">
// //                     <h3 className="text-gray-500 text-sm">Attendance</h3>
// //                     <p className="text-3xl font-bold mt-3">92%</p>
// //                 </div>

// //                 <div className="bg-white shadow rounded-xl p-6">
// //                     <h3 className="text-gray-500 text-sm">Pending Fees</h3>
// //                     <p className="text-3xl font-bold mt-3">₵ 450</p>
// //                 </div>

// //             </div>

// //             {/* Section: Quick Access */}
// //             <div className="mt-10">
// //                 <h2 className="text-xl font-semibold mb-4">Quick Access</h2>

// //                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

// //                     <div className="bg-white shadow rounded-xl p-5 text-center hover:bg-gray-100 cursor-pointer">
// //                         📚
// //                         <p className="mt-2 font-medium">Courses</p>
// //                     </div>

// //                     <div className="bg-white shadow rounded-xl p-5 text-center hover:bg-gray-100 cursor-pointer">
// //                         📝
// //                         <p className="mt-2 font-medium">Assignments</p>
// //                     </div>

// //                     <div className="bg-white shadow rounded-xl p-5 text-center hover:bg-gray-100 cursor-pointer">
// //                         📊
// //                         <p className="mt-2 font-medium">Results</p>
// //                     </div>

// //                     <div className="bg-white shadow rounded-xl p-5 text-center hover:bg-gray-100 cursor-pointer">
// //                         💳
// //                         <p className="mt-2 font-medium">Fees</p>
// //                     </div>

// //                 </div>
// //             </div>

// //             {/* Upcoming Classes */}
// //             <div className="mt-10">
// //                 <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>

// //                 <div className="bg-white shadow rounded-xl p-6">
// //                     <ul className="space-y-4">

// //                         <li className="flex justify-between items-center">
// //                             <span>Mathematics — 9:00 AM</span>
// //                             <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded">Today</span>
// //                         </li>

// //                         <li className="flex justify-between items-center">
// //                             <span>English — 11:00 AM</span>
// //                             <span className="text-sm bg-yellow-100 text-yellow-600 px-3 py-1 rounded">Upcoming</span>
// //                         </li>

// //                     </ul>
// //                 </div>
// //             </div>
// //         </StudentLayout>
// //     );
// // };

// // export default StudentDashboard;





// import React, { useEffect, useState } from "react";
// import StudentLayout from "../../layouts/StudentLayout";
// import fetch from "../../fetch"
// import toast from "react-hot-toast";

// export default function Dashboard() {
//     const [profile, setProfile] = useState(null);

//     useEffect(() => {
//         (async () => {
//             try {
//                 const res = await fetch.get("/student/profile/me");
//                 if (res.data.ok) setProfile(res.data.student);
//             } catch (err) {
//                 console.error(err);
//                 toast.error("Failed to load profile");
//             }
//         })();
//     }, []);

//     return (
//         <StudentLayout>
//             <div className="max-w-4xl mx-auto">
//                 <h2 className="text-2xl font-bold mb-4">Welcome back{profile ? `, ${profile.name}` : ""}</h2>
//                 <div className="grid md:grid-cols-2 gap-4">
//                     <div className="bg-white p-4 rounded shadow">
//                         <h3 className="font-semibold">Your info</h3>
//                         <p><strong>Email:</strong> {profile?.email}</p>
//                         <p><strong>Class:</strong> {profile?.studentClass || "-"}</p>
//                         <p><strong>Phone:</strong> {profile?.phone || "-"}</p>
//                     </div>

//                     <div className="bg-white p-4 rounded shadow">
//                         <h3 className="font-semibold">Quick Links</h3>
//                         <ul className="mt-2">
//                             <li>- View Fees</li>
//                             <li>- View Results</li>
//                             <li>- Make Payment</li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </StudentLayout>
//     );
// }



import React, { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import fetch from "../../fetch";
import toast from "react-hot-toast";

export default function StudentPage() {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            setLoading(true);
            const res = await fetch.get("/student/profile/me");

            if (res.data.ok) {
                setStudent(res.data.student);
            } else {
                toast.error("Failed to load student profile");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error loading student profile");
        } finally {
            setLoading(false);
        }
    }

    return (
        <StudentLayout>
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

                {loading ? (
                    <div className="p-4 bg-white rounded shadow">Loading profile...</div>
                ) : (
                    <>
                        {/* Student Info Card */}
                        <div className="bg-white shadow rounded p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4">Welcome, {student?.name}</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <p><strong>Email:</strong> {student?.email}</p>
                                <p><strong>Class:</strong> {student?.studentClass || "Not set"}</p>
                                <p><strong>Phone:</strong> {student?.phone || "Not set"}</p>
                                <p><strong>Joined:</strong> {new Date(student?.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <a
                                href="/student/profile"
                                className="bg-blue-600 text-white p-5 rounded shadow hover:bg-blue-700 transition"
                            >
                                <h3 className="text-lg font-semibold mb-1">Profile</h3>
                                <p>View & update your details</p>
                            </a>

                            <a
                                href="/student/fees"
                                className="bg-green-600 text-white p-5 rounded shadow hover:bg-green-700 transition"
                            >
                                <h3 className="text-lg font-semibold mb-1">Fees</h3>
                                <p>Check assigned fees & payments</p>
                            </a>

                            <a
                                href="/student/results"
                                className="bg-purple-600 text-white p-5 rounded shadow hover:bg-purple-700 transition"
                            >
                                <h3 className="text-lg font-semibold mb-1">Results</h3>
                                <p>View academic results</p>
                            </a>
                        </div>
                    </>
                )}
            </div>
        </StudentLayout>
    );
}




// import React, { useEffect, useState } from "react";
// import StudentLayout from "../../layouts/StudentLayout";
// import fetch from "../../fetch";

// const StudentProfile = () => {
//     const [student, setStudent] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const token = localStorage.getItem("token"); // Adjust if using context
//                 const res = await fetch.get("/students/me", {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setStudent(res.data.student);
//             } catch (error) {
//                 console.error("Error fetching profile:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProfile();
//     }, []);

//     if (loading) return <StudentLayout><p>Loading profile...</p></StudentLayout>;
//     if (!student) return <StudentLayout><p>No profile found.</p></StudentLayout>;

//     return (
//         <StudentLayout>
//             <h1 className="text-2xl font-bold mb-6">My Profile</h1>

//             <div className="bg-white shadow rounded-xl p-6 max-w-xl">
//                 <div className="flex items-center mb-6">
//                     <div className="w-20 h-20 bg-gray-200 rounded-full mr-6 flex items-center justify-center text-3xl">
//                         {student.name.charAt(0)}
//                     </div>
//                     <div>
//                         <h2 className="text-xl font-semibold">{student.name}</h2>
//                         <p className="text-gray-500">{student.email}</p>
//                     </div>
//                 </div>

//                 <div className="space-y-3">
//                     <div>
//                         <span className="font-medium text-gray-600">Class Level:</span> {student.classLevel || "N/A"}
//                     </div>
//                     <div>
//                         <span className="font-medium text-gray-600">Class:</span> {student.studentClass || "N/A"}
//                     </div>
//                     <div>
//                         <span className="font-medium text-gray-600">Phone:</span> {student.phone || "N/A"}
//                     </div>
//                     <div>
//                         <span className="font-medium text-gray-600">Joined:</span> {new Date(student.createdAt).toLocaleDateString()}
//                     </div>
//                 </div>

//                 <div className="mt-6">
//                     <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                         Edit Profile
//                     </button>
//                 </div>
//             </div>
//         </StudentLayout>
//     );
// };

// export default StudentProfile;



import React, { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import fetch from "../../fetch";

const StudentProfile = () => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token"); // Adjust if using context
                const res = await fetch.get("/students/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStudent(res.data.student);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <StudentLayout><p>Loading profile...</p></StudentLayout>;
    if (!student) return <StudentLayout><p>No profile found.</p></StudentLayout>;

    return (
        <StudentLayout>
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>

            <div className="bg-white shadow rounded-xl p-6 max-w-xl">
                <div className="flex items-center mb-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mr-6 flex items-center justify-center text-3xl">
                        {student.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">{student.name}</h2>
                        <p className="text-gray-500">{student.email}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div>
                        <span className="font-medium text-gray-600">Class Level:</span> {student.classLevel || "N/A"}
                    </div>
                    <div>
                        <span className="font-medium text-gray-600">Class:</span> {student.studentClass || "N/A"}
                    </div>
                    <div>
                        <span className="font-medium text-gray-600">Phone:</span> {student.phone || "N/A"}
                    </div>
                    <div>
                        <span className="font-medium text-gray-600">Joined:</span> {new Date(student.createdAt).toLocaleDateString()}
                    </div>
                </div>

                <div className="mt-6">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Edit Profile
                    </button>
                </div>
            </div>
        </StudentLayout>
    );
};

export default StudentProfile;

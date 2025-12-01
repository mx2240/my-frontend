// // import React, { useState } from "react";
// // import Sidebar from '../components/student/StudentSidebar';
// // import Topbar from '../components/student/StudentTopbar';

// // const StudentLayout = ({ children }) => {
// //     const [open, setOpen] = useState(false);
// //     return (
// //         <div className="min-h-screen bg-gray-50">
// //             <Sidebar />
// //             {/* mobile drawer */}
// //             <div className={`fixed inset-0 z-40 md:hidden ${open ? 'block' : 'hidden'}`}>
// //                 <div className="absolute inset-0 bg-black opacity-40" onClick={() => setOpen(false)}></div>
// //                 <div className="absolute right-0 top-0 w-72 h-full bg-white shadow p-4">
// //                     <button className="mb-4" onClick={() => setOpen(false)}>Close ✕</button>
// //                     <Sidebar />
// //                 </div>
// //             </div>

// //             <div className="md:ml-64">
// //                 <Topbar onOpenSidebar={() => setOpen(true)} />
// //                 <main className="p-6">{children}</main>
// //             </div>
// //         </div>
// //     );
// // };

// // export default StudentLayout;



// import React, { useState } from "react";
// import { Link, Outlet } from "react-router-dom";

// export default function StudentLayout() {
//     const [open, setOpen] = useState(false);

//     return (
//         <div className="flex bg-gray-100 min-h-screen">

//             {/* Sidebar */}
//             <div
//                 className={`fixed lg:static top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 z-50
//         ${open ? "translate-x-0" : "-translate-x-64"} lg:translate-x-0`}
//             >
//                 <div className="p-4 text-xl font-bold border-b">Student Portal</div>

//                 <nav className="p-4 space-y-2">
//                     <Link className="block p-2 rounded hover:bg-gray-200" to="/Dashboard">
//                         📊 Dashboard
//                     </Link>
//                     <Link className="block p-2 rounded hover:bg-gray-200" to="/student/fees">
//                         💰 My Fees
//                     </Link>
//                     <Link className="block p-2 rounded hover:bg-gray-200" to="/student/attendance">
//                         🗓 Attendance
//                     </Link>
//                     <Link className="block p-2 rounded hover:bg-gray-200" to="/student/results">
//                         📝 Results
//                     </Link>
//                     <Link className="block p-2 rounded hover:bg-gray-200" to="/student/courses">
//                         📚 Courses
//                     </Link>
//                     <Link className="block p-2 rounded hover:bg-gray-200" to="/student/library">
//                         📘 Library
//                     </Link>
//                     <Link className="block p-2 rounded hover:bg-gray-200" to="/student/transport">
//                         🚌 Transport
//                     </Link>
//                     <Link className="block p-2 rounded hover:bg-gray-200" to="/student/profile">

//                     </Link>
//                 </nav>
//             </div>

//             {/* Content */}
//             <div className="flex-1 p-4">
//                 <Outlet />
//             </div>
//         </div>
//     );
// }


// src/components/student/StudentLayout.jsx
import React, { useState } from "react";
import StudentSidebar from "../components/student/StudentSidebar";
import StudentTopbar from "../components/student/StudentTopbar";

const StudentLayout = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Desktop Sidebar */}
            <StudentSidebar />

            {/* MOBILE DRAWER */}
            <div className={`fixed inset-0 z-50 md:hidden ${open ? "block" : "hidden"}`}>
                {/* Black overlay */}
                <div
                    className="absolute inset-0 bg-black opacity-40"
                    onClick={() => setOpen(false)}
                ></div>

                {/* Drawer */}
                <div className="absolute left-0 top-0 w-64 h-full bg-white shadow p-6 animate-slideIn">
                    <button
                        className="mb-4 font-semibold"
                        onClick={() => setOpen(false)}
                    >
                        ✕ Close
                    </button>
                    <StudentSidebar />
                </div>
            </div>

            {/* Main Content */}
            <div className="md:ml-64">
                <StudentTopbar onOpenSidebar={() => setOpen(true)} />

                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default StudentLayout;

// import { NavLink } from "react-router-dom";
// import {
//     FaTachometerAlt,
//     FaBook,
//     FaClipboardList,
//     FaMoneyBillWave,
//     FaBell,
//     FaUserCircle,
//     FaEnvelope,
//     FaCalendarAlt,
//     FaChartLine,
// } from "react-icons/fa";

// const StudentSidebar = () => {
//     const menuItems = [
//         { name: "Dashboard", icon: <FaTachometerAlt />, path: "/student/dashboard" },
//         { name: "Courses", icon: <FaBook />, path: "/student/courses" },
//         { name: "Assignments", icon: <FaClipboardList />, path: "/student/assignments" },
//         { name: "Payments", icon: <FaMoneyBillWave />, path: "/student/payments" },
//         { name: "Notifications", icon: <FaBell />, path: "/student/notifications" },
//         { name: "Profile", icon: <FaUserCircle />, path: "/student/profile" },
//         { name: "Support", icon: <FaEnvelope />, path: "/student/support" },
//         { name: "Timetable", icon: <FaCalendarAlt />, path: "/student/timetable" },
//         { name: "Grades", icon: <FaChartLine />, path: "/student/grades" },
//     ];

//     return (
//         <div className="w-64 min-h-screen bg-blue-900 text-white flex flex-col shadow-lg">
//             <div className="p-6 text-center border-b border-blue-800">
//                 <h1 className="text-2xl font-bold">Student Portal</h1>
//             </div>

//             <nav className="flex-1 p-4 space-y-2">
//                 {menuItems.map((item, index) => (
//                     <NavLink
//                         key={index}
//                         to={item.path}
//                         className={({ isActive }) =>
//                             `flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800 transition ${isActive ? "bg-blue-700" : ""
//                             }`
//                         }
//                     >
//                         <span className="text-lg">{item.icon}</span>
//                         <span className="font-medium">{item.name}</span>
//                     </NavLink>
//                 ))}
//             </nav>

//             <div className="p-6 border-t border-blue-800">
//                 <button className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default StudentSidebar;




// src/components/student/StudentSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const StudentSidebar = ({ onNavigate }) => {
    const menu = [
        { name: "Dashboard", path: "/student/dashboard" },
        { name: "My Profile", path: "/student/profile" },
        { name: "My Courses", path: "/student/courses" },
        { name: "Attendance", path: "/student/attendance" },
        { name: "Fees & Payments", path: "/student/fees" },
        { name: "Exams & Results", path: "/student/results" },
        { name: "Library", path: "/student/library" },
        { name: "Hostel", path: "/student/hostel" },
        { name: "Messages", path: "/student/messages" },
    ];

    return (
        <div className="bg-white fixed top-0 left-0 h-full w-64 shadow-md p-6 hidden md:block">
            <h2 className="text-xl font-bold mb-6">Student Portal</h2>

            <nav>
                {menu.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        onClick={onNavigate}
                        className="block py-3 px-3 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default StudentSidebar;




// // src/components/student/StudentSidebar.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// const StudentSidebar = ({ onNavigate }) => {
//     const menu = [
//         { name: "Dashboard", path: "/student/dashboard" },
//         { name: "My Profile", path: "/student/profile" },
//         { name: "My Courses", path: "/student/courses" },
//         { name: "Attendance", path: "/student/attendance" },
//         { name: "Fees & Payments", path: "/student/fees" },
//         { name: "Exams & Results", path: "/student/results" },
//         { name: "Library", path: "/student/library" },
//         { name: "Hostel", path: "/student/hostel" },
//         { name: "Messages", path: "/student/messages" },
//     ];

//     return (
//         <div className="bg-white fixed top-0 left-0 h-full w-64 shadow-md p-6 hidden md:block">
//             <h2 className="text-xl font-bold mb-6">Student Portal</h2>

//             <nav>
//                 {menu.map((item) => (
//                     <Link
//                         key={item.name}
//                         to={item.path}
//                         onClick={onNavigate}
//                         className="block py-3 px-3 rounded-md text-gray-700 hover:bg-gray-100"
//                     >
//                         {item.name}
//                     </Link>
//                 ))}
//             </nav>
//         </div>
//     );
// };

// export default StudentSidebar;



import React from "react";
import { Link } from "react-router-dom";

export default function StudentSidebar() {
    return (
        <aside className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white shadow p-6">
            <div className="mb-6 text-lg font-bold">Student</div>
            <nav className="flex flex-col gap-2">
                <Link to="/student/dashboard" className="py-2 px-3 rounded hover:bg-gray-100">Dashboard</Link>
                <Link to="/student/profile" className="py-2 px-3 rounded hover:bg-gray-100">Profile</Link>
                <Link to="/student/payments" className="py-2 px-3 rounded hover:bg-gray-100">Fees & Payment</Link>
                <Link to="/student/my-courses" className="py-2 px-3 rounded hover:bg-gray-100">My Course</Link>
                <button className="py-2 px-3 mt-4 text-left rounded hover:bg-gray-100" onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("student");
                    window.location.href = "/student/login";
                }}>Logout</button>
            </nav>
        </aside>
    );
}

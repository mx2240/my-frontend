// import { FaBell, FaUserCircle } from "react-icons/fa";

// const StudentTopbar = ({ notifications = 0, userName = "Student" }) => {
//     return (
//         <header className="flex justify-between items-center bg-white shadow-md px-6 py-4 sticky top-0 z-10">
//             <div>
//                 <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
//             </div>

//             <div className="flex items-center gap-4">
//                 <button className="relative text-gray-600 hover:text-gray-800">
//                     <FaBell className="text-xl" />
//                     {notifications > 0 && (
//                         <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                             {notifications}
//                         </span>
//                     )}
//                 </button>

//                 <div className="flex items-center gap-2 cursor-pointer">
//                     <FaUserCircle className="text-2xl text-gray-700" />
//                     <span className="font-medium text-gray-700">{userName}</span>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default StudentTopbar;





// src/components/student/StudentTopbar.jsx
import React from "react";

const StudentTopbar = ({ onOpenSidebar }) => {
    return (
        <div className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-40">
            {/* Mobile menu button */}
            <button
                className="md:hidden text-2xl"
                onClick={onOpenSidebar}
            >
                ☰
            </button>

            <h1 className="text-lg font-semibold">Student Dashboard</h1>

            <div className="flex items-center gap-2">
                <span className="text-gray-700">Welcome</span>
                <img
                    src="https://via.placeholder.com/35"
                    className="h-9 w-9 rounded-full"
                    alt="avatar"
                />
            </div>
        </div>
    );
};

export default StudentTopbar;

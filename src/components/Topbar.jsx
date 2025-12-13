import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useState } from "react";


const AdminTopbar = ({ darkMode, setDarkMode }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <div className="w-full bg-white dark:bg-gray-800 shadow-md p-4 rounded-xl flex justify-between items-center transition-all">

            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">
                Admin Dashboard
            </h2>

            {/* <button
                className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                onClick={() => setDarkMode(!darkMode)}
            >
                {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
            </button> */}

            <div className="relative">
                <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded transition"
                >
                    <FaUserCircle size={24} />
                    <span className="hidden md:inline">Admin</span>
                </button>

                {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-50">
                        <button className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <a href="/ad-profile"> Profile</a>
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <a href="/admin/settings"> Settings</a>
                        </button>
                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.href = "/login";
                            }}
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default AdminTopbar;





// import React, { useState } from "react";
// import { FaUserCircle, FaBars } from "react-icons/fa";

// const AdminTopbar = ({ toggleSidebar }) => {
//     const [showProfileMenu, setShowProfileMenu] = useState(false);

//     return (
//         <header className="bg-white dark:bg-gray-900 shadow-sm fixed top-0 left-0 right-0 z-50">
//             <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">

//                 {/* Left: Hamburger + Logo */}
//                 <div className="flex items-center gap-4">
//                     <button
//                         onClick={toggleSidebar}
//                         className="text-gray-700 dark:text-gray-200 md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//                     >
//                         <FaBars size={20} />
//                     </button>
//                     <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//                         Admin Panel
//                     </h1>
//                 </div>

//                 {/* Right: Profile Dropdown */}
//                 <div className="relative">
//                     <button
//                         onClick={() => setShowProfileMenu(!showProfileMenu)}
//                         className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded transition"
//                     >
//                         <FaUserCircle size={24} />
//                         <span className="hidden md:inline">Admin</span>
//                     </button>

//                     {showProfileMenu && (
//                         <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-50">
//                             <button className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
//                                 Profile
//                             </button>
//                             <button className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
//                                 Settings
//                             </button>
//                             <button
//                                 onClick={() => {
//                                     localStorage.removeItem("token");
//                                     window.location.href = "/login";
//                                 }}
//                                 className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded"
//                             >
//                                 Logout
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default AdminTopbar;

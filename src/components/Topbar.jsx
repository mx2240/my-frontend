// import React from "react";
// import { FaMoon, FaSun } from "react-icons/fa";

// const AdminTopbar = ({ darkMode, setDarkMode }) => {
//     return (
//         <div className="w-full bg-white dark:bg-gray-800 shadow-md p-4 rounded-xl flex justify-between items-center transition-all">

//             <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">
//                 Admin Dashboard
//             </h2>

//             <button
//                 className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
//                 onClick={() => setDarkMode(!darkMode)}
//             >
//                 {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
//             </button>

//         </div>
//     );
// };

// export default AdminTopbar;

import React from "react";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";

const AdminTopbar = ({ darkMode, setDarkMode }) => {
    return (
        <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Left */}
                <h1 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Admin Dashboard
                </h1>

                {/* Right */}
                <div className="flex items-center gap-4">

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        aria-label="Toggle Theme"
                    >
                        {darkMode ? (
                            <FaSun className="text-yellow-400 text-lg" />
                        ) : (
                            <FaMoon className="text-gray-700 text-lg" />
                        )}
                    </button>

                    {/* Admin Profile */}
                    <div className="hidden sm:flex items-center gap-2">
                        <FaUserCircle className="text-2xl text-gray-600 dark:text-gray-300" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Admin
                        </span>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default AdminTopbar;




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
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const AdminTopbar = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 py-3 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                Admin Dashboard
            </h1>
            <button
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
                {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
            </button>
        </header>
    );
};

export default AdminTopbar;



import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const AdminTopbar = ({ darkMode, setDarkMode }) => {
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

        </div>
    );
};

export default AdminTopbar;

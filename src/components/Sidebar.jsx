import React from "react";
import { FaTachometerAlt, FaUsers, FaBook, FaMoneyBill, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";


const AdminSidebar = () => {
    return (



        <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl p-6 transition-all">

            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-10">
                Admin Panel
            </h1>

            <ul className="space-y-4">
                <li>
                    <Link
                        to="/admin/dasbord"
                        className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white 
                      rounded-lg transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
                    >
                        <FaTachometerAlt /> Dashboard
                    </Link>
                </li>

                <li>
                    <Link
                        to="/add-student"
                        className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
                      transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
                    >
                        <FaUsers /> Students
                    </Link>

                    {/* <Link
                        to="/students"
                        className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
                       transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
                    >
                        <FaUsers />Mangement
                    </Link> */}

                    {/* <Link
                        to="/student-list"
                        className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
                       transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
                    >
                        <FaUsers />list
                    </Link> */}





                    <Link
                        to="/admin/enrollment"
                        className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
                       transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
                    >
                        <FaUsers />Enrrollment
                    </Link>



                    {/* <Link
                        to="/admin/enrollment/form"
                        className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
                       transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
                    >
                        <FaUsers />Enrrollment Form
                    </Link> */}

                </li>

                <li>
                    <Link
                        to="/courses"
                        className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
                       transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
                    >
                        <FaBook /> Courses
                    </Link>
                </li>

                {/* 
                <li>
                    <a href="/admin/add-course" className="block px-4 py-2 hover:bg-blue-100">
                        ➕ Add Course
                    </a>
                </li> */}

                <li>
                    <Link
                        to="/admin/fees"
                        className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
                       transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
                    >
                        <FaMoneyBill /> Fees & Payments
                    </Link>

                    <Link
                        to="/admin/assignfee"
                        className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
                       transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
                    >
                        <FaMoneyBill /> Assign fees
                    </Link>

                    <Link
                        to="/admin/feetracking"
                        className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
                       transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
                    >
                        <FaMoneyBill /> Fees Tracking
                    </Link>

                    {/* <Link
                        to="/fee"
                        className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
                       transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
                    >
                        <FaMoneyBill /> Fees Management
                    </Link> */}
                </li>

                <li>

                    <Link
                        to="/notifications"
                        className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
                       transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
                    >
                        <FaCog /> Notifiction
                    </Link>






                    <Link
                        to="/admin/settings"
                        className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
                       transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
                    >
                        <FaCog /> Settings
                    </Link>



                    <Link
                        to="logout"
                        className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
                       transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
                    >
                        <FaCog /> logout
                    </Link>


                    {/* <li onClick={logout}>Logout</li> */}



                </li>
            </ul>
        </div>

    );
};

export default AdminSidebar;

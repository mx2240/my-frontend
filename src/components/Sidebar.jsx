// import React from "react";
// import { FaTachometerAlt, FaUsers, FaBook, FaMoneyBill, FaCog } from "react-icons/fa";
// import { Link } from "react-router-dom";


// const AdminSidebar = () => {
//     return (

//         <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">


//             <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl p-6 transition-all">

//                 <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-10">
//                     Admin Panel
//                 </h1>

//                 <ul className="space-y-4">
//                     <li>
//                         <Link
//                             to="/admin/dasbord"
//                             className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white 
//                       rounded-lg transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
//                         >
//                             <FaTachometerAlt /> Dashboard
//                         </Link>
//                     </li>

//                     <li>
//                         <Link
//                             to="/add-student"
//                             className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
//                       transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
//                         >
//                             <FaUsers /> Students
//                         </Link>

//                         {/* <Link
//                         to="/students"
//                         className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
//                        transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
//                     >
//                         <FaUsers />Mangement
//                     </Link> */}

//                         {/* <Link
//                         to="/student-list"
//                         className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
//                        transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
//                     >
//                         <FaUsers />list
//                     </Link> */}





//                         <Link
//                             to="/admin/enrollment"
//                             className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
//                        transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
//                         >
//                             <FaUsers />Enrrollment
//                         </Link>



//                         {/* <Link
//                         to="/admin/enrollment/form"
//                         className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
//                        transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
//                     >
//                         <FaUsers />Enrrollment Form
//                     </Link> */}

//                     </li>

//                     <li>
//                         <Link
//                             to="/courses"
//                             className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
//                        transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
//                         >
//                             <FaBook /> Courses
//                         </Link>
//                     </li>

//                     {/* 
//                 <li>
//                     <a href="/admin/add-course" className="block px-4 py-2 hover:bg-blue-100">
//                         ➕ Add Course
//                     </a>
//                 </li> */}

//                     <li>
//                         <Link
//                             to="/admin/fees"
//                             className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
//                        transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
//                         >
//                             <FaMoneyBill /> Fees & Payments
//                         </Link>

//                         <Link
//                             to="/admin/assignfee"
//                             className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
//                        transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
//                         >
//                             <FaMoneyBill /> Assign fees
//                         </Link>

//                         <Link
//                             to="/admin/feetracking"
//                             className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
//                        transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
//                         >
//                             <FaMoneyBill /> Fees Tracking
//                         </Link>

//                         {/* <Link
//                         to="/fee"
//                         className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
//                        transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
//                     >
//                         <FaMoneyBill /> Fees Management
//                     </Link> */}
//                     </li>

//                     <li>

//                         <Link
//                             to="/events"
//                             className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
//                        transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
//                         >
//                             <FaCog /> Event
//                         </Link>



//                         <Link
//                             to="/ad-profile"
//                             className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
//                        transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
//                         >
//                             <FaCog /> Profiles
//                         </Link>



//                         <Link
//                             to="/admin/settings"
//                             className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
//                        transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
//                         >
//                             <FaCog /> Settings
//                         </Link>



//                         <Link
//                             to="/login"
//                             className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white rounded-lg 
//                        transition-all cursor-pointer dark:text-gray-300 dark:hover:bg-blue-600"
//                         >
//                             <FaCog /> logout
//                         </Link>


//                         {/* <li onClick={logout}>Logout</li> */}



//                     </li>
//                 </ul>
//             </div>
//         </div>

//     );
// };

// export default AdminSidebar;



import React, { useState } from "react";
import {
    FaTachometerAlt,
    FaUsers,
    FaBook,
    FaMoneyBillWave,
    FaCog,
    FaCalendarAlt,
    FaSignOutAlt,
    FaUserCircle,
    FaBars,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const navBase =
    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition";
const navActive =
    "bg-blue-600 text-white shadow";
const navInactive =
    "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800";

const Section = ({ title }) => (
    <p className="mt-6 mb-2 px-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
        {title}
    </p>
);

const Item = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `${navBase} ${isActive ? navActive : navInactive}`
        }
    >
        <Icon className="text-base shrink-0" />
        <span className="truncate">{label}</span>
    </NavLink>
);

const AdminSidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Mobile top bar */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 z-40">
                <button onClick={() => setOpen(true)}>
                    <FaBars className="text-xl text-gray-700 dark:text-gray-200" />
                </button>
                <h1 className="ml-4 font-semibold text-blue-600">Admin Panel</h1>
            </div>

            {/* Overlay (mobile) */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-60 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                {/* Header */}
                <div className="h-14 flex items-center px-5 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        Admin Panel
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col h-[calc(100vh-56px)] px-4 py-4 overflow-hidden">

                    {/* Scrollable menu only */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide">

                        <Section title="Overview" />
                        <Item to="/admin" icon={FaTachometerAlt} label="Dashboard" />

                        <Section title="Management" />
                        <Item to="/add-student" icon={FaUsers} label="Students" />
                        <Item to="/admin/enrollment" icon={FaUsers} label="Enrollments" />
                        <Item to="/courses" icon={FaBook} label="Courses" />

                        <Section title="Finance" />
                        <Item to="/admin/fees" icon={FaMoneyBillWave} label="Fees & Payments" />
                        <Item to="/admin/assignfee" icon={FaMoneyBillWave} label="Assign Fees" />
                        <Item to="/admin/feetracking" icon={FaMoneyBillWave} label="Fee Tracking" />

                        <Section title="System" />
                        <Item to="/events" icon={FaCalendarAlt} label="Events" />
                        <Item to="/ad-profile" icon={FaUserCircle} label="Admin Profile" />
                        <Item to="/admin/settings" icon={FaCog} label="Settings" />
                    </div>

                    {/* Logout (fixed bottom) */}
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <NavLink
                            to="/login"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 transition"
                        >
                            <FaSignOutAlt />
                            Logout
                        </NavLink>
                    </div>
                </nav>
            </aside>
        </>
    );
};

export default AdminSidebar;



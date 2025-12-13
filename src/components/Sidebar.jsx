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




import React from "react";
import {
    FaTachometerAlt,
    FaUsers,
    FaBook,
    FaMoneyBillWave,
    FaCog,
    FaCalendarAlt,
    FaSignOutAlt,
    FaUserCircle,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const baseItem =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium";
const activeItem =
    "bg-blue-600 text-white shadow-md";
const inactiveItem =
    "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800";

const SectionTitle = ({ children }) => (
    <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wide text-gray-400">
        {children}
    </p>
);

const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `${baseItem} ${isActive ? activeItem : inactiveItem}`
        }
    >
        <Icon className="text-lg" />
        {label}
    </NavLink>
);

const AdminSidebar = () => {
    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col px-5 py-6">

            {/* Brand */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    Admin Panel
                </h1>
                <p className="text-xs text-gray-400">
                    Management Dashboard
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto text-sm">

                <SectionTitle>Overview</SectionTitle>
                <NavItem to="/admin" icon={FaTachometerAlt} label="Dashboard" />

                <SectionTitle>Management</SectionTitle>
                <NavItem to="/add-student" icon={FaUsers} label="Students" />
                <NavItem to="/admin/enrollment" icon={FaUsers} label="Enrollments" />
                <NavItem to="/courses" icon={FaBook} label="Courses" />

                <SectionTitle>Finance</SectionTitle>
                <NavItem to="/admin/fees" icon={FaMoneyBillWave} label="Fees & Payments" />
                <NavItem to="/admin/assignfee" icon={FaMoneyBillWave} label="Assign Fees" />
                <NavItem to="/admin/feetracking" icon={FaMoneyBillWave} label="Fee Tracking" />

                <SectionTitle>System</SectionTitle>
                <NavItem to="/events" icon={FaCalendarAlt} label="Events" />
                <NavItem to="/ad-profile" icon={FaUserCircle} label="Admin Profile" />
                <NavItem to="/admin/settings" icon={FaCog} label="Settings" />

            </nav>

            {/* Logout */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <NavLink
                    to="/login"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 transition-all"
                >
                    <FaSignOutAlt />
                    Logout
                </NavLink>
            </div>
        </aside>
    );
};

export default AdminSidebar;

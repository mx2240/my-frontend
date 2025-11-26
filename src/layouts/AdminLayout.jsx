import React, { useState } from "react";
import AdminSidebar from '../components/Sidebar'
import AdminTopbar from '../components/Topbar'

const AdminLayout = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={darkMode ? "dark" : ""}>
            <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen transition-all">

                {/* Sidebar */}
                <AdminSidebar />

                {/* Main Content */}
                <div className="flex-1 ml-64 p-6 transition-all">

                    {/* Topbar */}
                    <AdminTopbar darkMode={darkMode} setDarkMode={setDarkMode} />

                    {/* PAGE CONTENT */}
                    <div className="mt-6">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminLayout;






// import React, { useState } from "react";
// import { Link, Outlet } from "react-router-dom";

// export default function AdminLayout() {
//     const [open, setOpen] = useState(true);
//     const toggleSidebar = () => setOpen(!open);

//     return (
//         <div className="admin-container">
//             {/* Sidebar */}
//             <aside className={open ? "sidebar open" : "sidebar"}>
//                 <h2 className="logo">Admin</h2>

//                 <nav>
//                     <Link to="/admin/dashboard">📊 Dashboard</Link>
//                     <Link to="/admin/students">👨‍🎓 Students</Link>
//                     <Link to="/admin/fees">💰 Fees</Link>
//                     <Link to="/admin/assign-fees">📝 Assign Fees</Link>
//                     <Link to="/admin/fee-tracking">📌 Fee Tracking</Link>
//                     <Link to="/admin/payments">💳 Payments</Link>
//                 </nav>
//             </aside>

//             {/* Main Section */}
//             <div className="main">
//                 <header>
//                     <button className="menu-btn" onClick={toggleSidebar}>☰</button>
//                     <h1>School Admin Dashboard</h1>
//                 </header>

//                 <div className="content-area">
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     );
// }


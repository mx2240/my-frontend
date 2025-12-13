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






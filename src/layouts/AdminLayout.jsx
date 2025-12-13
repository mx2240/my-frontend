// import React, { useState } from "react";
// import AdminSidebar from '../components/Sidebar'
// import AdminTopbar from '../components/Topbar'

// const AdminLayout = ({ children }) => {
//     const [darkMode, setDarkMode] = useState(false);

//     return (
//         <div className={darkMode ? "dark" : ""}>
//             <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen transition-all">

//                 {/* Sidebar */}
//                 <AdminSidebar />

//                 {/* Main Content */}
//                 <div className="flex-1 ml-64 p-6 transition-all">

//                     {/* Topbar */}
//                     <AdminTopbar darkMode={darkMode} setDarkMode={setDarkMode} />

//                     {/* PAGE CONTENT */}
//                     <div className="mt-6">
//                         {children}
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminLayout;



import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/Sidebar";
import AdminTopbar from "../components/Topbar";

const AdminLayout = ({ children }) => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    // Apply dark mode globally
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
            <div className="flex">

                {/* Sidebar */}
                <AdminSidebar />

                {/* Main Content */}
                <div className="flex-1 lg:ml-64 min-h-screen transition-all">

                    {/* Topbar */}
                    <AdminTopbar darkMode={darkMode} setDarkMode={setDarkMode} />

                    {/* Page Content */}
                    <main className="p-4 md:p-6">
                        {children}
                    </main>

                </div>
            </div>
        </div>
    );
};

export default AdminLayout;






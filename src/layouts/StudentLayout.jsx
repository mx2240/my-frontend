import React, { useState } from "react";
import Sidebar from '../components/student/StudentSidebar';
import Topbar from '../components/student/StudentTopbar';

const StudentLayout = ({ children }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            {/* mobile drawer */}
            <div className={`fixed inset-0 z-40 md:hidden ${open ? 'block' : 'hidden'}`}>
                <div className="absolute inset-0 bg-black opacity-40" onClick={() => setOpen(false)}></div>
                <div className="absolute right-0 top-0 w-72 h-full bg-white shadow p-4">
                    <button className="mb-4" onClick={() => setOpen(false)}>Close ✕</button>
                    <Sidebar />
                </div>
            </div>

            <div className="md:ml-64">
                <Topbar onOpenSidebar={() => setOpen(true)} />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default StudentLayout;

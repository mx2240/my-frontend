import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./../admin.css";

export default function AdminLayout({ children }) {
    const [open, setOpen] = useState(true);

    return (
        <div className="admin-container">
            <Sidebar open={open} setOpen={setOpen} />

            <div className={`admin-content ${open ? "content-shift" : ""}`}>
                <header className="admin-header">
                    <button className="toggle-btn" onClick={() => setOpen(!open)}>
                        ☰
                    </button>
                    <h2>Admin Panel</h2>
                </header>

                <main className="admin-main">
                    {children}
                </main>
            </div>
        </div>
    );
}

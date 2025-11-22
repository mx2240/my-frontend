import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
    return (
        <div className={`admin-sidebar ${open ? "show" : "hide"}`}>
            <h3 className="logo">ADMIN</h3>

            <nav>
                <Link to="/admin">Dashboard</Link>
                <Link to="/admin/users">Users</Link>
            </nav>
        </div>
    );
}

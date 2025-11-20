import React, { useState } from "react";
import { FaBell, FaTrash, FaCheck } from "react-icons/fa";
import AdminLayout from "../../layouts/AdminLayout";

const AdminNotifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "New Student Registered",
            message: "A new student has created an account.",
            time: "2 hours ago",
            read: false,
        },
        {
            id: 2,
            title: "Payment Received",
            message: "A student has paid their school fees.",
            time: "5 hours ago",
            read: true,
        },
        {
            id: 3,
            title: "Course Enrollment",
            message: "A student enrolled in Science course.",
            time: "1 day ago",
            read: false,
        },
    ]);

    const markRead = (id) => {
        setNotifications((prev) =>
            prev.map((n) =>
                n.id === id ? { ...n, read: true } : n
            )
        );
    };

    const deleteNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <AdminLayout>
            <div className="p-6">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <FaBell className="text-blue-600" />
                        Notifications
                    </h1>
                </div>

                {/* NOTIFICATION LIST */}
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`border rounded-xl p-5 shadow-sm flex items-start justify-between transition 
            ${notification.read ? "bg-gray-100" : "bg-white"}`}
                        >
                            <div>
                                <h2 className="text-lg font-semibold">{notification.title}</h2>
                                <p className="text-gray-600 mt-1">{notification.message}</p>
                                <small className="text-gray-400">{notification.time}</small>
                            </div>

                            <div className="flex gap-4">
                                {!notification.read && (
                                    <button
                                        onClick={() => markRead(notification.id)}
                                        className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600"
                                        title="Mark as read"
                                    >
                                        <FaCheck size={14} />
                                    </button>
                                )}

                                <button
                                    onClick={() => deleteNotification(notification.id)}
                                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                                    title="Delete"
                                >
                                    <FaTrash size={14} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {notifications.length === 0 && (
                        <p className="text-center text-gray-500 mt-10">No notifications found.</p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminNotifications;

import { FaBell } from "react-icons/fa";

const StudentNotifications = () => {
    const notifications = [
        { text: "New assignment posted for CS101", date: "2025-01-08" },
        { text: "Your payment for INV-001 is confirmed", date: "2025-01-07" },
        { text: "Timetable updated for semester 2", date: "2025-01-05" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Notifications</h1>

            <div className="space-y-4">
                {notifications.map((note, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded-xl shadow flex items-start gap-4"
                    >
                        <FaBell className="text-blue-600 text-2xl" />

                        <div>
                            <p className="font-medium">{note.text}</p>
                            <p className="text-gray-600 text-sm">{note.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentNotifications;

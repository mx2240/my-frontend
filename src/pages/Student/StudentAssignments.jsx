import { FaClipboardList, FaCheckCircle, FaClock } from "react-icons/fa";

const StudentAssignments = () => {
    const assignments = [
        {
            title: "Programming Project",
            due: "2025-01-15",
            status: "Pending",
        },
        {
            title: "Math Assignment 2",
            due: "2025-01-10",
            status: "Submitted",
        },
        {
            title: "Networking Quiz",
            due: "2025-01-20",
            status: "Pending",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Assignments</h1>

            <div className="bg-white rounded-xl shadow p-6">
                {assignments.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center border-b py-4"
                    >
                        <div>
                            <h2 className="font-bold text-lg">{item.title}</h2>
                            <p className="text-gray-600 flex items-center gap-2">
                                <FaClock /> Due: {item.due}
                            </p>
                        </div>

                        {item.status === "Submitted" ? (
                            <span className="flex items-center gap-2 text-green-600 font-medium">
                                <FaCheckCircle /> Submitted
                            </span>
                        ) : (
                            <span className="flex items-center gap-2 text-yellow-600 font-medium">
                                <FaClipboardList /> Pending
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentAssignments;

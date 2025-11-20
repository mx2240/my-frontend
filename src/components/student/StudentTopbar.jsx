import { FaBell, FaUserCircle } from "react-icons/fa";

const StudentTopbar = ({ notifications = 0, userName = "Student" }) => {
    return (
        <header className="flex justify-between items-center bg-white shadow-md px-6 py-4 sticky top-0 z-10">
            <div>
                <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative text-gray-600 hover:text-gray-800">
                    <FaBell className="text-xl" />
                    {notifications > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {notifications}
                        </span>
                    )}
                </button>

                <div className="flex items-center gap-2 cursor-pointer">
                    <FaUserCircle className="text-2xl text-gray-700" />
                    <span className="font-medium text-gray-700">{userName}</span>
                </div>
            </div>
        </header>
    );
};

export default StudentTopbar;

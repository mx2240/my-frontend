import { FaBook, FaClipboardList, FaMoneyBill, FaUser } from "react-icons/fa";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <header className="bg-white shadow rounded-xl p-5 flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
                <div className="flex items-center gap-3">
                    <FaUser className="text-gray-600 text-xl" />
                    <span className="font-medium">Welcome, Student</span>
                </div>
            </header>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Courses */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <FaBook className="text-blue-600 text-4xl mb-4" />
                    <h2 className="text-xl font-bold mb-2">My Courses</h2>
                    <p className="text-gray-600">
                        View all the courses you are enrolled in.
                    </p>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        View Courses
                    </button>
                </div>

                {/* Assignments */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <FaClipboardList className="text-green-600 text-4xl mb-4" />
                    <h2 className="text-xl font-bold mb-2">Assignments</h2>
                    <p className="text-gray-600">
                        Check pending and submitted assignments.
                    </p>
                    <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        View Assignments
                    </button>
                </div>

                {/* Fees */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <FaMoneyBill className="text-yellow-500 text-4xl mb-4" />
                    <h2 className="text-xl font-bold mb-2">Fees & Payments</h2>
                    <p className="text-gray-600">
                        Track school payments and invoices.
                    </p>
                    <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                        View Payments
                    </button>
                </div>

                {/* Profile */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <FaUser className="text-purple-600 text-4xl mb-4" />
                    <h2 className="text-xl font-bold mb-2">My Profile</h2>
                    <p className="text-gray-600">
                        View and update your personal information.
                    </p>
                    <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                        View Profile
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;


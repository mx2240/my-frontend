import { FaChartLine } from "react-icons/fa";

const StudentGrades = () => {
    const grades = [
        { course: "CS101", grade: "A" },
        { course: "MTH102", grade: "B+" },
        { course: "WD103", grade: "A-" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Grades & Performance</h1>

            <div className="bg-white p-6 rounded-xl shadow">
                {grades.map((item, index) => (
                    <div
                        key={index}
                        className="border-b flex justify-between py-4 items-center"
                    >
                        <h2 className="text-lg font-semibold">{item.course}</h2>
                        <span className="text-xl font-bold text-blue-700">
                            {item.grade}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentGrades;

const StudentTimetable = () => {
    const timetable = [
        { course: "CS101", day: "Monday", time: "8:00 AM - 10:00 AM" },
        { course: "MTH102", day: "Tuesday", time: "10:00 AM - 12:00 PM" },
        { course: "WD103", day: "Thursday", time: "1:00 PM - 3:00 PM" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Timetable</h1>

            <div className="bg-white shadow rounded-xl p-6">
                {timetable.map((item, index) => (
                    <div
                        key={index}
                        className="border-b py-4 flex justify-between items-center"
                    >
                        <div>
                            <h2 className="font-bold text-lg">{item.course}</h2>
                            <p className="text-gray-600">{item.day}</p>
                        </div>

                        <p className="text-gray-700 font-medium">{item.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentTimetable;

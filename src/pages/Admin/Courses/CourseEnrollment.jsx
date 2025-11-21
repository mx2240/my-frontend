import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseEnrollment = () => {
    const [courses, setCourses] = useState([]); // default to empty array
    const [students, setStudents] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [assignedStudents, setAssignedStudents] = useState([]);

    useEffect(() => {
        fetchCourses();
        fetchStudents();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await axios.get("/courses");
            // Ensure res.data is an array
            setCourses(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Failed to fetch courses:", err);
            setCourses([]);
        }
    };

    const fetchStudents = async () => {
        try {
            const res = await axios.get("/users?role=student");
            setStudents(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Failed to fetch students:", err);
            setStudents([]);
        }
    };

    const handleSelectCourse = (course) => {
        setSelectedCourse(course);
        setAssignedStudents(course.students || []);
    };

    const toggleStudentAssignment = (studentId) => {
        if (assignedStudents.includes(studentId)) {
            setAssignedStudents(assignedStudents.filter(id => id !== studentId));
        } else {
            setAssignedStudents([...assignedStudents, studentId]);
        }
    };

    const handleSaveAssignments = async () => {
        if (!selectedCourse) return;
        try {
            await axios.put(`/courses/${selectedCourse._id}/assign-students`, {
                students: assignedStudents,
            });
            alert("Students assigned successfully!");
        } catch (err) {
            console.error("Failed to assign students:", err);
            alert("Failed to assign students");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Course Enrollment</h1>

            <div className="flex gap-6">
                <div className="w-1/3">
                    <h2 className="font-semibold mb-2">Courses</h2>
                    <ul className="border rounded p-2 max-h-96 overflow-auto">
                        {Array.isArray(courses) && courses.length > 0 ? (
                            courses.map(course => (
                                <li
                                    key={course._id}
                                    className={`p-2 cursor-pointer rounded mb-1 ${selectedCourse?._id === course._id ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => handleSelectCourse(course)}
                                >
                                    {course.title}
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500">No courses available</li>
                        )}
                    </ul>
                </div>

                <div className="w-2/3">
                    <h2 className="font-semibold mb-2">
                        Students {selectedCourse ? `- ${selectedCourse.title}` : ""}
                    </h2>
                    <div className="border rounded p-2 max-h-96 overflow-auto">
                        {Array.isArray(students) && students.length > 0 ? (
                            students.map(student => (
                                <div
                                    key={student._id}
                                    className="flex justify-between items-center p-2 border-b last:border-b-0"
                                >
                                    <span>{student.name}</span>
                                    <input
                                        type="checkbox"
                                        checked={assignedStudents.includes(student._id)}
                                        onChange={() => toggleStudentAssignment(student._id)}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No students found</p>
                        )}
                    </div>

                    {selectedCourse && (
                        <button
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            onClick={handleSaveAssignments}
                        >
                            Save Assignments
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseEnrollment;

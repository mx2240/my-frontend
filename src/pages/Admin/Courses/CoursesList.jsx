import React, { useEffect, useState } from "react";
import axios from "axios";

const CoursesList = () => {
    const [courses, setCourses] = useState([]); // default to empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get("/api/courses");
                // Make sure res.data is an array
                setCourses(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Failed to fetch courses:", err);
                setError("Failed to load courses");
                setCourses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Courses List</h1>
            {courses.length === 0 ? (
                <p>No courses available</p>
            ) : (
                <ul className="border rounded p-2">
                    {courses.map((course) => (
                        <li key={course._id} className="p-2 border-b last:border-b-0">
                            <span className="font-semibold">{course.title}</span> - {course.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CoursesList;

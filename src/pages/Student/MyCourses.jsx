import React, { useEffect, useState, useContext } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import fetch from "../../fetch"

const MyCourses = () => {
    const { token } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadMyCourses = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/enrollments/my-courses`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Failed to load courses");
                return;
            }

            // Ensure backend returns array
            setCourses(data.courses || data || []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load courses");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) loadMyCourses();
    }, [token]);

    return (
        <StudentLayout>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">My Courses</h2>

                {/* Loading */}
                {loading && (
                    <div className="bg-white p-4 rounded shadow">Loading...</div>
                )}

                {/* No courses */}
                {!loading && courses.length === 0 && (
                    <div className="bg-white p-4 rounded shadow">
                        You are not enrolled in any courses.
                    </div>
                )}

                {/* Courses list */}
                <div className="grid gap-4">
                    {courses.map((c) => (
                        <div
                            key={c._id}
                            className="p-4 bg-white rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold text-lg">{c.title}</h3>
                                <p className="text-sm text-gray-500">{c.description}</p>
                            </div>

                            <Link
                                to={`/student/courses/${c._id}`}
                                className="text-blue-600 font-medium"
                            >
                                View
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </StudentLayout>
    );
};

export default MyCourses;

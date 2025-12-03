import React, { useEffect, useState, useContext } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { AuthContext } from "../../context/AuthProvider";
import api from "../../fetch";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function MyCourses() {
    const { token } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCourses();
    }, [token]);

    async function loadCourses() {
        try {
            const res = await api.get("/enrollments/my-courses", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.ok) {
                setCourses(res.data.body || []);
            } else {
                toast.error(res.data.message || "Failed to load courses");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error loading courses");
        } finally {
            setLoading(false);
        }
    }

    return (
        <StudentLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">My Courses</h2>

                {loading && (
                    <div className="p-4 bg-white rounded shadow">Loading…</div>
                )}

                {!loading && courses.length === 0 && (
                    <div className="p-4 bg-white rounded shadow">
                        You have no enrolled courses.
                    </div>
                )}

                <div className="grid gap-4">
                    {courses.map((item) => (
                        <div
                            key={item._id}
                            className="p-4 bg-white rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold">{item.course?.title}</h3>
                                <p className="text-gray-500 text-sm">
                                    {item.course?.description}
                                </p>
                            </div>

                            <Link
                                to={`/student/courses/${item.course?._id}`}
                                className="text-blue-600 font-medium"
                            >
                                Open
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </StudentLayout>
    );
}

// import React, { useEffect, useState, useContext } from "react";
// import StudentLayout from "../../layouts/StudentLayout";
// import { AuthContext } from "../../context/AuthProvider";
// import { Link } from "react-router-dom";

// const MyCourses = () => {
//     const { token } = useContext(AuthContext);
//     const [courses, setCourses] = useState([]);

//     useEffect(() => {
//         (async () => {
//             try {
//                 const res = await fetch("/enrollments//my-courses", { headers: { Authorization: `Bearer ${token}` } });
//                 const data = await res.json();
//                 setCourses(Array.isArray(data) ? data : []);
//             } catch (err) { console.error(err); }
//         })();
//     }, [token]);

//     return (
//         <StudentLayout>
//             <h2 className="text-xl font-semibold mb-4">My Courses</h2>
//             <div className="grid gap-4">
//                 {courses.length === 0 && <div className="p-4 bg-white rounded shadow">You have no enrollments.</div>}
//                 {courses.map(c => (
//                     <div key={c._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
//                         <div>
//                             <h3 className="font-semibold">{c.title}</h3>
//                             <p className="text-sm text-gray-500">{c.description}</p>
//                         </div>
//                         <Link to={`/student/courses/${c._id}`} className="text-[var(--navy)] font-medium">Open</Link>
//                     </div>
//                 ))}
//             </div>
//         </StudentLayout>
//     );
// };
// export default MyCourses;



import React, { useEffect, useState, useContext } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://my-backend-amber.vercel.app";

const MyCourses = () => {
    const { token } = useContext(AuthContext);

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/enrollments/my-courses`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                if (!res.ok) {
                    setError(data.message || "Failed to load courses");
                    setLoading(false);
                    return;
                }

                // Ensure it's always an array
                setCourses(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
                setError("Network error. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [token]);

    return (
        <StudentLayout>
            <h2 className="text-xl font-semibold mb-4">My Courses</h2>

            {/* Loading State */}
            {loading && (
                <div className="p-4 bg-white rounded shadow text-center">
                    Loading courses...
                </div>
            )}

            {/* Error State */}
            {!loading && error && (
                <div className="p-4 bg-red-100 text-red-600 rounded shadow">
                    {error}
                </div>
            )}

            {/* No Courses */}
            {!loading && !error && courses.length === 0 && (
                <div className="p-4 bg-white rounded shadow text-center">
                    You have no enrolled courses yet.
                </div>
            )}

            {/* Course List */}
            <div className="grid gap-4 mt-4">
                {courses.map((enroll) => {
                    const course = enroll.course || enroll; // fallback in case backend returns direct course data

                    return (
                        <div
                            key={enroll._id || course._id}
                            className="p-4 bg-white rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold text-lg">
                                    {course.title || "Untitled Course"}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {course.description || "No description available"}
                                </p>
                            </div>

                            <Link
                                to={`/student/courses/${course._id}`}
                                className="text-[var(--navy)] font-medium hover:underline"
                            >
                                Open
                            </Link>
                        </div>
                    );
                })}
            </div>
        </StudentLayout>
    );
};

export default MyCourses;


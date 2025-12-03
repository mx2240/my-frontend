import React, { useEffect, useState, useContext } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";

const MyCourses = () => {
    const { token } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("student/enrollments//my-courses", { headers: { Authorization: `Bearer ${token}` } });
                const data = await res.json();
                setCourses(Array.isArray(data) ? data : []);
            } catch (err) { console.error(err); }
        })();
    }, [token]);

    return (
        <StudentLayout>
            <h2 className="text-xl font-semibold mb-4">My Courses</h2>
            <div className="grid gap-4">
                {courses.length === 0 && <div className="p-4 bg-white rounded shadow">You have no enrollments.</div>}
                {courses.map(c => (
                    <div key={c._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">{c.title}</h3>
                            <p className="text-sm text-gray-500">{c.description}</p>
                        </div>
                        <Link to={`/student/courses/${c._id}`} className="text-[var(--navy)] font-medium">Open</Link>
                    </div>
                ))}
            </div>
        </StudentLayout>
    );
};
export default MyCourses;

// import React, { useEffect, useState, useContext } from "react";
// import StudentLayout from "../../layouts/StudentLayout";
// import { useParams } from "react-router-dom";
// import { AuthContext } from "../../context/AuthProvider";

// const CourseDetails = () => {
//     const { id } = useParams();
//     const { token } = useContext(AuthContext);
//     const [course, setCourse] = useState(null);

//     useEffect(() => {
//         (async () => {
//             try {
//                 const res = await fetch(`/api/courses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//                 const data = await res.json();
//                 setCourse(data);
//             } catch (err) { console.error(err); }
//         })();
//     }, [id, token]);

//     if (!course) return <StudentLayout><div className="p-6">Loading...</div></StudentLayout>;

//     return (
//         <StudentLayout>
//             <div className="bg-white p-6 rounded shadow">
//                 <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
//                 <p className="text-gray-600 mb-4">{course.description}</p>
//                 <p><strong>Instructor:</strong> {course.instructor || "N/A"}</p>
//                 <p><strong>Duration:</strong> {course.duration || "N/A"}</p>
//             </div>
//         </StudentLayout>
//     );
// };
// export default CourseDetails;





// 
import { FaBookOpen } from "react-icons/fa";

const StudentCourses = () => {
    const courses = [
        { title: "Computer Science 101", code: "CS101", progress: "75%" },
        { title: "Mathematics for Computing", code: "MTH102", progress: "60%" },
        { title: "Web Development", code: "WD103", progress: "90%" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">My Courses</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                    >
                        <FaBookOpen className="text-blue-600 text-4xl mb-4" />
                        <h2 className="text-xl font-bold">{course.title}</h2>
                        <p className="text-gray-600 mb-4">{course.code}</p>

                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-blue-600 h-3 rounded-full"
                                style={{ width: course.progress }}
                            ></div>
                        </div>

                        <p className="mt-2 text-gray-700">{course.progress} Complete</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentCourses;

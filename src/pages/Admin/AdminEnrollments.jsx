import { useEffect, useState } from "react";
import fetch from "../../fetch"; // custom axios wrapper
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";

export default function AdminEnroll() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);

    const [selected, setSelected] = useState({ studentId: "", courseId: "" });
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    // MAIN DATA LOADER
    const load = async () => {
        try {
            setPageLoading(true);

            const [s, c, e] = await Promise.all([
                fetch.get("/students"),
                fetch.get("/courses"),
                fetch.get("/enrollments"),
            ]);

            setStudents(s.data?.body || s.data?.students || []);
            setCourses(c.data?.body || c.data?.courses || []);
            setEnrollments(e.data?.body || e.data?.enrollments || []);

        } catch (err) {
            console.error(err);
            toast.error("Failed to load enrollment data");
        } finally {
            setPageLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    // ENROLL ACTION
    const enroll = async () => {
        if (!selected.studentId || !selected.courseId) {
            toast.error("Please select both student and course");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch.post("/enrollments/admin/enroll", {
                studentId: selected.studentId,
                courseId: selected.courseId,
            });

            if (res.data?.ok) {
                toast.success("Student enrolled successfully");

                setSelected({ studentId: "", courseId: "" });
                load(); // refresh data
            } else {
                toast.error(res.data?.message || "Failed to enroll");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Enrollment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-6xl mx-auto">

                <h2 className="text-2xl font-bold mb-4">Admin Enrollment</h2>

                {/* PAGE LOADING */}
                {pageLoading ? (
                    <p className="text-gray-600">Loading data...</p>
                ) : (
                    <>
                        {/* SELECTION AREA */}
                        <div className="grid md:grid-cols-3 gap-3 mb-6">

                            {/* STUDENT SELECT */}
                            <select
                                value={selected.studentId}
                                onChange={(e) =>
                                    setSelected({ ...selected, studentId: e.target.value })
                                }
                                className="p-2 border rounded"
                            >
                                <option value="">Select Student</option>
                                {students.map((s) => (
                                    <option key={s._id} value={s._id}>
                                        {s.name} ({s.email})
                                    </option>
                                ))}
                            </select>

                            {/* COURSE SELECT */}
                            <select
                                value={selected.courseId}
                                onChange={(e) =>
                                    setSelected({ ...selected, courseId: e.target.value })
                                }
                                className="p-2 border rounded"
                            >
                                <option value="">Select Course</option>
                                {courses.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.title}
                                    </option>
                                ))}
                            </select>

                            {/* ENROLL BUTTON */}
                            <button
                                onClick={enroll}
                                disabled={loading}
                                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                            >
                                {loading ? "Enrolling..." : "Enroll"}
                            </button>
                        </div>

                        {/* ENROLLMENTS LIST */}
                        <div className="bg-white p-4 rounded shadow mt-4">
                            <h3 className="font-semibold mb-3 text-lg">Enrollments</h3>

                            {enrollments.length === 0 ? (
                                <p className="text-gray-600">No enrollments found</p>
                            ) : (
                                <ul className="space-y-2">
                                    {enrollments.map((en) => (
                                        <li
                                            key={en._id}
                                            className="border-b pb-2 flex justify-between items-center"
                                        >
                                            <span>
                                                <strong>{en.student?.name}</strong> enrolled in{" "}
                                                <strong>{en.course?.title}</strong>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                )}
            </div>
        </AdminLayout>
    );
}

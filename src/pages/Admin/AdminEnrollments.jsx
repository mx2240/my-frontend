import { useEffect, useState } from "react";
import fetch from "../../fetch";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";

export default function AdminEnroll() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);

    const [selected, setSelected] = useState({ studentId: "", courseId: "" });
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

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
        } catch {
            toast.error("Failed to load enrollment data");
        } finally {
            setPageLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const enroll = async () => {
        if (!selected.studentId || !selected.courseId) {
            toast.error("Please select both student and course");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch.post("/enrollments/admin/enroll", selected);

            if (res.data?.ok) {
                toast.success("Student enrolled successfully");
                setSelected({ studentId: "", courseId: "" });
                load();
            } else {
                toast.error(res.data?.message || "Enrollment failed");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Enrollment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-7xl mx-auto space-y-8">

                {/* PAGE HEADER */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Student Enrollment
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Assign students to courses
                    </p>
                </div>

                {pageLoading ? (
                    <div className="text-gray-500">Loading enrollment data...</div>
                ) : (
                    <>
                        {/* ENROLL CARD */}
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                New Enrollment
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* STUDENT */}
                                <select
                                    value={selected.studentId}
                                    onChange={(e) =>
                                        setSelected({ ...selected, studentId: e.target.value })
                                    }
                                    className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Select Student</option>
                                    {students.map((s) => (
                                        <option key={s._id} value={s._id}>
                                            {s.name} ({s.email})
                                        </option>
                                    ))}
                                </select>

                                {/* COURSE */}
                                <select
                                    value={selected.courseId}
                                    onChange={(e) =>
                                        setSelected({ ...selected, courseId: e.target.value })
                                    }
                                    className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Select Course</option>
                                    {courses.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.title}
                                        </option>
                                    ))}
                                </select>

                                {/* BUTTON */}
                                <button
                                    onClick={enroll}
                                    disabled={loading}
                                    className="bg-green-600 text-white rounded-lg px-6 py-3 hover:bg-green-700 disabled:opacity-50"
                                >
                                    {loading ? "Enrolling..." : "Enroll Student"}
                                </button>
                            </div>
                        </div>

                        {/* ENROLLMENTS LIST */}
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Enrolled Students
                            </h2>

                            {enrollments.length === 0 ? (
                                <p className="text-gray-500">
                                    No enrollments found.
                                </p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm">
                                        <thead>
                                            <tr className="border-b text-gray-600">
                                                <th className="text-left py-2 px-3">Student</th>
                                                <th className="text-left py-2 px-3">Email</th>
                                                <th className="text-left py-2 px-3">Course</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {enrollments.map((en) => (
                                                <tr
                                                    key={en._id}
                                                    className="border-b hover:bg-gray-50"
                                                >
                                                    <td className="py-3 px-3 font-medium">
                                                        {en.student?.name}
                                                    </td>
                                                    <td className="py-3 px-3 text-gray-600">
                                                        {en.student?.email}
                                                    </td>
                                                    <td className="py-3 px-3">
                                                        {en.course?.title}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </AdminLayout>
    );
}

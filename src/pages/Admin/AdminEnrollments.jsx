import { useEffect, useState } from "react";
import fetch from "../../fetch";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";

export default function AdminEnroll() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);

    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [loading, setLoading] = useState(false);

    // Load students, courses, enrollments
    useEffect(() => {
        loadStudents();
        loadCourses();
        loadEnrollments();
    }, []);

    const loadStudents = async () => {
        try {
            const res = await api.get("/students"); // ✅ correct route
            if (res.data.ok) setStudents(res.data.body);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load students");
        }
    };

    const loadCourses = async () => {
        try {
            const res = await api.get("/courses"); // ✅ ensure this matches your backend route
            setCourses(res.data.body || []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load courses");
        }
    };

    const loadEnrollments = async () => {
        try {
            const res = await api.get("/enrollments"); // ✅ ensure route exists
            setEnrollments(res.data.body || []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load enrollments");
        }
    };


    return (
        <AdminLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Admin Enrollment</h2>
                <div className="grid md:grid-cols-3 gap-3 mb-6">
                    <select value={selected.studentId} onChange={e => setSelected({ ...selected, studentId: e.target.value })} className="p-2 border rounded">
                        <option value="">Select student</option>
                        {students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)}
                    </select>
                    <select value={selected.courseId} onChange={e => setSelected({ ...selected, courseId: e.target.value })} className="p-2 border rounded">
                        <option value="">Select course</option>
                        {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>
                    <button onClick={enroll} disabled={loading} className="bg-green-600 text-white p-2 rounded">{loading ? "Enrolling..." : "Enroll"}</button>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold mb-2">Enrollments</h3>
                    {enrollments.length === 0 ? <p>No enrollments</p> : (
                        <ul>{enrollments.map(en => <li key={en._id}>{en.student?.name} — {en.course?.title}</li>)}</ul>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

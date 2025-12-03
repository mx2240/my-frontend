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

    const load = async () => {
        try {
            const res = await fetch.get(`/students`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.ok) setStudents(res.data.students);

            const c = await fetch.get("/courses"); // ensure /courses returns list
            setCourses(c.data?.body || c.data || []);
            const e = await fetch.get("/enrollments");
            setEnrollments(e.data?.body || e.data || []);
        } catch (err) { console.error(err); toast.error("Load failed"); }
    };

    useEffect(() => { load(); }, []);

    const enroll = async () => {
        if (!selected.studentId || !selected.courseId) return toast.error("Select both");
        try {
            setLoading(true);
            const res = await fetch.post("/enrollments/admin/enroll", { studentId: selected.studentId, courseId: selected.courseId });
            if (res.data?.ok) {
                toast.success("Enrolled");
                setSelected({ studentId: "", courseId: "" });
                load();
            } else toast.error(res.data?.message || "Failed");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed");
        } finally { setLoading(false); }
    }

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

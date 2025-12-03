// import { useEffect, useState } from "react";
// import fetch from "../../fetch";
// import toast from "react-hot-toast";
// import AdminLayout from "../../layouts/AdminLayout";

// export default function AdminEnroll() {
//     const [students, setStudents] = useState([]);
//     const [courses, setCourses] = useState([]);
//     const [enrollments, setEnrollments] = useState([]);
//     const [selected, setSelected] = useState({ studentId: "", courseId: "" });
//     const [loading, setLoading] = useState(false);

//     const load = async () => {
//         try {
//             const s = await fetch.get(`/students`);
//             setStudents(s.data?.body || []);
//             const c = await fetch.get("/courses"); // ensure /courses returns list
//             setCourses(c.data?.body || c.data || []);
//             const e = await fetch.get("/enrollments");
//             setEnrollments(e.data?.body || e.data || []);
//         } catch (err) { console.error(err); toast.error("Load failed"); }
//     };

//     useEffect(() => { load(); }, []);

//     const enroll = async () => {
//         if (!selected.studentId || !selected.courseId) return toast.error("Select both");
//         try {
//             setLoading(true);
//             const res = await fetch.post("/enrollments/admin/enroll", { studentId: selected.studentId, courseId: selected.courseId });
//             if (res.data?.ok) {
//                 toast.success("Enrolled");
//                 setSelected({ studentId: "", courseId: "" });
//                 load();
//             } else toast.error(res.data?.message || "Failed");
//         } catch (err) {
//             console.error(err);
//             toast.error(err.response?.data?.message || "Failed");
//         } finally { setLoading(false); }
//     }

//     return (
//         <AdminLayout>
//             <div className="p-6 max-w-6xl mx-auto">
//                 <h2 className="text-2xl font-bold mb-4">Admin Enrollment</h2>
//                 <div className="grid md:grid-cols-3 gap-3 mb-6">
//                     <select value={selected.studentId} onChange={e => setSelected({ ...selected, studentId: e.target.value })} className="p-2 border rounded">
//                         <option value="">Select student</option>
//                         {students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)}
//                     </select>
//                     <select value={selected.courseId} onChange={e => setSelected({ ...selected, courseId: e.target.value })} className="p-2 border rounded">
//                         <option value="">Select course</option>
//                         {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
//                     </select>
//                     <button onClick={enroll} disabled={loading} className="bg-green-600 text-white p-2 rounded">{loading ? "Enrolling..." : "Enroll"}</button>
//                 </div>

//                 <div className="bg-white p-4 rounded shadow">
//                     <h3 className="font-semibold mb-2">Enrollments</h3>
//                     {enrollments.length === 0 ? <p>No enrollments</p> : (
//                         <ul>{enrollments.map(en => <li key={en._id}>{en.student?.name} — {en.course?.title}</li>)}</ul>
//                     )}
//                 </div>
//             </div>
//         </AdminLayout>
//     );
// }



import React, { useEffect, useState } from "react";
import fetch from "../../fetch";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";

const API_BASE = "https://my-backend-amber.vercel.app";


function AdminEnrollmentPage() {
    const [loading, setLoading] = useState(true);

    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);

    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedClass, setSelectedClass] = useState("");

    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        fetchData();
    }, []);

    // LOAD Students + Classes
    const fetchData = async () => {
        try {
            const [studentRes, classRes] = await Promise.all([
                fetch.get(`${API_BASE}/api/admin/students`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch.get(`${API_BASE}/api/admin/classes`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            if (studentRes.data.ok) setStudents(studentRes.data.students);
            if (classRes.data.ok) setClasses(classRes.data.classes);

        } catch (err) {
            console.error(err);
            toast.error("Unable to load enrollment data");
        } finally {
            setLoading(false);
        }
    };

    // SUBMIT Enrollment
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedStudent || !selectedClass) {
            toast.error("Please select both student and class");
            return;
        }

        try {
            const res = await fetch.post(
                `${API_BASE}/api/admin/enroll`,
                {
                    studentId: selectedStudent,
                    classId: selectedClass,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data.ok) {
                toast.success("Student successfully enrolled");
                setSelectedStudent("");
                setSelectedClass("");
            }
        } catch (err) {
            console.error(err.response?.data || err);
            toast.error("Unable to enroll student");
        }
    };

    if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

    return (
        <AdminLayout>
            <div style={styles.container}>
                <h2 style={styles.title}>Admin Enrollment</h2>

                <form style={styles.form} onSubmit={handleSubmit}>
                    {/* STUDENT SELECT */}
                    <label style={styles.label}>Select Student</label>
                    <select
                        style={styles.select}
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                    >
                        <option value="">-- Choose Student --</option>
                        {students.map((student) => (
                            <option key={student._id} value={student._id}>
                                {student.firstName} {student.lastName} ({student.email})
                            </option>
                        ))}
                    </select>

                    {/* CLASS SELECT */}
                    <label style={styles.label}>Select Class</label>
                    <select
                        style={styles.select}
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        <option value="">-- Choose Class --</option>
                        {classes.map((cls) => (
                            <option key={cls._id} value={cls._id}>
                                {cls.name}
                            </option>
                        ))}
                    </select>

                    <button style={styles.button} type="submit">
                        Enroll Student
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}

const styles = {
    container: {
        padding: "30px",
        maxWidth: "600px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    },
    title: {
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    label: {
        fontWeight: "bold",
    },
    select: {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "12px",
        background: "#2F80ED",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
    },
};

export default AdminEnrollmentPage;

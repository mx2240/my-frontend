import { useEffect, useState } from "react";
import api from "../../fetch"; // your axios instance
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
            const res = await api.get("/admin/students/all"); // ✅ correct route
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

    const handleEnroll = async () => {
        if (!selectedStudent || !selectedCourse)
            return toast.error("Select student & course");

        try {
            setLoading(true);

            const res = await api.post("/enrollments/admin/enroll", { // ✅ ensure route exists
                studentId: selectedStudent,
                courseId: selectedCourse,
            });

            toast.success("Enrollment successful!");
            loadEnrollments();
            setSelectedStudent("");
            setSelectedCourse("");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Enrollment failed");
        } finally {
            setLoading(false);
        }
    };

    return (


        <AdminLayout>


            <div style={styles.container}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Admin Enrollment</h2>

                    {/* Select Student */}
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        style={styles.input}
                    >
                        <option value="">Select Student</option>
                        {students.map((s) => (
                            <option key={s._id} value={s._id}>
                                {s.name} ({s.email})
                            </option>
                        ))}
                    </select>

                    {/* Select Course */}
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        style={styles.input}
                    >
                        <option value="">Select Course</option>
                        {courses.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.title}
                            </option>
                        ))}
                    </select>

                    <button
                        style={styles.button}
                        onClick={handleEnroll}
                        disabled={loading}
                    >
                        {loading ? "Enrolling..." : "Enroll Student"}
                    </button>
                </div>

                {/* ENROLLMENTS LIST */}
                <div style={styles.tableCard}>
                    <h3>All Enrollments</h3>

                    {enrollments.length === 0 ? (
                        <p>No enrollments yet.</p>
                    ) : (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Course</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.map((en) => (
                                    <tr key={en._id}>
                                        <td>{en.student?.name || en.studentName}</td>
                                        <td>{en.course?.title || en.courseTitle}</td>
                                        <td>{new Date(en.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

const styles = {
    container: {
        display: "flex",
        padding: "20px",
        gap: "20px",
        flexWrap: "wrap",
    },
    card: {
        width: "350px",
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    tableCard: {
        flex: 1,
        minWidth: "500px",
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    title: { textAlign: "center" },
    input: {
        padding: "12px",
        border: "1px solid #ccc",
        borderRadius: "8px",
    },
    button: {
        padding: "12px",
        background: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
};

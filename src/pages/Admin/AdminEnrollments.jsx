import { useEffect, useState } from "react";
import api from "../../fetch";   // <-- ensure this is your axios instance
import toast from "react-hot-toast";

export default function AdminEnroll() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);

    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadStudents();
        loadCourses();
        loadEnrollments();
    }, []);

    // ----------------------
    // LOAD STUDENTS (SAFE)
    // ----------------------
    const loadStudents = async () => {
        try {
            const res = await api.get("/admin/students/all");

            setStudents(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load students");
            setStudents([]); // prevent undefined
        }
    };

    // ----------------------
    // LOAD COURSES (SAFE)
    // ----------------------
    const loadCourses = async () => {
        try {
            const res = await api.get("/courses");

            setCourses(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load courses");
            setCourses([]); // prevent undefined
        }
    };

    // ----------------------
    // LOAD ENROLLMENTS (SAFE)
    // ----------------------
    const loadEnrollments = async () => {
        try {
            const res = await api.get("/enrollments");

            setEnrollments(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load enrollments");
            setEnrollments([]);
        }
    };

    // ----------------------
    // HANDLE ENROLL
    // ----------------------
    const handleEnroll = async () => {
        if (!selectedStudent || !selectedCourse)
            return toast.error("Select student & course");

        try {
            setLoading(true);

            await api.post("/enrollments/admin/enroll", {
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

    // ----------------------
    // UI
    // ----------------------
    return (
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

                    {(students || []).map((s) => (
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

                    {(courses || []).map((c) => (
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

            {/* ENROLLMENTS TABLE */}
            <div style={styles.tableCard}>
                <h3>All Enrollments</h3>

                {(enrollments || []).length === 0 ? (
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
                            {(enrollments || []).map((en) => (
                                <tr key={en._id}>
                                    <td>{en.student?.name || "N/A"}</td>
                                    <td>{en.course?.title || "N/A"}</td>
                                    <td>
                                        {en.createdAt
                                            ? new Date(en.createdAt).toLocaleDateString()
                                            : "N/A"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

// ----------------------
// STYLES
// ----------------------
const styles = {
    container: {
        display: "flex",
        padding: "20px",
        gap: "20px",
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

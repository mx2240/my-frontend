import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminAddStudent() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        studentClass: "",
        phone: "",
    });

    // -------------------------
    // Load all students
    // -------------------------
    const loadStudents = async () => {
        try {
            const res = await axios.get("/api/admin/students"); // ✅ matches admin route
            if (res.data.ok) setStudents(res.data.body);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load students");
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    // -------------------------
    // Handle input change
    // -------------------------
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // -------------------------
    // Add a new student
    // -------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email)
            return toast.error("Name and Email are required");

        try {
            setLoading(true);
            const res = await axios.post("/api/student", formData); // ✅ matches POST route

            toast.success("Student added successfully");

            // Reset form
            setFormData({
                name: "",
                email: "",
                password: "",
                studentClass: "",
                phone: "",
            });

            // Reload students list
            loadStudents();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to add student");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Admin: Add Student</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password (optional)"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="text"
                    name="studentClass"
                    placeholder="Class"
                    value={formData.studentClass}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={styles.input}
                />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Adding..." : "Add Student"}
                </button>
            </form>

            <h3 style={{ marginTop: "30px" }}>All Students</h3>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Class</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center" }}>
                                No students found
                            </td>
                        </tr>
                    ) : (
                        students.map((s) => (
                            <tr key={s._id}>
                                <td>{s.name}</td>
                                <td>{s.email}</td>
                                <td>{s.studentClass || "-"}</td>
                                <td>{s.phone || "-"}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" },
    input: { padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" },
    button: { padding: "10px", background: "#2563eb", color: "#fff", borderRadius: "6px", cursor: "pointer", border: "none", fontSize: "16px" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "15px" },
};

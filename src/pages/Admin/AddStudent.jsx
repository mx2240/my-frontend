import { useState, useEffect } from "react";
import fetch from "../../fetch";
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

    // Fetch all students for table
    const loadStudents = async () => {
        try {
            const res = await fetch.get("/admin/students");
            if (res.data.ok) setStudents(res.data.students);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load students");
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email)
            return toast.error("Name and email are required");

        try {
            setLoading(true);
            const res = await fetch.post("/admin/students", formData);

            if (res.data.ok) {
                toast.success("Student added successfully");
                setFormData({ name: "", email: "", password: "", studentClass: "", phone: "" });
                loadStudents(); // refresh table
            }
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
                                <td>{s.name || s.user?.name}</td>
                                <td>{s.email || s.user?.email}</td>
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
    th: { borderBottom: "1px solid #ccc", padding: "8px", textAlign: "left" },
    td: { borderBottom: "1px solid #eee", padding: "8px" },
};

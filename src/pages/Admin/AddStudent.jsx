import { useState, useEffect } from "react";
import api from '../../fetch'
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

    // Fetch all students
    const loadStudents = async () => {
        try {
            const res = await api.get("/admin/students"); // ✅ FIXED
            if (res.data.ok) {
                setStudents(res.data.body); // backend returns body
            }
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

            const res = await api.post("/students", formData); // ✅ FIXED

            toast.success("Student added successfully");
            setFormData({
                name: "",
                email: "",
                password: "",
                studentClass: "",
                phone: "",
            });

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
                    placeholder="Password"
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
                            <td colSpan={4}>No students found</td>
                        </tr>
                    ) : (
                        students.map((s) => (
                            <tr key={s._id}>
                                <td>{s.name}</td>
                                <td>{s.email}</td>
                                <td>{s.studentClass}</td>
                                <td>{s.phone}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    form: { display: "flex", flexDirection: "column", gap: "10px" },
    input: { padding: "10px", borderRadius: "6px", border: "1px solid #ccc" },
    button: { padding: "10px", background: "#2563eb", color: "#fff", borderRadius: "6px" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
};


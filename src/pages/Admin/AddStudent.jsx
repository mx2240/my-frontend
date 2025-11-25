import React, { useState, useEffect } from "react";
import fetch from '../../fetch'

function StudentPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        studentClass: "",
        phone: ""
    });
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        const res = await fetch.get("/student");
        setStudents(res.data.students || []);
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await fetch.post("/api/students", form);
            setMessage(res.data.message);
            setForm({ name: "", email: "", studentClass: "", phone: "" });
            loadStudents();
        } catch (err) {
            setMessage(err.response?.data?.message || "Error occurred");
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px" }}>
            <h2>Add Student</h2>

            {message && (
                <p style={{
                    background: "#eee",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "10px"
                }}>
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>
                <input type="text" name="name" placeholder="Student Name"
                    value={form.name} onChange={handleChange} required />

                <input type="email" name="email" placeholder="Email"
                    value={form.email} onChange={handleChange} required />

                <input type="text" name="studentClass" placeholder="Class"
                    value={form.studentClass} onChange={handleChange} />

                <input type="text" name="phone" placeholder="Phone"
                    value={form.phone} onChange={handleChange} />

                <button style={{
                    padding: "10px",
                    background: "black",
                    color: "white",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}>
                    Add Student
                </button>
            </form>

            <hr style={{ margin: "20px 0" }} />

            <h3>All Students</h3>

            <ul>
                {students.map(s => (
                    <li key={s._id}>
                        {s.name} — {s.email} — {s.studentClass}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudentPage;

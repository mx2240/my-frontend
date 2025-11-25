import { useState } from "react";
import { apiPost } from "../lib/api";
import toast from "react-hot-toast";

export default function AddStudent() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        studentId: "",
        classLevel: "",
        phone: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await apiPost("/students", form);

        if (res.error) {
            toast.error(res.message);
        } else {
            toast.success("Student added successfully");
            setForm({
                fullName: "",
                email: "",
                studentId: "",
                classLevel: "",
                phone: "",
            });
        }
    };

    return (
        <div>
            <h2>Add Student</h2>

            <form onSubmit={handleSubmit}>
                <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required />
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
                <input name="studentId" value={form.studentId} onChange={handleChange} placeholder="Student ID" required />
                <input name="classLevel" value={form.classLevel} onChange={handleChange} placeholder="Class Level" required />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />

                <button type="submit">Add Student</button>
            </form>
        </div>
    );
}

import React, { useState } from "react";
import fetch from '../fetch'
import "./AddStudent.css";

export default function AddStudent() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        gender: "",
        classLevel: "",
        age: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");

            const res = await fetch.post(
                "/students",
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage("Student Registered Successfully ✔");
            setForm({
                fullName: "",
                email: "",
                gender: "",
                classLevel: "",
                age: "",
            });
        } catch (err) {
            console.error(err);

            if (err.response?.data?.message === "Duplicate value") {
                setMessage("⚠ Email already exists");
            } else {
                setMessage("❌ Failed to register student");
            }
        }

        setLoading(false);
    };

    return (
        <div className="add-student-container">
            <h2>Add New Student</h2>

            {message && <div className="alert">{message}</div>}

            <form onSubmit={submitForm} className="student-form">

                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Class Level</label>
                    <input
                        type="text"
                        name="classLevel"
                        value={form.classLevel}
                        onChange={handleChange}
                        placeholder="Example: JHS 1, SHS 2"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Age</label>
                    <input
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                    />
                </div>
                <a href="/login">already have account login</a>

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Register Student"}
                </button>

            </form>
        </div>
    );
}

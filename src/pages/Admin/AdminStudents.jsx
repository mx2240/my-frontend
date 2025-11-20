// src/pages/Admin/AdminStudents.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from '../../layouts/AdminLayout'

const AdminStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch students from backend
        const token = localStorage.getItem("token");
        async function fetchStudents() {
            try {
                const res = await fetch("/api/student/all", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setStudents(data || []);
            } catch (err) {
                console.error("Failed to load students", err);
            }
        }
        fetchStudents();
    }, []);

    return (
        <AdminLayout>
            <div className="admin-students-page">
                <h1>Students Management</h1>
                <table className="students-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Enrolled Courses</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student._id}>
                                <td>{student._id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.courses?.length || 0}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {students.length === 0 && (
                            <tr>
                                <td colSpan="5">No students found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default AdminStudents;

import React, { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import fetch from "../../fetch";
import toast from "react-hot-toast";

export default function StudentPage() {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            setLoading(true);
            const res = await fetch.get("/student/profile/me");

            if (res.data.ok) {
                setStudent(res.data.student);
            } else {
                toast.error("Failed to load student profile");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error loading student profile");
        } finally {
            setLoading(false);
        }
    }

    return (
        <StudentLayout>
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

                {loading ? (
                    <div className="p-4 bg-white rounded shadow">Loading profile...</div>
                ) : (
                    <>
                        {/* Student Info Card */}
                        <div className="bg-white shadow rounded p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4">Welcome, {student?.name}</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <p><strong>Email:</strong> {student?.email}</p>
                                <p><strong>Class:</strong> {student?.studentClass || "Not set"}</p>
                                <p><strong>Phone:</strong> {student?.phone || "Not set"}</p>
                                <p><strong>Joined:</strong> {new Date(student?.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <a
                                href="/student/profile"
                                className="bg-blue-600 text-white p-5 rounded shadow hover:bg-blue-700 transition"
                            >
                                <h3 className="text-lg font-semibold mb-1">Profile</h3>
                                <p>View & update your details</p>
                            </a>

                            <a
                                href="/student/fees"
                                className="bg-green-600 text-white p-5 rounded shadow hover:bg-green-700 transition"
                            >
                                <h3 className="text-lg font-semibold mb-1">Fees</h3>
                                <p>Check assigned fees & payments</p>
                            </a>

                            <a
                                href="/student/results"
                                className="bg-purple-600 text-white p-5 rounded shadow hover:bg-purple-700 transition"
                            >
                                <h3 className="text-lg font-semibold mb-1">Results</h3>
                                <p>View academic results</p>
                            </a>
                        </div>
                    </>
                )}
            </div>
        </StudentLayout>
    );
}

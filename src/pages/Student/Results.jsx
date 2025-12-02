import React, { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import fetch from "../../fetch";
import toast from "react-hot-toast";

export default function Results() {
    const [results, setResults] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch.get("/student/results"); // create backend if needed
                if (res.data.ok) setResults(res.data.results);
            } catch (err) {
                // fallback: no results endpoint
                console.error(err);
            }
        })();
    }, []);

    return (
        <StudentLayout>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Results</h2>
                {results.length === 0 ? (
                    <div className="bg-white p-4 rounded shadow">No results yet.</div>
                ) : (
                    <table className="w-full bg-white rounded shadow">
                        <thead><tr><th>Course</th><th>Score</th><th>Grade</th></tr></thead>
                        <tbody>
                            {results.map(r => (
                                <tr key={r._id}><td>{r.courseTitle}</td><td>{r.score}</td><td>{r.grade}</td></tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </StudentLayout>
    );
}

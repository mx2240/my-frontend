import React, { useContext, useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { AuthContext } from "../../context/AuthProvider";

const Timetable = () => {
    const { token } = useContext(AuthContext);
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/timetable/my", { headers: { Authorization: `Bearer ${token}` } });
                const data = await res.json();
                setSlots(Array.isArray(data) ? data : []);
            } catch (err) { console.error(err); }
        })();
    }, [token]);

    return (
        <StudentLayout>
            <h2 className="text-xl font-semibold mb-4">Timetable</h2>
            <div className="bg-white p-4 rounded shadow">
                {slots.length === 0 && <p className="text-gray-500">No timetable available</p>}
                {slots.map(s => (
                    <div key={s._id} className="flex justify-between border-b last:border-b-0 py-2">
                        <div>
                            <div className="font-semibold">{s.courseTitle}</div>
                            <div className="text-sm text-gray-500">{s.day} • {s.time}</div>
                        </div>
                        <div className="text-sm text-gray-500">{s.location || 'Online'}</div>
                    </div>
                ))}
            </div>
        </StudentLayout>
    );
};
export default Timetable;


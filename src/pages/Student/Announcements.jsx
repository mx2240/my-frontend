import React, { useEffect, useState, useContext } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { AuthContext } from "../../context/AuthProvider";

const Announcements = () => {
    const { token } = useContext(AuthContext);
    const [items, setItems] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/announcements", { headers: { Authorization: `Bearer ${token}` } });
                const data = await res.json();
                setItems(Array.isArray(data) ? data : []);
            } catch (err) { console.error(err); }
        })();
    }, [token]);

    return (
        <StudentLayout>
            <h2 className="text-xl font-semibold mb-4">Announcements</h2>
            <div className="space-y-4">
                {items.length === 0 && <div className="p-4 bg-white rounded shadow">No announcements</div>}
                {items.map(a => (
                    <div key={a._id} className="p-4 bg-white rounded shadow">
                        <div className="flex justify-between">
                            <h3 className="font-semibold">{a.title}</h3>
                            <span className="text-sm text-gray-400">{new Date(a.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{a.message}</p>
                    </div>
                ))}
            </div>
        </StudentLayout>
    );
};
export default Announcements;

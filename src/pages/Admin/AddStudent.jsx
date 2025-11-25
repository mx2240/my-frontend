import { useEffect, useState } from "react";
import fetch from "../../fetch";
import toast from "react-hot-toast";

export default function AdminAddStudent() {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", password: "", studentClass: "", phone: "" });
    const [loading, setLoading] = useState(false);

    const load = async () => {
        try {
            const res = await fetch.get("/admin/students/all");
            if (res.data && res.data.ok) setStudents(res.data.body || []);
            else if (res.data && Array.isArray(res.data)) setStudents(res.data); // fallback
        } catch (err) { console.error(err); toast.error("Failed to load students"); }
    };

    useEffect(() => { load(); }, []);

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email) return toast.error("Name & email required");
        try {
            setLoading(true);
            const res = await fetch.post("/admin/students", form);
            if (res.data?.ok) {
                toast.success("Student created");
                setForm({ name: "", email: "", password: "", studentClass: "", phone: "" });
                load();
            } else {
                toast.error(res.data?.message || "Failed");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to add student");
        } finally { setLoading(false); }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Student</h2>
            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <input value={form.name} name="name" onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="p-2 border rounded" />
                <input value={form.email} name="email" onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className="p-2 border rounded" />
                <input value={form.password} name="password" onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password (optional)" className="p-2 border rounded" />
                <input value={form.studentClass} name="studentClass" onChange={e => setForm({ ...form, studentClass: e.target.value })} placeholder="Class" className="p-2 border rounded" />
                <input value={form.phone} name="phone" onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="p-2 border rounded" />
                <button className="col-span-2 bg-blue-600 text-white p-2 rounded" disabled={loading}>{loading ? "Adding..." : "Add Student"}</button>
            </form>

            <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-3">All Students</h3>
                {students.length === 0 ? <p>No students</p> : (
                    <ul>
                        {students.map(s => <li key={s._id}>{s.name} — {s.email}</li>)}
                    </ul>
                )}
            </div>
        </div>
    );
}

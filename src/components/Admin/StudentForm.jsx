import React, { useEffect, useState } from "react";
import fetch from "../../fetch";
import toast from "react-hot-toast";

export default function StudentForm({ student, onClose, onSave }) {
    const [form, setForm] = useState({ name: "", email: "", studentClass: "", phone: "" });
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (student) setForm({
            name: student.name || "",
            email: student.email || "",
            studentClass: student.studentClass || "",
            phone: student.phone || ""
        });
        else setForm({ name: "", email: "", studentClass: "", phone: "" });
        setErrors({});
    }, [student]);

    const validateLocal = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.email.trim()) e.email = "Email is required";
        // simple email pattern
        if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
        return e;
    };

    const submit = async (e) => {
        e.preventDefault();
        const local = validateLocal();
        if (Object.keys(local).length) {
            setErrors(local);
            return;
        }

        setSaving(true);
        const token = localStorage.getItem("token");
        try {
            const url = student ? `/admin/students/${student._id}` : "/admin/students";
            const method = student ? "put" : "post";
            const res = await fetch({
                method,
                url,
                data: form,
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success(res.data.message || "Saved");
            setSaving(false);
            onSave && onSave(res.data.student || res.data);
        } catch (err) {
            setSaving(false);
            // parse server validation errors if present
            if (err.response && err.response.data) {
                const data = err.response.data;
                if (data.errors && Array.isArray(data.errors)) {
                    const eObj = {};
                    data.errors.forEach(x => { if (x.param) eObj[x.param] = x.msg; });
                    setErrors(eObj);
                }
                toast.error(data.message || "Save failed");
            } else {
                toast.error("Server error");
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
            <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
                <h3 className="text-lg font-semibold mb-4">{student ? "Edit Student" : "Add Student"}</h3>
                <form onSubmit={submit} className="space-y-3">
                    <div>
                        <label className="block text-sm">Name</label>
                        <input className="w-full border rounded px-3 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm">Email</label>
                        <input type="email" className="w-full border rounded px-3 py-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm">Class</label>
                        <input className="w-full border rounded px-3 py-2" value={form.studentClass} onChange={(e) => setForm({ ...form, studentClass: e.target.value })} />
                    </div>

                    <div>
                        <label className="block text-sm">Phone</label>
                        <input className="w-full border rounded px-3 py-2" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
                        <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">{saving ? "Saving..." : "Save"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

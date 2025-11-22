import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api"; // your API wrapper

const AdminAddStudent = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password) {
            toast.error("Fill all required fields");
            return;
        }

        try {
            const res = await api("/auth/register", "POST", form);

            if (!res.ok) {
                toast.error(res.message || "Failed to add student");
                return;
            }

            toast.success(`Student ${res.user.name} added successfully`);
            setForm({ name: "", email: "", password: "", role: "student" });
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">Add Student</h2>
            <form onSubmit={handleAddStudent} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                    required
                />
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                >
                    Add Student
                </button>
            </form>
        </div>
    );
};

export default AdminAddStudent;

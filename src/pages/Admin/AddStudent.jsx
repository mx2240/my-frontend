import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddStudent() {
    const [student, setStudent] = useState({
        name: "",
        email: "",
        phone: "",
        program: "",
    });

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "https://my-backend-amber.vercel.app/api/students",
                student,
                { withCredentials: true }
            );

            toast.success("Student added successfully!");
            setStudent({
                name: "",
                email: "",
                phone: "",
                program: "",
            });
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add student");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Add New Student
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={student.name}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={student.email}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={student.phone}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                        required
                    />

                    <input
                        type="text"
                        name="program"
                        placeholder="Program / Course"
                        value={student.program}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Add Student
                    </button>
                </form>
            </div>
        </div>
    );
}

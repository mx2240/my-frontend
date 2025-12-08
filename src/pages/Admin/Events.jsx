import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import fetch from "../../fetch.js";
import toast from "react-hot-toast";

export default function AdminEventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        image: "",
    });

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const res = await fetch.get("/events");
            if (res.data.ok) setEvents(res.data.events);
        } catch {
            toast.error("Failed to load events");
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setForm({ ...form, image: reader.result });
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        if (!form.title || !form.description || !form.image)
            return toast.error("Title, description & image are required");

        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const res = await fetch.post("/events", form, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.ok) {
                toast.success("Event created");
                setForm({
                    title: "",
                    description: "",
                    date: "",
                    location: "",
                    image: "",
                });
                setPreview(null);
                loadEvents();
            }
        } catch (err) {
            toast.error("Failed to create event");
        } finally {
            setLoading(false);
        }
    };

    const deleteEvent = async (id) => {
        if (!window.confirm("Delete this event?")) return;

        try {
            const token = localStorage.getItem("token");

            const res = await fetch.delete(`/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.ok) {
                toast.success("Event deleted");
                loadEvents();
            }
        } catch {
            toast.error("Failed to delete event");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-6xl mx-auto">

                {/* PAGE TITLE */}
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    📅 Event Management
                </h1>

                {/* CREATE EVENT SECTION */}
                <div className="bg-white shadow-md rounded-xl p-6 mb-10">
                    <h2 className="text-xl font-semibold mb-4">➕ Create New Event</h2>

                    <form onSubmit={handleCreateEvent} className="grid md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            className="input"
                            placeholder="Event Title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                        />

                        <input
                            type="text"
                            className="input"
                            placeholder="Location (optional)"
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                        />

                        <input
                            type="date"
                            className="input"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                        />

                        <textarea
                            className="input md:col-span-2"
                            placeholder="Event Description"
                            rows="3"
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                        ></textarea>

                        {/* IMAGE UPLOAD */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Upload Event Image
                            </label>

                            <input
                                type="file"
                                className="input"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />

                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-40 h-40 object-cover rounded-lg mt-3 border shadow"
                                />
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                        >
                            {loading ? "Creating..." : "Create Event"}
                        </button>
                    </form>
                </div>

                {/* EVENT LIST */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">📋 All Events</h2>

                    {events.length === 0 ? (
                        <p className="text-gray-500">No events available.</p>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-6">
                            {events.map((event) => (
                                <div
                                    key={event._id}
                                    className="bg-white shadow-md rounded-xl p-4 border"
                                >
                                    <img
                                        src={event.image}
                                        alt="Event"
                                        className="w-full h-40 object-cover rounded-lg"
                                    />

                                    <h3 className="text-lg font-semibold mt-3">{event.title}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">
                                        {event.description}
                                    </p>

                                    {event.date && (
                                        <p className="text-gray-500 mt-1 text-sm">
                                            📅 {event.date}
                                        </p>
                                    )}
                                    {event.location && (
                                        <p className="text-gray-500 text-sm">
                                            📍 {event.location}
                                        </p>
                                    )}

                                    <div className="flex justify-between mt-4">

                                        <button
                                            onClick={() => deleteEvent(event._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                        >
                                            Delete
                                        </button>

                                        <button className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700">
                                            Edit
                                        </button>

                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

// // import { useEffect, useState } from "react";
// // import AdminLayout from "../../layouts/AdminLayout.jsx";
// // import fetch from "../../fetch.js";
// // import toast from "react-hot-toast";

// // export default function AdminEventsPage() {
// //     const [events, setEvents] = useState([]);
// //     const [loading, setLoading] = useState(false);

// //     const [form, setForm] = useState({
// //         title: "",
// //         description: "",
// //         date: "",
// //         location: "",
// //         image: "",
// //     });

// //     const [preview, setPreview] = useState(null);

// //     useEffect(() => {
// //         loadEvents();
// //     }, []);

// //     const loadEvents = async () => {
// //         try {
// //             const res = await fetch.get("/events");
// //             if (res.data.ok) setEvents(res.data.events);
// //         } catch {
// //             toast.error("Failed to load events");
// //         }
// //     };

// //     const handleImageUpload = (e) => {
// //         const file = e.target.files[0];
// //         if (!file) return;

// //         const reader = new FileReader();
// //         reader.onloadend = () => {
// //             setForm({ ...form, image: reader.result });
// //             setPreview(reader.result);
// //         };
// //         reader.readAsDataURL(file);
// //     };

// //     const handleCreateEvent = async (e) => {
// //         e.preventDefault();
// //         if (!form.title || !form.description || !form.image)
// //             return toast.error("Title, description & image are required");

// //         try {
// //             setLoading(true);
// //             const token = localStorage.getItem("token");

// //             const res = await fetch.post("/events", form, {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });

// //             if (res.data.ok) {
// //                 toast.success("Event created");
// //                 setForm({
// //                     title: "",
// //                     description: "",
// //                     date: "",
// //                     location: "",
// //                     image: "",
// //                 });
// //                 setPreview(null);
// //                 loadEvents();
// //             }
// //         } catch (err) {
// //             toast.error("Failed to create event");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const deleteEvent = async (id) => {
// //         if (!window.confirm("Delete this event?")) return;

// //         try {
// //             const token = localStorage.getItem("token");

// //             const res = await fetch.delete(`/events/${id}`, {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });

// //             if (res.data.ok) {
// //                 toast.success("Event deleted");
// //                 loadEvents();
// //             }
// //         } catch {
// //             toast.error("Failed to delete event");
// //         }
// //     };

// //     return (
// //         <AdminLayout>
// //             <div className="p-6 max-w-6xl mx-auto">

// //                 {/* PAGE TITLE */}
// //                 <h1 className="text-3xl font-bold mb-6 text-gray-800">
// //                     📅 Event Management
// //                 </h1>

// //                 {/* CREATE EVENT SECTION */}
// //                 <div className="bg-white shadow-md rounded-xl p-6 mb-10">
// //                     <h2 className="text-xl font-semibold mb-4">➕ Create New Event</h2>

// //                     <form onSubmit={handleCreateEvent} className="grid md:grid-cols-2 gap-4">

// //                         <input
// //                             type="text"
// //                             className="input"
// //                             placeholder="Event Title"
// //                             value={form.title}
// //                             onChange={(e) => setForm({ ...form, title: e.target.value })}
// //                         />

// //                         <input
// //                             type="text"
// //                             className="input"
// //                             placeholder="Location (optional)"
// //                             value={form.location}
// //                             onChange={(e) => setForm({ ...form, location: e.target.value })}
// //                         />

// //                         <input
// //                             type="date"
// //                             className="input"
// //                             value={form.date}
// //                             onChange={(e) => setForm({ ...form, date: e.target.value })}
// //                         />

// //                         <textarea
// //                             className="input md:col-span-2"
// //                             placeholder="Event Description"
// //                             rows="3"
// //                             value={form.description}
// //                             onChange={(e) =>
// //                                 setForm({ ...form, description: e.target.value })
// //                             }
// //                         ></textarea>

// //                         {/* IMAGE UPLOAD */}
// //                         <div className="md:col-span-2">
// //                             <label className="block text-sm font-medium text-gray-600 mb-1">
// //                                 Upload Event Image
// //                             </label>

// //                             <input
// //                                 type="file"
// //                                 className="input"
// //                                 accept="image/*"
// //                                 onChange={handleImageUpload}
// //                             />

// //                             {preview && (
// //                                 <img
// //                                     src={preview}
// //                                     alt="Preview"
// //                                     className="w-40 h-40 object-cover rounded-lg mt-3 border shadow"
// //                                 />
// //                             )}
// //                         </div>

// //                         <button
// //                             type="submit"
// //                             disabled={loading}
// //                             className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
// //                         >
// //                             {loading ? "Creating..." : "Create Event"}
// //                         </button>
// //                     </form>
// //                 </div>

// //                 {/* EVENT LIST */}
// //                 <div>
// //                     <h2 className="text-xl font-semibold mb-4">📋 All Events</h2>

// //                     {events.length === 0 ? (
// //                         <p className="text-gray-500">No events available.</p>
// //                     ) : (
// //                         <div className="grid md:grid-cols-3 gap-6">
// //                             {events.map((event) => (
// //                                 <div
// //                                     key={event._id}
// //                                     className="bg-white shadow-md rounded-xl p-4 border"
// //                                 >
// //                                     <img
// //                                         src={event.image}
// //                                         alt="Event"
// //                                         className="w-full h-40 object-cover rounded-lg"
// //                                     />

// //                                     <h3 className="text-lg font-semibold mt-3">{event.title}</h3>
// //                                     <p className="text-gray-600 text-sm line-clamp-2">
// //                                         {event.description}
// //                                     </p>

// //                                     {event.date && (
// //                                         <p className="text-gray-500 mt-1 text-sm">
// //                                             📅 {event.date}
// //                                         </p>
// //                                     )}
// //                                     {event.location && (
// //                                         <p className="text-gray-500 text-sm">
// //                                             📍 {event.location}
// //                                         </p>
// //                                     )}

// //                                     <div className="flex justify-between mt-4">

// //                                         <button
// //                                             onClick={() => deleteEvent(event._id)}
// //                                             className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
// //                                         >
// //                                             Delete
// //                                         </button>

// //                                         <button className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700">
// //                                             Edit
// //                                         </button>

// //                                     </div>

// //                                 </div>
// //                             ))}
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>
// //         </AdminLayout>
// //     );
// // }



// // import React from "react";
// // import fetch from "../../fetch";
// // import toast from "react-hot-toast";
// // import AdminLayout from "../../layouts/AdminLayout";

// // function Events() {
// //     const [events, setEvents] = React.useState([]);
// //     const [editMode, setEditMode] = React.useState(false);
// //     const [selectedId, setSelectedId] = React.useState(null);

// //     const [form, setForm] = React.useState({
// //         title: "",
// //         description: "",
// //         image: "",
// //         date: ""
// //     });

// //     // Load all events
// //     const loadEvents = async () => {
// //         try {
// //             const response = await fetch.get("/events");
// //             setEvents(response.data);
// //         } catch (error) {
// //             toast.error("Failed to load events");
// //         }
// //     };

// //     React.useEffect(() => {
// //         loadEvents();
// //     }, []);

// //     // Handle form input
// //     const handleChange = (e) => {
// //         setForm({ ...form, [e.target.name]: e.target.value });
// //     };

// //     // Submit new event
// //     const handleCreate = async (e) => {
// //         e.preventDefault();

// //         try {
// //             const response = await fetch.post("/events/create", form);
// //             toast.success("Event created!");
// //             setForm({ title: "", description: "", image: "", date: "" });
// //             loadEvents();

// //         } catch (error) {
// //             toast.error(error.response?.data?.message || "Error creating event");
// //         }
// //     };

// //     // Update event
// //     const handleUpdate = async (e) => {
// //         e.preventDefault();

// //         try {
// //             await fetch.put(`/events/${selectedId}`, form);
// //             toast.success("Event updated!");
// //             setForm({ title: "", description: "", image: "", date: "" });
// //             setEditMode(false);
// //             loadEvents();

// //         } catch (error) {
// //             toast.error("Failed to update event");
// //         }
// //     };

// //     // Delete event
// //     const handleDelete = async (id) => {
// //         if (!window.confirm("Delete this event?")) return;

// //         try {
// //             await fetch.delete(`/events/${id}`);
// //             toast.success("Event deleted");
// //             loadEvents();

// //         } catch (error) {
// //             toast.error("Error deleting event");
// //         }
// //     };

// //     // Load event into form for editing
// //     const handleEdit = (event) => {
// //         setEditMode(true);
// //         setSelectedId(event._id);
// //         setForm({
// //             title: event.title,
// //             description: event.description,
// //             image: event.image,
// //             date: event.date || ""
// //         });
// //     };

// //     return (
// //         <AdminLayout>
// //             <div className="p-6">

// //                 <h1 className="text-3xl font-bold mb-6">Manage Events</h1>

// //                 {/* Event Form */}
// //                 <form
// //                     onSubmit={editMode ? handleUpdate : handleCreate}
// //                     className="event-form"
// //                 >
// //                     <h2 className="text-xl font-semibold mb-4">
// //                         {editMode ? "Update Event" : "Add New Event"}
// //                     </h2>

// //                     <input
// //                         type="text"
// //                         name="title"
// //                         placeholder="Event Title"
// //                         value={form.title}
// //                         onChange={handleChange}
// //                         className="input"
// //                     />

// //                     <textarea
// //                         name="description"
// //                         placeholder="Event Description"
// //                         value={form.description}
// //                         onChange={handleChange}
// //                         className="input"
// //                     />

// //                     <input
// //                         type="text"
// //                         name="image"
// //                         placeholder="Image URL"
// //                         value={form.image}
// //                         onChange={handleChange}
// //                         className="input"
// //                     />

// //                     <input
// //                         type="text"
// //                         name="date"
// //                         placeholder="Event Date (optional)"
// //                         value={form.date}
// //                         onChange={handleChange}
// //                         className="input"
// //                     />

// //                     <button className="btn-save">
// //                         {editMode ? "Update Event" : "Create Event"}
// //                     </button>

// //                     {editMode && (
// //                         <button
// //                             type="button"
// //                             className="btn-cancel"
// //                             onClick={() => {
// //                                 setEditMode(false);
// //                                 setForm({ title: "", description: "", image: "", date: "" });
// //                             }}
// //                         >
// //                             Cancel Edit
// //                         </button>
// //                     )}
// //                 </form>

// //                 <hr className="my-6" />

// //                 {/* Events List */}
// //                 <div className="event-list">
// //                     {events.length === 0 ? (
// //                         <p>No events available.</p>
// //                     ) : (
// //                         events.map(event => (
// //                             <div key={event._id} className="event-row">
// //                                 <img src={event.image} alt="" className="event-thumb" />

// //                                 <div className="event-info">
// //                                     <h3>{event.title}</h3>
// //                                     <p>{event.description}</p>
// //                                     {event.date && <small>Date: {event.date}</small>}
// //                                 </div>

// //                                 <div className="event-actions">
// //                                     <button
// //                                         className="btn-edit"
// //                                         onClick={() => handleEdit(event)}
// //                                     >
// //                                         Edit
// //                                     </button>

// //                                     <button
// //                                         className="btn-delete"
// //                                         onClick={() => handleDelete(event._id)}
// //                                     >
// //                                         Delete
// //                                     </button>
// //                                 </div>
// //                             </div>
// //                         ))
// //                     )}
// //                 </div>

// //             </div>
// //         </AdminLayout>
// //     );
// // }

// // export default Events;




// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import AdminLayout from "../../layouts/AdminLayout";
// import fetch from "../../fetch";

// function Events() {
//     const [events, setEvents] = useState([]);
//     const [editMode, setEditMode] = useState(false);
//     const [selectedId, setSelectedId] = useState(null);

//     const [form, setForm] = useState({
//         title: "",
//         description: "",
//         date: "",
//         imageFile: null,
//     });

//     const [preview, setPreview] = useState(null);

//     // Load all events
//     const loadEvents = async () => {
//         try {
//             const res = await fetch.get("/events");
//             setEvents(res.data);
//         } catch (err) {
//             toast.error("Failed to load events");
//         }
//     };

//     useEffect(() => {
//         loadEvents();
//     }, []);

//     // Handle text fields
//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     // Handle image upload
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setForm({ ...form, imageFile: file });

//         if (file) {
//             setPreview(URL.createObjectURL(file));
//         }
//     };

//     // CREATE Event
//     const handleCreate = async (e) => {
//         e.preventDefault();

//         const fd = new FormData();
//         fd.append("title", form.title);
//         fd.append("description", form.description);
//         fd.append("date", form.date);
//         if (form.imageFile) fd.append("image", form.imageFile);

//         try {
//             await fetch.post("/events/create", fd, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             toast.success("Event created!");
//             resetForm();
//             loadEvents();
//         } catch (err) {
//             toast.error("Failed to create event");
//         }
//     };

//     // UPDATE Event
//     const handleUpdate = async (e) => {
//         e.preventDefault();

//         const fd = new FormData();
//         fd.append("title", form.title);
//         fd.append("description", form.description);
//         fd.append("date", form.date);
//         if (form.imageFile) fd.append("image", form.imageFile);

//         try {
//             await fetch.put(`/events/${selectedId}`, fd, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             toast.success("Event updated!");
//             resetForm();
//             loadEvents();
//         } catch (err) {
//             toast.error("Update failed");
//         }
//     };

//     // Delete event
//     const handleDelete = async (id) => {
//         if (!window.confirm("Delete this event?")) return;

//         try {
//             await fetch.delete(`/events/${id}`);
//             toast.success("Event deleted");
//             loadEvents();
//         } catch (err) {
//             toast.error("Error deleting event");
//         }
//     };

//     // Load event into edit form
//     const handleEdit = (event) => {
//         setEditMode(true);
//         setSelectedId(event._id);

//         setForm({
//             title: event.title,
//             description: event.description,
//             date: event.date,
//             imageFile: null,
//         });

//         setPreview(event.image);
//     };

//     const resetForm = () => {
//         setEditMode(false);
//         setSelectedId(null);
//         setForm({
//             title: "",
//             description: "",
//             date: "",
//             imageFile: null,
//         });
//         setPreview(null);
//     };

//     return (
//         <AdminLayout>
//             <div className="p-6">

//                 <h1 className="text-3xl font-bold mb-6">Manage Events</h1>

//                 {/* FORM CARD */}
//                 <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mb-10">
//                     <h2 className="text-xl font-semibold mb-4">
//                         {editMode ? "Update Event" : "Add New Event"}
//                     </h2>

//                     <form onSubmit={editMode ? handleUpdate : handleCreate}>

//                         <input
//                             type="text"
//                             name="title"
//                             placeholder="Event Title"
//                             value={form.title}
//                             onChange={handleChange}
//                             className="w-full p-3 border rounded-lg mb-3"
//                         />

//                         <textarea
//                             name="description"
//                             placeholder="Event Description"
//                             value={form.description}
//                             onChange={handleChange}
//                             className="w-full p-3 border rounded-lg mb-3"
//                         />

//                         <input
//                             type="text"
//                             name="date"
//                             placeholder="Event Date (optional)"
//                             value={form.date}
//                             onChange={handleChange}
//                             className="w-full p-3 border rounded-lg mb-3"
//                         />

//                         {/* Image Upload */}
//                         <input
//                             type="file"
//                             accept="image/*"
//                             onChange={handleImageChange}
//                             className="w-full p-3 border rounded-lg mb-3"
//                         />

//                         {/* Image Preview */}
//                         {preview && (
//                             <img
//                                 src={preview}
//                                 alt="Preview"
//                                 className="w-full h-40 object-cover rounded-lg mb-3 border"
//                             />
//                         )}

//                         <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
//                             {editMode ? "Update Event" : "Create Event"}
//                         </button>

//                         {editMode && (
//                             <button
//                                 type="button"
//                                 onClick={resetForm}
//                                 className="w-full mt-2 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
//                             >
//                                 Cancel Edit
//                             </button>
//                         )}
//                     </form>
//                 </div>

//                 {/* EVENT LIST */}
//                 <h2 className="text-2xl font-semibold mb-4">All Events</h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {events.map((event) => (
//                         <div
//                             key={event._id}
//                             className="bg-white rounded-xl shadow-lg overflow-hidden"
//                         >
//                             <img
//                                 src={event.image}
//                                 alt={event.title}
//                                 className="w-full h-48 object-cover"
//                             />

//                             <div className="p-4">
//                                 <h3 className="font-bold text-lg">{event.title}</h3>
//                                 <p className="text-gray-600">{event.description}</p>

//                                 {event.date && (
//                                     <p className="text-sm text-gray-500 mt-1">
//                                         📅 {event.date}
//                                     </p>
//                                 )}

//                                 <div className="flex gap-3 mt-4">
//                                     <button
//                                         onClick={() => handleEdit(event)}
//                                         className="flex-1 bg-yellow-500 text-white p-2 rounded-lg"
//                                     >
//                                         Edit
//                                     </button>

//                                     <button
//                                         onClick={() => handleDelete(event._id)}
//                                         className="flex-1 bg-red-600 text-white p-2 rounded-lg"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//             </div>
//         </AdminLayout>
//     );
// }

// export default Events;




import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";
import AdminLayout from "../../layouts/AdminLayout";
import fetch from "../../fetch";

export default function AdminEvents() {
    const [events, setEvents] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        imageFile: null,
    });

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // Load events
    const loadEvents = async () => {
        try {
            const res = await fetch.get("/events");
            setEvents(res.data);
        } catch {
            toast.error("Failed to load events");
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    // Form handlers
    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, imageFile: file });
        if (file) setPreview(URL.createObjectURL(file));
    };

    const resetForm = () => {
        setEditMode(false);
        setSelectedId(null);
        setForm({ title: "", description: "", date: "", imageFile: null });
        setPreview(null);
    };

    // Create / Update
    const submitEvent = async (e) => {
        e.preventDefault();
        setLoading(true);

        const fd = new FormData();
        fd.append("title", form.title);
        fd.append("description", form.description);
        fd.append("date", form.date);
        if (form.imageFile) fd.append("image", form.imageFile);

        try {
            if (editMode) {
                await fetch.put(`/events/${selectedId}`, fd);
                toast.success("Event updated");
            } else {
                await fetch.post("/events/create", fd);
                toast.success("Event created");
            }

            resetForm();
            loadEvents();
        } catch {
            toast.error("Action failed");
        } finally {
            setLoading(false);
        }
    };

    // Edit
    const handleEdit = (event) => {
        setEditMode(true);
        setSelectedId(event._id);
        setForm({
            title: event.title,
            description: event.description,
            date: event.date || "",
            imageFile: null,
        });
        setPreview(event.image);
    };

    // Delete
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this event?")) return;
        try {
            await fetch.delete(`/events/${id}`);
            toast.success("Event deleted");
            loadEvents();
        } catch {
            toast.error("Delete failed");
        }
    };

    return (
        <AdminLayout>
            <div className="min-h-[calc(100vh-56px)] bg-gray-50 dark:bg-gray-900 px-4 md:px-6 py-6">

                {/* PAGE HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Events Management
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Create, update and manage school events
                        </p>
                    </div>
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* FORM */}
                    <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-fit">
                        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <FaPlus className="text-blue-600" />
                            {editMode ? "Update Event" : "Create Event"}
                        </h2>

                        <form onSubmit={submitEvent} className="space-y-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Event title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                            />

                            <textarea
                                name="description"
                                placeholder="Event description"
                                value={form.description}
                                onChange={handleChange}
                                rows="3"
                                required
                                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                            />

                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full text-sm"
                            />

                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-40 object-cover rounded-lg border"
                                />
                            )}

                            <button
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                            >
                                {loading
                                    ? "Processing..."
                                    : editMode
                                        ? "Update Event"
                                        : "Create Event"}
                            </button>

                            {editMode && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </form>
                    </div>

                    {/* EVENTS LIST */}
                    <div className="lg:col-span-2">
                        {events.length === 0 ? (
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center text-gray-500">
                                No events created yet
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {events.map((event) => (
                                    <div
                                        key={event._id}
                                        className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden"
                                    >
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-44 object-cover"
                                        />

                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg">
                                                {event.title}
                                            </h3>

                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                {event.description}
                                            </p>

                                            {event.date && (
                                                <p className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                                                    <FaCalendarAlt />
                                                    {event.date}
                                                </p>
                                            )}

                                            <div className="flex gap-2 mt-4">
                                                <button
                                                    onClick={() => handleEdit(event)}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm"
                                                >
                                                    <FaEdit />
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(event._id)}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm"
                                                >
                                                    <FaTrash />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

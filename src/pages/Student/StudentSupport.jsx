import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

const StudentSupport = () => {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        alert("Message sent to admin!");
        setMessage("");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Contact Support</h1>

            <div className="bg-white p-6 rounded-xl shadow">
                <label className="text-gray-700 font-medium">Your Message</label>
                <textarea
                    className="w-full p-4 border rounded-xl mt-2"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue..."
                ></textarea>

                <button
                    onClick={sendMessage}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    <FaEnvelope className="inline mr-2" />
                    Send Message
                </button>
            </div>
        </div>
    );
};

export default StudentSupport;

// src/api.js
const API_URL = import.meta.env.VITE_API_URL; // e.g., https://express-js-on-vercel-mu-orpin.vercel.app/api
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || "token";

export const api = async (endpoint, method = "GET", data = null) => {
    try {
        const token = localStorage.getItem(TOKEN_KEY);

        const headers = {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const options = { method, headers };

        if (data) options.body = JSON.stringify(data);

        console.log("Sending request:", { url: `${API_URL}${endpoint}`, options });

        const res = await fetch(`${API_URL}${endpoint}`, options);

        const text = await res.text();

        let json;
        try {
            json = JSON.parse(text);
        } catch (err) {
            console.error("❌ Server sent non-JSON:", text);
            throw new Error("Invalid JSON from server");
        }

        if (!res.ok) {
            console.error("❌ Server responded with error:", json);
            throw new Error(json.message || `HTTP error ${res.status}`);
        }

        return json;
    } catch (err) {
        console.error("❌ API call failed:", err);
        throw err;
    }
};

export default api;
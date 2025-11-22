// src/api.js
const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || "token";

export const api = async (endpoint, method = "GET", data = null) => {
    try {
        const token = localStorage.getItem(TOKEN_KEY);

        const options = {
            method: method.toUpperCase(),
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: data ? JSON.stringify(data) : undefined,
        };

        const res = await fetch(`${API_URL}${endpoint}`, options);
        const text = await res.text();

        try {
            const json = JSON.parse(text);
            return json; // always returns { ok: true/false, body: ... }
        } catch (err) {
            console.error("❌ Server returned non-JSON:", text);
            return { ok: false, message: "Invalid JSON from server" };
        }
    } catch (err) {
        console.error("❌ API call failed:", err);
        return { ok: false, message: err.message || "API error" };
    }
};

export default api;

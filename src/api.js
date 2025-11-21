// // src/api.js
const API_URL = import.meta.env.VITE_API_URL;

export const api = async (endpoint, method = "GET ,POST, DELETE, PUT", data = null) => {
    const tokenKey = import.meta.env.VITE_TOKEN_KEY;
    const token = localStorage.getItem(tokenKey);

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    };

    if (data) options.body = JSON.stringify(data);

    const res = await fetch(`${API_URL}${endpoint}`, options);

    const text = await res.text();

    try {
        return JSON.parse(text);
    } catch (err) {
        console.error("❌ Server sent non-JSON:", text);
        throw new Error("Invalid JSON from server");
    }
};






// const API = import.meta.env.VITE_API_URL;
// const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

// export async function api(endpoint, method = "GET", data = null) {
//     const token = localStorage.getItem(TOKEN_KEY);
//     const opts = { method, headers: {} };
//     if (token) opts.headers.Authorization = `Bearer ${token}`;
//     if (data) { opts.headers["Content-Type"] = "application/json"; opts.body = JSON.stringify(data); }

//     const res = await fetch(`${API_URL}${endpoint}`, opts);
//     const text = await res.text();
//     try { return { ok: res.ok, status: res.status, body: JSON.parse(text) }; }
//     catch (err) { console.error("Non-JSON response:", text); throw new Error("Invalid JSON from server"); }
// }


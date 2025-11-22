const API_URL = import.meta.env.VITE_API_URL;

export const api = async (endpoint, method = "GET", data = null) => {
    const tokenKey = import.meta.env.VITE_TOKEN_KEY;
    const token = localStorage.getItem(tokenKey);

    const options = {
        method: method.toUpperCase(),
        headers: {
            "Content-Type": "application/json",
        },
    };

    // add Authorization header
    if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
        console.log("Sending token:", token);
    } else {
        console.log("❌ No token found in localStorage");
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    const res = await fetch(`${API_URL}${endpoint}`, options);
    const text = await res.text();

    try {
        return JSON.parse(text);
    } catch (err) {
        console.error("❌ NON-JSON response:", text);
        return { ok: false, message: "Invalid JSON from server" };
    }
};

export default api;
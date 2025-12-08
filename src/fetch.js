



// src/fetch.js
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || "https://my-backend-amber.vercel.app/api",
    timeout: 30000,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem("token") || localStorage.getItem("studentToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (e) { }
        return config;
    },
    (err) => Promise.reject(err)
);

export default api;


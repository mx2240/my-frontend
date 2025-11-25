import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "https://my-backend-amber.vercel.app/api";

const fetch = axios.create({
    baseURL: API_BASE,
    timeout: 30000,
});

// attach token
fetch.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (err) => Promise.reject(err));

export default fetch;


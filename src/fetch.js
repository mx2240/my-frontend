// src/fetch.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://express-js-on-vercel-mu-orpin.vercel.app/api";

const fetch = axios.create({
    baseURL: API_URL,
    timeout: 50000,
    headers: { "Content-Type": "application/json" },
});

fetch.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (err) => Promise.reject(err));

fetch.interceptors.response.use((res) => res, (error) => {
    if (error.response && error.response.data) return Promise.reject(error.response.data);
    return Promise.reject({ message: error.message || "Network Error" });
});

export default fetch;

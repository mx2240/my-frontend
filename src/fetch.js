// src/fetch.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://express-js-on-vercel-mu-orpin.vercel.app/api";
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || "token";

const fetch = axios.create({
    baseURL: API_URL,
    timeout: 50000,
    headers: { "Content-Type": "application/json" },
});

// Attach token automatically
fetch.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default fetch;

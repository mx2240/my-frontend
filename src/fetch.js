import axios from "axios";

const fetch = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://express-js-on-vercel-mu-orpin.vercel.app/api",
    timeout: 50000,
    headers: { "Content-Type": "application/json" },
});

// Attach token automatically
fetch.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to safely handle empty or invalid JSON
fetch.interceptors.response.use(
    (response) => {
        // axios already parses JSON, but just in case
        if (!response.data) return { data: {} };
        return response;
    },
    (error) => {
        if (error.response) {
            // Backend returned an error response
            return Promise.reject(error.response.data || { message: "Server Error" });
        } else {
            // Network or other errors
            return Promise.reject({ message: error.message || "Network Error" });
        }
    }
);

export default fetch;

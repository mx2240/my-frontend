import axios from "axios";

const fetch = axios.create({
    baseURL: "https://my-backend-amber.vercel.app/api",
    timeout: 50000,
    headers: { "Content-Type": "application/json" },
});

// Attach token automatically to all requests
fetch.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // read correct key
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default fetch;

// fetch.js
import axios from "axios";

const fetch = axios.create({
    baseURL: "https://express-js-on-vercel-mu-orpin.vercel.app/api",
    timeout: 50000,
    headers: { "Content-Type": "application/json" },
});

// Attach token automatically to all requests
fetch.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // ensure you saved JWT in localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            // localStorage.setItem("token", loginResponse.data.token);

        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default fetch;

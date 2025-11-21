import axios from "axios";

const fetch = axios.create({
    baseURL: "https://express-js-on-vercel-mu-orpin.vercel.app/api",
    timeout: 50000,
    headers: { "Content-Type": "application/json" },
});

// Interceptor to attach token
fetch.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // get token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // attach to headers
    }
    return config;
}, (error) => Promise.reject(error));

export default fetch;

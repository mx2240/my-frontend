import axios from "axios";

const fetch = axios.create({
    baseURL: 'https://express-js-on-vercel-mu-orpin.vercel.app/api',
    timeout: 50000,
    headers: { 'Content-Type': 'application/json' }
});

// Add token automatically to every request
fetch.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // get JWT from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default fetch;

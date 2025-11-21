import axios from "axios";

const fetch = axios.create({
    baseURL: 'https://express-js-on-vercel-mu-orpin.vercel.app/api',
    timeout: 50000,
    headers: { 'Content-Type': 'application/json' }
});

// Interceptor to add token automatically
fetch.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");  // get token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;  // send it
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});



export default fetch;

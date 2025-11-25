
import axios from "axios";

const fetch = axios.create({
    baseURL: "https://my-backend-amber.vercel.app/api",
});

// Attach token for every request
fetch.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default fetch;

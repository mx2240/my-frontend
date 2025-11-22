import axios from "axios";

const fetch = axios.create({
    baseURL: "https://express-js-on-vercel-mu-orpin.vercel.app/api",
    timeout: 50000,
    headers: {
        "Content-Type": "application/json"
    }
});

// Interceptor to attach token automatically
fetch.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
            config.headers["authorization"] = `Bearer ${token}`;  // (backup lowercase for CORS/Vercel)
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default fetch;

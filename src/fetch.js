// fetch.js
import axios from "axios";

const fetch = axios.create({
    baseURL: "https://express-js-on-vercel-mu-orpin.vercel.app/api",
    headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json"
    }
});


// Automatically attach token to every request
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

export default fetch;

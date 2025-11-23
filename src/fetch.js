// src/fetch.js
import axios from "axios";

const token = localStorage.getItem("token"); // token stored after login

const fetch = axios.create({
    baseURL: "https://express-js-on-vercel-mu-orpin.vercel.app/api",
    headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json"
    }
});

export default fetch;

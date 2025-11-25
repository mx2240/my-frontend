// src/lib/api.js
import axios from "axios";

const API_BASE = "https://my-backend-amber.vercel.app/api";

export const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
});

// POST request
export async function apiPost(url, data = {}) {
    return api.post(url, data);
}

// GET request
export async function apiGet(url) {
    return api.get(url);
}

// PUT request
export async function apiPut(url, data = {}) {
    return api.put(url, data);
}

// DELETE request
export async function apiDelete(url) {
    return api.delete(url);
}

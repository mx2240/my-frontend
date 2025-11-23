// src/myapi/couses.js
import fetch from "../fetch";

const API_URL = import.meta.env.VITE_API_URL; // must end with /api
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || "token";

// Create Axios instance
const api = fetch.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach token to all requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// --- Helpers to avoid JSON errors ---
const safeResponse = (res) => ({
    ok: res?.data?.ok ?? false,
    data: res?.data ?? {},
    message: res?.data?.message ?? "No message",
});

// --------------------
//   API FUNCTIONS
// --------------------

// 1. Get all courses
export const getAllCourses = async () => {
    try {
        const res = await api.get("/courses");
        return safeResponse(res);
    } catch (err) {
        return {
            ok: false,
            data: {},
            message: err.response?.data?.message || "Failed to load courses",
        };
    }
};

// 2. Create course
export const createCourse = async (courseData) => {
    try {
        const res = await api.post("/create", courseData);
        return safeResponse(res);
    } catch (err) {
        return {
            ok: false,
            data: {},
            message: err.response?.data?.message || "Failed to create course",
        };
    }
};

// 3. Delete course
export const deleteCourse = async (id) => {
    try {
        const res = await api.delete(`/courses/${id}`);
        return safeResponse(res);
    } catch (err) {
        return {
            ok: false,
            data: {},
            message: err.response?.data?.message || "Failed to delete course",
        };
    }
};

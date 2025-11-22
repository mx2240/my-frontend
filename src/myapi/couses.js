// src/myapi/couses.js
import axios from "axios";

// Auto-detect backend URL (fixes undefined/courses problem)
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL,
});

// Add token to all requests
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ==========================
//  COURSE API FUNCTIONS
// ==========================

// GET all courses
export const getAllCourses = () => API.get("/courses");

// CREATE a new course
export const createCourse = (data) => API.post("/courses/create", data);

// DELETE a course
export const deleteCourse = (id) => API.delete(`/courses/${id}`);

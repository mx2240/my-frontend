import { api } from "../api";

// Get all courses
export const getAllCourses = () => api("/courses", "GET");

// Create a course
export const createCourse = (data) => api("/courses", "POST", data);

// Delete a course
export const deleteCourse = (id) => api(`/courses/${id}`, "DELETE");

// Update a course
export const updateCourse = (id, data) => api(`/courses/${id}`, "PUT", data);
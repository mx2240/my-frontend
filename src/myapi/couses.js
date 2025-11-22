
import fetch from "../fetch";

// Get all courses
export const getAllCourses = async () => fetch.get("/courses");

// Create course
export const createCourse = async (data) => fetch.post("/courses", data);

// Delete course
export const deleteCourse = async (id) => fetch.delete(`/courses/${id}`);

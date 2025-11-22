import fetch from "../fetch";

// Helper to add token
const authHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Get all courses (public)
export const getAllCourses = async () => fetch.get("/courses");

// Create course (admin only)
export const createCourse = async (data) =>
    fetch.post("/courses", data, authHeader());

// Delete course (admin only)
export const deleteCourse = async (id) =>
    fetch.delete(`/courses/${id}`, authHeader());

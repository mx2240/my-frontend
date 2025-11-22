
import fetch from "../fetch";

// Get admin profile
export const getAdminProfile = async () => {
    return fetch.get("/admin/profile");
};

// Get all students
export const getAllStudents = async () => {
    return fetch.get("/admin/students");
};

// Get all admins
export const getAllAdmins = async () => {
    return fetch.get("/admin/admins");
};

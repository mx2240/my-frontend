import { Navigate } from "react-router-dom";

export default function StudentProtectedRoute({ children }) {
    const studentToken = localStorage.getItem("studentToken");
    const student = JSON.parse(localStorage.getItem("student"));

    // Not logged in at all
    if (!studentToken || !student) {
        return <Navigate to="/student/login" replace />;
    }

    // Must be a student
    if (!student.role || student.role !== "student") {
        return <Navigate to="/student/login" replace />;
    }

    return children;
}

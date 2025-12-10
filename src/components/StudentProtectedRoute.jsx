import { Navigate } from "react-router-dom";

export default function StudentProtectedRoute({ children }) {
    const token = localStorage.getItem("studentToken");
    const student = JSON.parse(localStorage.getItem("student"));

    if (!token || !student) {
        return <Navigate to="/student/login" replace />;
    }

    // If role is missing, fallback to treat as student
    const role = student.role || "student";

    if (role !== "student") {
        return <Navigate to="/student/login" replace />;
    }

    return children;
}

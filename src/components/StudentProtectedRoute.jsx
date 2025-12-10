import { Navigate } from "react-router-dom";

export default function StudentProtectedRoute({ children }) {
    const token = localStorage.getItem("studentToken");
    const user = JSON.parse(localStorage.getItem("student"));

    // Not logged in at all
    if (!token || !user) {
        return <Navigate to="/student/login" replace />;
    }

    // Must be a student
    if (!user.role || user.role !== "student") {
        return <Navigate to="/student/login" replace />;
    }

    return children;
}

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // Not logged in at all
    if (!token || !user) {
        return <Navigate to="/student/login" replace />;
    }

    // If role is required (admin or student)
    if (role && user.role !== role) {
        return <Navigate to="/student/login" replace />;
    }

    return children;
}

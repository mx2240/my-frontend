// src/context/AuthProvider.jsx
import { createContext, useState, useEffect, useContext } from "react";
import api from "../fetch"; // your axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [loading, setLoading] = useState(true);

    // Load user from token on refresh
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await api.get("/auth/me");
                setUser(res.data.user);
                localStorage.setItem("user", JSON.stringify(res.data.user));
            } catch (err) {
                console.error("Auth load failed:", err);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    // LOGIN FUNCTION
    const login = async (email, password) => {
        try {
            const res = await api.post("/auth/login", { email, password });

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                setUser(res.data.user);

                return { success: true, user: res.data.user };
            }

            return { success: false, message: res.data.message };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Login failed",
            };
        }
    };

    // LOGOUT FUNCTION
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for easy use
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

import { createContext, useState } from "react";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = (userObj, token) => {
        setUser(userObj);
        localStorage.setItem("user", JSON.stringify(userObj));
        localStorage.setItem("token", token);   // ✅ FIXED
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");       // ✅ FIXED
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

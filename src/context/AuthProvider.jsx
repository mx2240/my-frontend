import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Load token + user on refresh
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedToken) setToken(savedToken);
    }, []);

    const login = (userObj, tokenValue) => {
        setUser(userObj);
        setToken(tokenValue);

        localStorage.setItem("user", JSON.stringify(userObj));
        localStorage.setItem("token", tokenValue);
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

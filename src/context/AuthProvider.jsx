// // src/context/AuthProvider.jsx
// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const tokenKey = import.meta.env.VITE_TOKEN_KEY;

//     const [user, setUser] = useState(
//         JSON.parse(localStorage.getItem("user")) || null
//     );

//     const login = (userData, token) => {
//         setUser(userData);

//         localStorage.setItem("user", JSON.stringify(userData));
//         localStorage.setItem(tokenKey, token);
//     };

//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem("user");
//         localStorage.removeItem(tokenKey);
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;




import { createContext, useState } from "react";
export const AuthContext = createContext();
const KEY = import.meta.env.VITE_TOKEN_KEY;

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = (userObj, token) => {
        setUser(userObj);
        localStorage.setItem("user", JSON.stringify(userObj));
        localStorage.setItem(KEY, token);
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem(KEY);
    };
    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}


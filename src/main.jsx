// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import AuthProvider from "./context/AuthProvider";
// import { Toaster } from "react-hot-toast";
// import { ThemeProvider } from "./context/ThemeContext";
// import "./index.css";  // <---- ADD THIS

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <ThemeProvider>
//       <AuthProvider>
//         <App />
//         <Toaster position="top-right" />
//       </AuthProvider>
//     </ThemeProvider>
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css"; // Tailwind CSS import

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ThemeProvider wraps everything to manage dark/light mode globally */}
    <ThemeProvider>
      {/* AuthProvider wraps the app for authentication context */}
      <AuthProvider>
        {/* Main App */}
        <App />
        {/* Toast notifications */}
        <Toaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

import React, { useState } from "react";


const LandingPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);






    return (

        <div className="landing-container" >

            {/* NAVBAR */}
            <nav className="navbar">
                <h2 className="logo">Kingster</h2>

                <div className="nav-links">
                    <a href="https://vite-react-delta-six-49.vercel.app/">Home</a>
                    <a href="https://vite-react-delta-six-49.vercel.app/Aboutus">About</a>
                    <a href="https://vite-react-delta-six-49.vercel.app/Contact">Contact</a>
                </div>

                {/* Mobile Menu Button */}
                <button className="hamburger" onClick={() => setSidebarOpen(true)}>
                    ☰
                </button>
            </nav>

            {/* MOBILE SIDEBAR */}
            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <button className="close-btn" onClick={() => setSidebarOpen(false)}>
                    ✕
                </button>

                <a href="https://vite-react-delta-six-49.vercel.app/">Home</a>
                <a href="https://vite-react-delta-six-49.vercel.app/Aboutus">About</a>
                <a href="https://vite-react-delta-six-49.vercel.app/Contact">Contact</a>




                <div className="auth-buttons">
                    <a href="/login" className="login-btn">Login</a>
                    <a href="/register" className="register-btn">Register</a>
                    <a href="/student/login" className="register-btn">Student</a>
                </div>
            </div>

            {/* OVERLAY WHEN SIDEBAR OPEN */}
            {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}

            {/* HERO SECTION */}
            <header className="hero">
                <div className="hero-content">
                    <h1>Excellence Starts Here</h1>
                    <p>Where luxury meets education. Discover a premium learning experience.</p>

                    <div className="hero-buttons">
                        <a href="/login" className="hero-login">Login</a>
                        <a href="/register" className="hero-register">Register</a>
                        <a href="/student/login" className="register-btn">Student</a>
                    </div>
                </div>
            </header>
        </div>



    );
};

export default LandingPage;

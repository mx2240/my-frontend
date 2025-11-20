import React, { useState } from "react";


const LandingPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="landing-container" >

            {/* NAVBAR */}
            <nav className="navbar">
                <h2 className="logo">Royal Academy</h2>

                <div className="nav-links">
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Programs</a>
                    <a href="#">Contact</a>
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

                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Programs</a>
                <a href="#">Contact</a>

                <div className="auth-buttons">
                    <a href="/login" className="login-btn">Login</a>
                    <a href="/register" className="register-btn">Register</a>
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
                    </div>
                </div>
            </header>
        </div>
    );
};

export default LandingPage;

export default function Logout() {
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <button onClick={logout} className="logout-btn">
            Logout
        </button>
    );
}

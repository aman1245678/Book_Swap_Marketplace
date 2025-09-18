import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">BookSwap</Link>
            <div className="navbar-links">
                {user ? (
                    <>
                        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                        <Link to="/requests" className="navbar-link">Requests</Link>
                        <button onClick={handleLogout} className="navbar-logout-btn">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar-link">Login</Link>
                        <Link to="/signup" className="navbar-link">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

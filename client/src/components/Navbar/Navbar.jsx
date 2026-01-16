import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUsername("John Doe");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2 px-4">
            <div className="container-fluid d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <Link to="/" className="navbar-brand fw-bold fs-4 d-flex align-items-center me-3">
                        URL Shortener
                    </Link>
                    {username && (
                        <>
                            <Link to="/shorten-url" className="nav-link ms-4 fw-semibold">Shorten URL</Link>
                            <Link to="/urls" className="nav-link ms-4 fw-semibold">My URLs</Link>
                        </>
                    )}
                </div>
                <div className="d-flex align-items-center">
                    {username && (
                        <>
                            <span className="me-3 fw-semibold text-primary">{username}</span>
                            <button className="btn btn-outline-danger btn-sm px-3" onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import React, { useState } from 'react';
import axios from 'axios';
import "./index.css";
import API from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await API.post('/auth/login', { username, password });
            localStorage.setItem('token', response.data.access_token);
            navigate('/');
        } catch (error) {
            setError("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container card shadow mx-auto my-5 p-4" style={{ maxWidth: 400 }}>
            <h2 className="text-center mb-4">Login</h2>
            <form className="login-form" onSubmit={handleLogin} autoComplete="off">
                <div className="form-group mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={e => setUsername(e.target.value)} required autoFocus />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                {error && <div className="alert alert-danger text-center py-2">{error}</div>}
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            <div className="text-center mt-3">
                <span>Don't have an account? </span>
               <Link to="/register">Register</Link>
            </div>
        </div>
    )
}

export default Login;
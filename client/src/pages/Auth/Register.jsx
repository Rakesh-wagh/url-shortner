import React, { useState } from 'react'
import "./index.css"
import API from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const response = await API.post('/auth/register', { username, email, password });
            if (response.status === 200) {
                setSuccess("Registration successful! You can now log in.");
                navigate('/login');
            }
        } catch (error) {
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="login-container card shadow mx-auto my-5 p-4" style={{ maxWidth: 400 }}>
            <h2 className="text-center mb-4">Register</h2>
            <form className="login-form" onSubmit={handleRegister} autoComplete="off">
                <div className="form-group mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={e => setUsername(e.target.value)} required autoFocus />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                {error && <div className="alert alert-danger text-center py-2">{error}</div>}
                {success && <div className="alert alert-success text-center py-2">{success}</div>}
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            <div className="text-center mt-3">
                <span>Already have an account? </span>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

export default Register
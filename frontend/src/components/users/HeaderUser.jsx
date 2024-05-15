import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const HeaderUser = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/'); // Navigate to the home route
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded" style={{ borderRadius: '15px', paddingTop: '5px', paddingBottom: '5px' }}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Link to="/user/home" className="navbar-brand d-flex align-items-center" style={{ fontSize: '1.2rem' }}>
                    <img src={logo} alt="Logo" width="120" height="40" />
                    <span className="ms-2">User Portal</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/user/home" className="nav-link me-3">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user/updates" className="nav-link me-3">Updates</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user/feedback" className="nav-link me-3">Feedback</Link>
                        </li>

                        <li className="nav-item">
                            <button className="btn nav-link text-primary" onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default HeaderUser;

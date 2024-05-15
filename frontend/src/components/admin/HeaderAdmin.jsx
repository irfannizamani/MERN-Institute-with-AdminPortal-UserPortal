import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const HeaderAdmin = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {/* Left side with logo and text */}
                <Link to="/admin/home" className="navbar-brand d-flex align-items-center">
                    <img src={logo} alt="Logo" width="150" height="50" className="" />
                    <span className='m-2'> Admin Portal</span>
                </Link>

                {/* Toggle button for smaller screens */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Right side with navigation links */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/admin/home" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/courses" className="nav-link">Courses</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/carousels" className="nav-link">Carousels</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/career" className="nav-link">Career</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/contact" className="nav-link">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/services" className="nav-link">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/updates" className="nav-link">Updates</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/feedback" className="nav-link">Feedback</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default HeaderAdmin;

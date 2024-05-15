import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* Left side with logo and text */}
                <div className="navbar-brand d-flex align-items-center">
                 
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <img src={logo} alt="Logo" width="150" height="" className="" />
                  
                </Link>

                </div>
                
                {/* Toggle button for smaller screens */}
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon "></span>
                </button>

                {/* Right side with navigation links */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">About</Link>
                        </li>
                       
                            <li className="nav-item">
                                <Link to="/courses" className="nav-link">Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/services" className="nav-link">Services</Link>
                            </li>
                           
                            <li className="nav-item">
                            <Link to="/contact" className="nav-link">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/career" className="btn btn-outline-primary  ">Career</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;

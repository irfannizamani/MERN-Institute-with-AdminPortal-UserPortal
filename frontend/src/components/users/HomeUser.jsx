import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";

const HomeUser = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';
  const userSurname = localStorage.getItem('userSurname') || 'Surname';

  useEffect(() => {
    const tokenUser = localStorage.getItem('userToken');
    
    if (!tokenUser) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="container mt-5 text-center">
      <img
        src={logo}
        alt="Logo"
        className="img-fluid mb-4"
        style={{ maxWidth: "400px" }}
      />
      <h2 className="display-1 fw-normal  mb-4" style={{ color: "#1E90FF", fontSize: "2.5rem" }}>
        Welcome <span className='text-success '> {`${userName} ${userSurname}`}  </span> to the User Portal
      </h2>
    </div>
  );
};

export default HomeUser;

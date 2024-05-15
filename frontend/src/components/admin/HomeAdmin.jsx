import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const HomeAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
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

      <h2
        className="display-1 fw-normal mb-4 "
        style={{ color: "#1E90FF", fontSize: "2.5rem" }}
      >
        Welcome to the Admin Portal
      </h2>
      <p className="lead text-muted mb-5" style={{ fontSize: "1.5rem" }}>
        Unlock the power of control and make your mark!
      </p>
    </div>
  );
};

export default HomeAdmin;

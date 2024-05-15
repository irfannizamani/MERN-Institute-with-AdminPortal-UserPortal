import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ServicesAdmin = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [alertType, setAlertType] = useState("");
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  // Function to fetch all services
  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/services"
      , {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
      if (response.data.code === 200) {
        setData(response.data.data);
      } else {
        console.error("Error fetching services:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Fetch services on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    setToken(token);
    fetchServices();
  }, [navigate]);

  // Function to handle displaying alerts
  const showAlert = (msg, type) => {
    setMessage(msg);
    setAlertType(type);
    setTimeout(() => {
      setMessage("");
      setAlertType("");
    }, 4000); // Hide alert after 4 seconds
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title || !description) {
        showAlert("Fill all fields", "danger");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/admin/services",
        { title, description }
        , {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
      );
      if (response.data.code === 200) {
        showAlert("Services added successfully", "success");
        setTitle("");
        setDescription("");
        fetchServices(); // Refresh services after adding
      } else {
        showAlert("Failed to add services", "danger");
      }
    } catch (error) {
      console.error("Error adding services:", error);
      showAlert("Failed to add services", "danger");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/admin/services/${id}`
        , {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
      );
      if (response.data.code === 200) {
        showAlert("Service deleted successfully", "success");
        fetchServices(); // Refresh services after deletion
      } else {
        showAlert("Failed to delete service", "danger");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      showAlert("Failed to delete service", "danger");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 fw-light display-5 ">Manage Services</h1>
      <div className="row">
        <div className="col-md-4">
          <h2 className="text-center mb-3 fs-4">Add Services</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter service title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter service description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary me-1">
              Add Service
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setTitle("");
                setDescription("");
                setMessage("");
              }}
            >
              Clear Service
            </button>
          </form>
          {message && (
            <div className={`alert alert-${alertType} mt-3`} role="alert">
              {message}
            </div>
          )}
        </div>
        <div className="col-md-8">
          <h2 className="mb-3 text-center fs-4">View Services</h2>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data
                .slice()
                .reverse()
                .map((service, index) => (
                  <tr key={service._id}>
                    <td>{index + 1}</td>
                    <td>{service.title}</td>
                    <td>{service.description}</td>
                    <td>
                      <div className="d-inline">
                        <Link
                          to={`/admin/editservices/${service._id}`}
                          className="btn btn-primary me-2 mb-1"
                        >
                          Edit
                        </Link>

                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(service._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServicesAdmin;

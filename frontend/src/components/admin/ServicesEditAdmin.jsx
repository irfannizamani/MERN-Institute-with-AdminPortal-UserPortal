import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ServicesEditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [token, setToken] = useState(null);


  // Function to display a message with the specified type
  const showAlert = (type, msg) => {
    setAlertType(type);
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 4000); // Hide alert after 4 seconds
  };

  // Fetch service details on component mount
  useEffect(() => {

    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/');
    }
    setToken(token);
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/admin/services/${id}`
        , {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
        if (response.data.code === 200) {
          const { title, description, _id } = response.data.data;
          // Check if the service ID from the URL matches the ID of the fetched service
          if (_id === id) {
            setTitle(title);
            setDescription(description);
          } else {
            // Handle the case where IDs don't match (e.g., redirect user or display error message)
            console.error('Service ID mismatch');
            navigate('/admin/services'); // Redirect to services list page
          }
        } else {
          console.error('Error fetching service details:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };

    fetchServiceDetails();
  }, [id, navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8000/admin/services/${id}`, { title, description }
      , {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
      if (response.data.code === 200) {
        console.log("Service updated successfully");
        showAlert('success', 'Service updated successfully');
        setTimeout(() => {
          navigate('/admin/services');
        }, 4000); // Redirect to services list after 4 seconds
      } else {
        showAlert('danger', 'Failed to update service');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      showAlert('danger', 'Failed to update service');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 fw-light display-5">Edit Service</h1>
      <div className="row">
        <div className="col-md-4">
          <h2 className="text-center mb-3 fs-4">Update Service</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Enter service title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Enter service description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary me-3">Update Service</button>
            {message && <div className={`alert alert-${alertType} mt-3`} role="alert">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServicesEditAdmin;

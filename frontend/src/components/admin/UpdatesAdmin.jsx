import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdatesAdmin = () => {
  const [memo, setMemo] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  // Function to fetch all updates
  const fetchUpdates = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const response = await axios.get('http://localhost:8000/admin/updates', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.code === 200) {
        setData(response.data.data);
      } else {
        console.error('Error fetching updates:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching updates:', error);
    }
  };

  // Fetch updates on component mount
  useEffect(() => {
    fetchUpdates();
  }, []);

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!memo) {
        showAlert('Please enter a message', 'danger');
        return;
      }

      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/admin/updates', { memo }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.code === 200) {
        setMemo('');
        fetchUpdates();
        showAlert('Update added successfully', 'success');
      }
    } catch (error) {
      console.error('Error adding update:', error);
      showAlert('Failed to add update', 'danger');
    }
  };

  // Function to handle deleting an update
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:8000/admin/updates/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.code === 200) {
        showAlert('Update deleted successfully', 'success');
        fetchUpdates();
      }
    } catch (error) {
      console.error('Error deleting update:', error);
      showAlert('Failed to delete update', 'danger');
    }
  };

  // Function to handle displaying alerts
  const showAlert = (msg, type) => {
    setMessage(msg);
    setAlertType(type);
    setTimeout(() => {
      setMessage('');
      setAlertType('');
    }, 4000); // Hide alert after 4 seconds
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 fw-light display-5">Manage Updates</h1>
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter update message"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary me-1">Add Update</button>
            <button type="button" className="btn btn-secondary" onClick={() => setMemo('')}>Clear Update</button>
          </form>
          {message && <div className={`alert alert-${alertType} mt-3`} role="alert">{message}</div>}
        </div>
        <div className="col-md-8">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.slice().reverse().map((update, index) => (
                  <tr key={update._id}>
                    <td>{index + 1}</td>
                    <td>{update.memo}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDelete(update._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">No updates available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UpdatesAdmin;

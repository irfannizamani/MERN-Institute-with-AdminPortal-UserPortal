import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CareerAdmin = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postedDate, setPostedDate] = useState('');
  const [lastDate, setLastDate] = useState('');
  const [message, setMessage] = useState('');
  const [careers, setCareers] = useState([]);
  const [alertType, setAlertType] = useState('');

  const [token, setToken] = useState(null);
  
  const navigate = useNavigate();

  // Function to fetch all careers
  const fetchCareers = async () => {
    
    try {
      const response = await axios.get('http://localhost:8000/admin/careers');
      if (response.data.code === 200) {
        const reversedData = response.data.data.reverse();
        setCareers(reversedData);
      } else {
        console.error('Error fetching careers:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching careers:', error);
    }
  };

  // Fetch careers on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/');
    }
setToken(token);


    fetchCareers();
  }, [navigate],);

  // Function to handle displaying alerts
  const showAlert = (msg, type) => {
    setMessage(msg);
    setAlertType(type);
    setTimeout(() => {
      setMessage('');
      setAlertType('');
    }, 4000); // Hide alert after 4 seconds
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title || !description || !postedDate || !lastDate) {
        showAlert('Fill all fields', 'danger');
        return;
      }

      const response = await axios.post('http://localhost:8000/admin/careers', { title, description, postedDate, lastDate }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.code === 200) {
        showAlert('Career added successfully', 'success');
        setTitle('');
        setDescription('');
        setPostedDate('');
        setLastDate('');
        fetchCareers(); // Refresh careers after adding
      } else {
        showAlert('Failed to add career', 'danger');
      }
    } catch (error) {
      console.error('Error adding career:', error);
      showAlert('Failed to add career', 'danger');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/admin/careers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.code === 200) {
        showAlert('Career deleted successfully', 'success');
        fetchCareers(); // Refresh careers after deletion
      } else {
        showAlert('Failed to delete career', 'danger');
      }
    } catch (error) {
      console.error('Error deleting career:', error);
      showAlert('Failed to delete career', 'danger');
    }
  };

  return (
    <div className="container mt-5">
   
      <h1 className="text-center mb-5 fw-light display-5">Manage Careers</h1>
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Enter career title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <textarea className="form-control" placeholder="Enter career description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="mb-3">
            <input type="text" className="form-control" placeholder="Select Posted Date" value={postedDate || ""} onFocus={(e) => { e.target.type = 'date'; e.target.placeholder = 'Select Posted Date'; }} onBlur={(e) => { e.target.type = 'text'; e.target.placeholder = 'Select Posted Date'; }} onChange={(e) => setPostedDate(e.target.value)} />

            
            </div>
            <div className="mb-3">
            <input type="text" className="form-control" placeholder="Select Last Date" value={lastDate || ""} onFocus={(e) => { e.target.type = 'date'; e.target.placeholder = 'Select Last Date'; }} onBlur={(e) => { e.target.type = 'text'; e.target.placeholder = 'Select Last Date'; }} onChange={(e) => setLastDate(e.target.value)} />

            </div>
            <button type="submit" className="btn btn-primary me-1">Add Career</button>
            <button type="button" className="btn btn-secondary" onClick={() => { setTitle(''); setDescription(''); setPostedDate(''); setLastDate(''); setMessage(''); }}>Clear Career</button>
          </form>
          {message && <div className={`alert alert-${alertType} mt-3`} role="alert">{message}</div>}
        </div>
        <div className="col-md-8">
          <h2 className="mb-3 text-center fs-4">View Careers</h2>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Date Posted</th>
                <th>Last Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {careers.map((career, index) => (
                <tr key={career._id}>
                  <td>{index + 1}</td>
                  <td>{career.title}</td>
                  <td>{career.description}</td>
                  <td>{career.postedDate ? new Date(career.postedDate).toLocaleDateString('en-GB').split('/').join('-') : ''}</td>
                  <td>{career.lastDate ? new Date(career.lastDate).toLocaleDateString('en-GB').split('/').join('-') : ''}</td>
                  <td>
                    <div className="d-inline">
                      <button className="btn btn-danger" onClick={() => handleDelete(career._id)}>Delete</button>
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

export default CareerAdmin;

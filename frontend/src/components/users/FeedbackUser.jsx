import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FeedbackUser = () => {
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const tokenUser = localStorage.getItem('userToken');
    const userEmail = localStorage.getItem('userEmail');

    if (!tokenUser || !userEmail) {
      navigate('/');
    } else {
      fetchFeedbacks(userEmail, tokenUser);
    }
  }, [navigate]);

  const fetchFeedbacks = async (emailUser, token) => {
    try {
      const response = await axios.get('http://localhost:8000/user/feedbacks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.code === 200) {
        const userFeedbacks = response.data.data.filter(feedback => feedback.emailUser === emailUser);
        const reversedFeedbacks = userFeedbacks.reverse();
        setFeedbacks(reversedFeedbacks);
      } else {
        console.error('Error fetching feedbacks:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!feedbackMsg) {
        showAlert('Fill all fields', 'danger');
        return;
      }

      const tokenUser = localStorage.getItem('userToken');
      const userEmail = localStorage.getItem('userEmail');
      const response = await axios.post('http://localhost:8000/user/feedbacks', { feedbackMsg, emailUser: userEmail }, {
        headers: {
          Authorization: `Bearer ${tokenUser}`
        }
      });
      if (response.data.code === 200) {
        showAlert('Feedback added successfully', 'success');
        setFeedbackMsg('');
        fetchFeedbacks(userEmail, tokenUser); // Fetch feedbacks again after adding new one
      } else {
        showAlert('Failed to add feedback', 'danger');
      }
    } catch (error) {
      console.error('Error adding feedback:', error);
      showAlert('Failed to add feedback', 'danger');
    }
  };

  const handleDelete = async (id) => {
    try {
      const tokenUser = localStorage.getItem('userToken');
      const response = await axios.delete(`http://localhost:8000/user/feedbacks/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenUser}`
        }
      });
      if (response.data.code === 200) {
        setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
        showAlert('Feedback deleted successfully', 'success');
      } else {
        showAlert('Failed to delete feedback', 'danger');
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
      showAlert('Failed to delete feedback', 'danger');
    }
  };

  const showAlert = (msg, type) => {
    setMessage(msg);
    setAlertType(type);
    setTimeout(() => {
      setMessage('');
      setAlertType('');
    }, 4000);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 fw-light display-5">Manage Feedbacks</h1>
      <div className="row">
        <div className="col-md-4">
          <h2 className="text-center mb-3 fs-4">Add Feedback</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Enter feedback message" value={feedbackMsg} onChange={(e) => setFeedbackMsg(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary me-1">Add Feedback</button>
            <button type="button" className="btn btn-secondary" onClick={() => { setFeedbackMsg(''); setMessage(''); }}>Clear Feedback</button>
          </form>
          {message && <div className={`alert alert-${alertType} mt-3`} role="alert">{message}</div>}
        </div>
        <div className="col-md-8">
          <h2 className="mb-3 text-center fs-4">View Feedbacks</h2>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Feedback Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback, index) => (
                <tr key={feedback._id}>
                  <td>{index + 1}</td>
                  <td>{feedback.feedbackMsg}</td>
                  <td>
                    <div className="d-inline">
                      <button className="btn btn-danger" onClick={() => handleDelete(feedback._id)}>Delete</button>
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

export default FeedbackUser;

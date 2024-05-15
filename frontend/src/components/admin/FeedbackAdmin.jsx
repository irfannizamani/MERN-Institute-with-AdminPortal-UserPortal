import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FeedbackAdmin = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      setToken(token);
      fetchFeedbacks(token);
    }
  }, [navigate]);

  const fetchFeedbacks = async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/user/feedbacks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.code === 200) {
        const reversedFeedbacks = response.data.data.reverse();
        setFeedbacks(reversedFeedbacks);
      } else {
        console.error("Error fetching feedbacks:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`http://localhost:8000/user/feedbacks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.code === 200) {
        setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
        console.log("Feedback deleted successfully");
      } else {
        console.error("Failed to delete feedback");
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 fw-light display-5">Manage Feedbacks</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Email</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback, index) => (
              <tr key={feedback._id}>
                <td>{index + 1}</td>
                <td>{feedback.emailUser}</td>
                <td>{feedback.feedbackMsg}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(feedback._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackAdmin;

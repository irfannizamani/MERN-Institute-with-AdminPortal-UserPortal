import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdatesUser = () => {
  const [updates, setUpdates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenUser = localStorage.getItem('userToken');
    if (!tokenUser) {
      navigate('/');
      return;
    }

    axios.get('http://localhost:8000/admin/updates', {
      headers: {
        Authorization: `Bearer ${tokenUser}` // Use tokenUser instead of token
      }
    })
    .then(response => {
      setUpdates(response.data.data.reverse());
    })
    .catch(error => {
      console.error('Error fetching updates:', error);
    });
  }, [navigate]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title mb-0 fw-light" style={{ fontSize: "1.6em" }}>Latest Updates</h2>
            </div>
            <div className="card-body">
              {updates.length === 0 ? (
                <p className="text-center">No updates available</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {updates.map((update, index) => (
                    <li key={index} className="list-group-item">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <span className="badge bg-primary me-3 p-2">{`🔔 ${index + 1} `}</span>
                          <span>{update.memo}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatesUser;

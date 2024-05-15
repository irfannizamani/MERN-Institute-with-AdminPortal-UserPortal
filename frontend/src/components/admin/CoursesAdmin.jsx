import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CoursesAdmin = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [alertType, setAlertType] = useState('');
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  // Function to fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/courses'
      , {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
      if (response.data.code === 200) {
        setData(response.data.data);
      } else {
        console.error('Error fetching courses:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch courses on component mount
  useEffect(() => {

    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/');
    }
    setToken(token);
    fetchCourses();
  }, [navigate]);

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
      if (!title || !description) {
        showAlert('Fill all fields', 'danger');
        return;
      }

      const response = await axios.post('http://localhost:8000/admin/courses', { title, description }
      , {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
      if (response.data.code === 200) {
        showAlert('Course added successfully', 'success');
        setTitle('');
        setDescription('');
        fetchCourses(); // Refresh courses after adding
      } else {
        showAlert('Failed to add course', 'danger');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      showAlert('Failed to add course', 'danger');
    }
  };

  const handleDelete = async (id) => {
  
    try {
      const response = await axios.delete(`http://localhost:8000/admin/courses/${id}`
      , {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
      if (response.data.code === 200) {
        showAlert('Course deleted successfully', 'success');
        fetchCourses(); // Refresh courses after deletion
      } else {
        showAlert('Failed to delete course', 'danger');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      showAlert('Failed to delete course', 'danger');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 fw-light display-5">Manage Courses</h1>
      <div className="row">
        <div className="col-md-4">
          <h2 className="text-center mb-3 fs-4">Add Courses</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Enter course title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Enter course description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary me-1">Add Course</button>
            <button type="button" className="btn btn-secondary" onClick={() => { setTitle(''); setDescription(''); setMessage(''); }}>Clear Course</button>
          </form>
          {message && <div className={`alert alert-${alertType} mt-3`} role="alert">{message}</div>}
        </div>
        <div className="col-md-8">
          <h2 className="mb-3 text-center fs-4">View Courses</h2>
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
              {data.slice().reverse().map((course, index) => (
                <tr key={course._id}>
                  <td>{index + 1}</td>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>
                    <div className="d-inline">
                     
                      <button className="btn btn-danger" onClick={() => handleDelete(course._id)}>Delete</button>
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

export default CoursesAdmin;

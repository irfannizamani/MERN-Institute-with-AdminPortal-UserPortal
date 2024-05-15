import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CarouselsAdmin = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [alertType, setAlertType] = useState('');
  
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/');
    }
    setToken(token);
    fetchCarouselItems();
  }, [navigate]);

  const fetchCarouselItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/carousels'
      , {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
      if (response.data.code === 200) {
        const reversedData = response.data.data.reverse();

        setData(reversedData);
      } else {
        console.error('Error fetching carousel items:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching carousel items:', error);
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType.startsWith('image/')) {
        setImage(selectedFile);
      } else {
        // Show an error message or handle invalid file type here
        showAlert('Choose only image files', 'danger');
        console.error('Invalid file type. Please select an image file.');
        // Reset the file input field
        e.target.value = null;
      }
    }


  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title || !description || !image) {
        showAlert('Fill all fields', 'danger');
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image);

      const response = await axios.post('http://localhost:8000/admin/carousels', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      , {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

      if (response.data.code === 200) {
        showAlert('Carousel item added successfully', 'success');
        setTitle('');
        setDescription('');
        setImage(null);
        fetchCarouselItems();
      } else {
        showAlert('Failed to add carousel item', 'danger');
      }
    } catch (error) {
      console.error('Error adding carousel item:', error);
      showAlert('Failed to add carousel item', 'danger');
    }
  };

  const handleDelete = async (id, imageUrl) => {
    try {
      // Send a request to delete the carousel item by ID
      const response = await axios.delete(`http://localhost:8000/admin/carousels/${id}`
      , {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
      if (response.data.code === 200) {
        // If the carousel item is deleted successfully, delete the corresponding image file
        showAlert('Carousel item deleted successfully', 'success');
        fetchCarouselItems();
      } else {
        showAlert('Failed to delete carousel item', 'danger');
      }
    } catch (error) {
      console.error('Error deleting carousel item:', error);
      showAlert('Failed to delete carousel item', 'danger');
    }
  };
  
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 fw-light display-5">Manage Carousel </h1>
      <div className="row">
        <div className="col-md-4">
          <h2 className="text-center mb-3 fs-4">Add Carousel </h2>
          <form onSubmit={handleFormSubmit} id="carouselForm" encType="multipart/form-data">
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Enter item title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Enter item description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="file" name="file" className="form-control" accept="image/*" onChange={handleFileChange} />
            </div>
            <button type="submit" className="btn btn-primary me-1">Add Carousel</button>
            <button type="button" className="btn btn-secondary" onClick={() => {
  setTitle('');
  setDescription('');
  setImage(null);
  setMessage('');
  const form = document.getElementById('carouselForm');
  form && form.reset(); // Check if form element exists before resetting
}}>Clear Carousel</button>
          </form>
          {message && <div className={`alert alert-${alertType} mt-3`} role="alert">{message}</div>}
        </div>
        <div className="col-md-8">
          <h2 className="mb-3 text-center fs-4">View Carousel </h2>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td><img src={`http://localhost:8000/${item.imageUrl}`} alt={item.title} style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
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

export default CarouselsAdmin;

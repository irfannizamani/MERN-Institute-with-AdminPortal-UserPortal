import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const LoginAdmin = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/admin/admins/login', { userName, password });
      setLoading(false);

      if (response.status === 200) {
        const { message, token } = response.data;
        setMessage(message);
        setAlertType('success');
        localStorage.setItem('token', token);

        // Redirect to home page after successful login
        navigate('/admin/home');
      } else {
        const errorMessage = response.data.message || 'Login failed. Please try again.';
        setMessage(errorMessage);
        setAlertType('danger');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error logging in:', error);
      setMessage('Error: Please enter correct username and password');
      setAlertType('danger');
    }
  };

  return (
    <div className='container p-4'>
      <h1 className='text-center'>Admin Portal</h1>
      {message && <div className={`alert alert-${alertType} mt-3`} role="alert">{message}</div>}
      <div>
        <p>Please log in as admin</p>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Enter your username</label>
            <input type="text" className="form-control" id="username" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Enter your password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;

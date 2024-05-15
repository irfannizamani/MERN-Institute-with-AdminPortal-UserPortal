import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../../assets/logo.png";

const ForgetPasswordUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setAlertMessage('Please enter your email.');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/user/checkemail', { email });
      if (response.data.exists) {
        await axios.post('http://localhost:8000/user/sendotp', { email });
        sessionStorage.setItem('userEmail', email);
        navigate(`/user/otpcode`);
      } else {
        setAlertMessage('This email does not exist.');
        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setAlertMessage('This email does not exist.');
      } else {
        setAlertMessage('Something went wrong. Please try again later.');
      }
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card shadow mt-5 mx-auto p-4" style={{ maxWidth: '30rem' }}>
      <img className='mt-2 mx-auto' src={logo} width={300} alt='logo img' /> 
      <h1 className="display-6 mt-3 text-center">Forget Password</h1>
      <div className="card-body">
        {alertMessage && (
          <div className="alert alert-danger">
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              placeholder='Enter your email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              type="email"
              title="Please enter your email"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary form-control"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Forget Password' }
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordUser;

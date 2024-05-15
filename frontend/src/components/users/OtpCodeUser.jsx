import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../../assets/logo.png";

const OtpCodeUser = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');
  const userEmail = sessionStorage.getItem('userEmail');

  useEffect(() => {
    if (!userEmail) {
      navigate('/user/forgetpass');
    }
  }, [userEmail, navigate]);

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      setAlertClass('alert-danger');
      setAlertMessage('Please fill in all fields.');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return;
    }

    axios.post('http://localhost:8000/user/submitotp', { otp, newPassword })
      .then(res => {
        setAlertClass('alert-success');
        setAlertMessage('Password changed successfully.');
        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
        // Optionally, navigate to another page after changing password
        navigate('/user');
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          setAlertClass('alert-danger');
          setAlertMessage(error.response.data.message);
        } else if (error.request) {
          setAlertClass('alert-danger');
          setAlertMessage('Network error: Unable to connect to the server');
        } else {
          setAlertClass('alert-danger');
          setAlertMessage('Something went wrong. Please try again.');
        }
        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
      });
  };

  return (
    <>
      <div className="card  shadow mt-5 mx-auto p-4" style={{ maxWidth: '30rem' }}>
        <img className='mt-2 mx-auto' src={logo} width={300} alt='logo img' /> 
        <h1 className="display-6 mt-3 text-center">Change Password</h1>
        <div className="card-body">
          {alertMessage && (
            <div className={`alert ${alertClass}`}>
              {alertMessage}
            </div>
          )}
          <form onSubmit={handleChangePassword}>
            <div className="mb-3">
              <input
                value={userEmail}
                className="form-control"
                type="text"
                disabled
              />
            </div>
            <div className="mb-3">
              <input
                placeholder='Enter OTP'
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                className="form-control"
                type="text"
                title="Please enter OTP"
              />
            </div>
            <div className="mb-3">
              <input
                placeholder='Enter New Password'
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                className="form-control"
                type="password"
                title="Please enter new password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary form-control"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpCodeUser;

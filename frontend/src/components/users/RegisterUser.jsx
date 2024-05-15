import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.png';
const RegisterUser  = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !name || !surname) {
      setAlertClass('alert-danger');
      setAlertMessage('Please fill in all fields.');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return;
    }

    axios.post('http://localhost:8000/user/register', { name, surname, email, password })
      .then(res => {
        setName('');
        setSurname('');
        setEmail('');
        setPassword('');
        setAlertClass('alert-success');
        setAlertMessage('Signup succeeded');
        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
        navigate('/user/');
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


    <div className="card shadow mt-5 mx-auto p-4" style={{ maxWidth: '30rem' }}>
      <img className='mt-2 mx-auto' src={logo} width={300} alt='logo img' />
      <h1 className="display-6 mt-3 text-center">Register User</h1>
     
      <div className="card-body">
        {alertMessage && (
          <div className={`alert ${alertClass}`}>
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              placeholder='Enter your name'
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              type="text"
            />
          </div>
          <div className="mb-3">
            <input
              placeholder='Enter your surname'
              onChange={(e) => setSurname(e.target.value)}
              value={surname}
              className="form-control"
              type="text"
            />
          </div>
          <div className="mb-3">
            <input
              placeholder='Enter your email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              type="email"
              title="Please enter a valid email address"
            />
          </div>
          <div className="mb-3">
            <input
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              type="password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary form-control mb-2"
          >
            Register
          </button>

          
          <Link className="btn btn-warning form-control" to="/user">Login User</Link>

          
        </form>
      </div>
      
    </div>

    </>
  );
};

export default RegisterUser;
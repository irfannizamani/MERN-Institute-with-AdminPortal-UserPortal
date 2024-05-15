import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.png';

const LoginUser = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertClass, setAlertClass] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setAlertClass('alert-danger');
            setAlertMessage('Please fill in all fields.');
            setTimeout(() => {
                setAlertMessage('');
            }, 3000);
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8000/user/login', { email, password });
            const { data } = response;
            const { token, name, surname } = data; // Extracting token, name, and surname from the response
            if (token) {
                localStorage.setItem('userToken', token); // Storing token in local storage
                localStorage.setItem('userEmail', email); // Storing email in local storage
                localStorage.setItem('userName', name); // Storing name in local storage
                localStorage.setItem('userSurname', surname); // Storing surname in local storage
                
                setEmail('');
                setPassword('');
                navigate('/user/home');
            } else {
                setAlertClass('alert-danger');
                setAlertMessage('Token not received. Please try again.');
                setTimeout(() => {
                    setAlertMessage('');
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
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
        }
    };
    

    return (
        <div className="card shadow mt-5 mx-auto p-4" style={{ maxWidth: '30rem' }}>
            <img className='mt-2 mx-auto' src={logo} width={300} alt='logo img' />
            <h1 className="display-6 mt-3 text-center">Login User</h1>
            <div className="card-body">
                {alertMessage && (
                    <div className={`alert ${alertClass}`}>
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
                        Login
                    </button>
                    <Link className="btn btn-warning form-control mb-2" to="/user/register">Register New User</Link>
                    <Link className="link-primary" to="/user/forgetpass">Forget Password</Link>
                </form>
            </div>
        </div>
    );
};

export default LoginUser;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import MessageModal from '../Dashboard/message';

const Login = ({ setIsAuthenticated, setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const navigate = useNavigate();

  const getLoginAdmin = async () => {
    if (!email || !password) {
      setMessage('Error! All fields are required.');
      setIsMessageOpen(true); // Open the message modal
      return;
    }

    const employeeCredential = {
      email,
      password,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeCredential),
    };

    try {
      const response = await fetch('http://127.0.0.1:8001/login', options);

      if (!response.ok) {
        // If response is not successful (status code other than 2xx)
        if (response.status === 401) {
          // Unauthorized - Incorrect email or password
          setMessage('Error: Incorrect email or password.');
          setIsMessageOpen(true);
        } else if (response.status === 404) {
          // Other error status codes
          setMessage('Error: Server error. Please try again later.');
          setIsMessageOpen(true);
        }
      } else {
        // Successful login
        const adminLogged = await response.json();
        localStorage.setItem('token', adminLogged.data.token);
        setToken(adminLogged.data.token);

        setIsAuthenticated(true);
        localStorage.setItem('is_authenticated', true);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error: Something went wrong. Please try again later.');
      setIsMessageOpen(true);
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseMessage = () => {
    setIsMessageOpen(false);
  };

  const handleOkMessage = () => {
    setIsMessageOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    getLoginAdmin();
  };

  return (
    <div className='small-container'>
      <form onSubmit={handleLogin}>
        <h1>Admin Login</h1>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          name='email'
          required
          placeholder='enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor='password'>Password</label>
        <div
          className={`password-input-container ${
            showPassword ? 'visible' : ''
          }`}
        >
          <input
            id='password'
            type={showPassword ? 'text' : 'password'}
            name='password'
            required
            placeholder='enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className='password-toggle-button'
            onClick={handlePasswordVisibilityToggle}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <input
          style={{ marginTop: '12px' }}
          type='submit'
          value='Login'
          onClick={handleLogin}
        />
      </form>
      <p>
        Not have an Account?{' '}
        <Link to='/register'>
          <button className='button muted-button'>Register Here</button>
        </Link>
      </p>
      <MessageModal
        isOpen={isMessageOpen}
        message={message}
        onClose={handleCloseMessage}
        onConfirm={handleOkMessage}
      />
    </div>
  );
};

export default Login;

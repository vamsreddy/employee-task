import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import MessageModal from '../Dashboard/message'; // Import the MessageModal component

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [data, setData] = useState(false);

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseMessage = () => {
    setIsMessageOpen(false);
  };

  const handleCancel = () => {
    navigate('/'); // Navigate to the login page
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior

    // Regular expressions for password validation
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    // Check if email, username, and password are provided
    if (email === '' || username === '' || password === '') {
      setMessage('Please fill in all fields');
      setIsMessageOpen(true);
      return;
    }

    // Check if password meets criteria
    if (
      password.length < 8 ||
      !uppercaseRegex.test(password) ||
      !lowercaseRegex.test(password) ||
      !numberRegex.test(password) ||
      !symbolRegex.test(password)
    ) {
      setMessage(
        'Password must be at least 8 characters long and contain uppercase letters, lowercase letters, numbers, and symbols'
      );
      setData(true);
      setIsMessageOpen(true);
      return; // Prevent further execution of the registration process
    }

    const newUser = { email, username, password };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    };

    const data = await fetch('http://127.0.0.1:8001/register', options);
    const response = await data.json();
    // console.log(response);
    if (response.status === 'failed') {
      setMessage('Email already exists. Please choose a different one.');
      setIsMessageOpen(true);
    } else {
      setMessage('Registration successful!');
      setIsMessageOpen(true);
      setData(false); // Set data to false to indicate successful registration
    }
  };

  const handleOkMessage = () => {
    setIsMessageOpen(false);
    navigate('/');
  };

  return (
    <form className='register-container' onSubmit={handleRegister}>
      {' '}
      {/* Added onSubmit event */}
      <div>
        <h2>Admin Registration</h2>
        <div id='register'>
          <label htmlFor='mail'>Email</label>
          <input
            id='mail'
            type='email'
            placeholder='enter email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            placeholder='enter username'
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
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
          <button className='button muted-button' type='submit'>
            {' '}
            {/* Added type="submit" */}
            Register
          </button>
          <button
            style={{
              backgroundColor: 'red',
              marginTop: '10px',
              color: 'white',
            }}
            className='button muted-button'
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
      <MessageModal
        isOpen={isMessageOpen}
        message={message}
        onConfirm={handleOkMessage}
        onClose={handleCloseMessage}
        data={data}
      />
    </form>
  );
};

export default Register;

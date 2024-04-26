import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import MessageModal from '../Dashboard/message'; // Import the MessageModal component

const Create = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');
  const [isMessageOpen, setIsMessageOpen] = useState(false); // State for message modal

  useEffect(() => {
    emailjs.init({
      publicKey: 'Vaa7zzUhJKzwPYlG0',
    });
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email) {
      setMessage('Error! All fields are required.');
      setIsMessageOpen(true); // Open the message modal
      return;
    }

    const newEmployee = {
      firstName,
      lastName,
      email,
    };

    const token = localStorage.getItem('token');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newEmployee),
    };

    const data = await fetch('http://127.0.0.1:8001/employees', options);
    const response = await data.json();

    if (response.status === 'failed') {
      setIsMessageOpen(true);
      setMessage("Couldn't add the new employee");
      return;
    }
    try {
      // Send email using EmailJS
      const templateParams = {
        to_name: `${firstName} ${lastName}`,
        email: email,
        subject: 'Welcome to the Company',
      };
      await emailjs.send(
        'service_qm7s8ga', // Replace with your EmailJS Service ID
        'template_eibtv84', // Replace with your EmailJS Template ID
        templateParams
      );

      setMessage(
        `Added! ${firstName} ${lastName}'s data has been added, and a welcome email has been sent.`
      );
      setIsMessageOpen(true); // Open the message modal
      // navigate('/dashboard');
    } catch (error) {
      setMessage('Error! Failed to send email.');
      setIsMessageOpen(true); // Open the message modal
    }
  };

  const handleCloseMessage = () => {
    setIsMessageOpen(false); // Close the message modal
  };

  const handleOkMessage = () => {
    setIsMessageOpen(false);
    navigate('/dashboard'); // Close the message modal
  };

  const handleCancel = () => {
    setIsAdding(false);
    navigate('/dashboard');
  };

  return (
    <div className='small-container'>
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
        <label htmlFor='firstName'>First Name</label>
        <input
          id='firstName'
          type='text'
          name='firstName'
          value={firstName}
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor='lastName'>Last Name</label>
        <input
          id='lastName'
          type='text'
          name='lastName'
          value={lastName}
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          name='email'
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input className='button muted-button' type='submit' value='Add' />
          <input
            className='button muted-button'
            type='button'
            value='Cancel'
            onClick={handleCancel}
          />
        </div>
      </form>
      <MessageModal
        isOpen={isMessageOpen}
        message={message}
        onClose={handleCloseMessage}
        onConfirm={handleOkMessage}
      />
    </div>
  );
};

export default Create;

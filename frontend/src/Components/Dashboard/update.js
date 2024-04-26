import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MessageModal from '../Dashboard/message';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initial state should be set when employee data is available
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [employee, setEmployee] = useState(null);
  const [message, setMessage] = useState(''); // State for message content
  const [isMessageOpen, setIsMessageOpen] = useState(false); // State for message modal visibility

  const token = localStorage.getItem('token');
  const getEmployeeById = async () => {
    const data = await fetch(`http://127.0.0.1:8001/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await data.json();
    setEmployee(response.data?.employee);
  };

  useEffect(() => {
    getEmployeeById();
  }, [id]);

  const updatedEmployee = {
    firstName,
    lastName,
    email,
  };

  const updateEmployeeById = async () => {
    try {
      const data = await fetch(`http://127.0.0.1:8001/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEmployee),
      });
      const response = await data.json();
      console.log(response); // Log response from backend
      if (response.status === 'success') {
        // If the update was successful, update the employee state
        setEmployee(response.data?.employee);
      } else {
        // If there was an error, handle it
        console.error('Error updating employee:', response.message);
        // Handle error - for example, show an error message to the user
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      // Handle error - for example, show an error message to the user
    }
  };

  // Set initial state when employee data is available
  useEffect(() => {
    if (employee) {
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmail(employee.email);
    }
  }, [employee]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email) {
      setMessage('Error! All fields are required.');
      setIsMessageOpen(true);
      return;
    }

    updateEmployeeById();

    setMessage(
      `Success! ${updatedEmployee.firstName} ${updatedEmployee.lastName}'s data has been updated.`
    );
    setIsMessageOpen(true);
  };

  const handleCloseMessage = () => {
    setIsMessageOpen(false);
    navigate(`/edit/${id}`);
  };
  const handleOkMessage = () => {
    setIsMessageOpen(false);
    navigate('/dashboard');
  };

  if (!employee) {
    return <p>No Employee Found...</p>;
  }

  return (
    <div className='small-container'>
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor='firstName'>First Name</label>
        <input
          id='firstName'
          type='text'
          name='firstName'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor='lastName'>Last Name</label>
        <input
          id='lastName'
          type='text'
          name='lastName'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input
            className='button muted-button'
            type='submit'
            value='Save Changes'
          />
          <button
            className='button muted-button'
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </button>
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

export default Update;

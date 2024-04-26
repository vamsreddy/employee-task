import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Dashboard/confirmMessage'; // Import the ConfirmationModal component

const Logout = ({ setIsAuthenticated, setToken }) => {
  const navigate = useNavigate();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleLogout = () => {
    setIsConfirmationOpen(true);
  };

  // const confirmLogout = () => {
  //   localStorage.setItem('token', null);
  //   localStorage.setItem('is_authenticated', false);
  //   setIsAuthenticated(false);
  //   navigate('/');
  //   setIsConfirmationOpen(false); // Close the modal after confirmation
  // };
  const confirmLogout = () => {
    localStorage.clear('token');
    localStorage.clear('is_authenticated');
    setIsAuthenticated(false);
    setToken('');
    navigate('/'); // Navigate to the root path after logging out
    setIsConfirmationOpen(false); // Close the modal after confirmation
  };

  const cancelLogout = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <>
      <button
        style={{ marginLeft: '12px' }}
        className='logout-button'
        onClick={handleLogout}
      >
        Logout
      </button>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        message='Are you sure you want to log out?'
        onConfirm={confirmLogout}
        onClose={cancelLogout}
      />
    </>
  );
};

export default Logout;

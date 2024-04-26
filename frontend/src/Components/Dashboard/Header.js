import React from 'react';

import Logout from '../Logout/logout';
import { useNavigate } from 'react-router-dom';

const Header = ({ setIsAdding, setIsAuthenticated, setToken }) => {
  // console.log(setIsAuthenticated);
  const navigate = useNavigate();
  return (
    <header>
      <h1>Employee Management App</h1>
      <div
        style={{
          marginTop: '30px',
          marginBottom: '18px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            borderRadius: '8px',
            textAlign: 'center',
            paddingTop: '10px',
            cursor: 'pointer',
          }}
          className='add-button'
          onClick={() => {
            setIsAdding(true);
            navigate('/add'); // Manually navigate to the '/add' route
          }}
        >
          Add Employee
        </div>
        <Logout setIsAuthenticated={setIsAuthenticated} setToken={setToken} />
      </div>
    </header>
  );
};

export default Header;

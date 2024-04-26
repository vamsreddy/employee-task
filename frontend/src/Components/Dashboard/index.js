import React, { useState, useEffect } from 'react';

import List from './List';
import Create from './create';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import MessageModal from '../Dashboard/message'; // Import the MessageModal component

const Dashboard = ({ setIsAuthenticated, setToken }) => {
  console.log(setToken);
  const [employees, setEmployees] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(''); // State for message content
  const [isMessageOpen, setIsMessageOpen] = useState(false); // State for message modal visibility
  const [confirmData, setConfirmData] = useState(null); // State for storing the data related to the action
  const [data, setData] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const getEmployees = async () => {
    const data = await fetch('http://127.0.0.1:8001/employees', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const employees = await data.json();
    setEmployees(employees?.data?.employees);
  };
  useEffect(() => {
    getEmployees();
  }, []);

  const handleEdit = (id) => {
    const [employee] = employees.filter((employee) => employee.id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
    navigate('/edit/' + id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8001/employees/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setConfirmData({ id });
        setIsMessageOpen(true);

        setMessage(`Deleted Successfully`);

        setData(false);
        getEmployees();
      } else {
        // If request failed, handle the error
        throw new Error('Failed to delete employee');
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error deleting employee:', error);
      // Optionally, display an error message to the user
    }
  };

  const handleConfirmAction = () => {
    setIsMessageOpen(false);
  };

  return (
    <div className='container'>
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
            setToken={setToken}
          />
          <List
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Create
          employees={employees}
          setEmployees={setEmployees}
          setIsAdding={setIsAdding}
        />
      )}
      <MessageModal
        isOpen={isMessageOpen}
        message={message}
        onConfirm={handleConfirmAction} // Pass the confirm action handler
        data={data}
      />
    </div>
  );
};

export default Dashboard;

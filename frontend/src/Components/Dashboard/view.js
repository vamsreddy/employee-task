import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
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

  if (!employee) {
    return <p>No Employee Found....</p>; // You may want to show a loading message or redirect if the employee is not found.
  }

  return (
    <div className='employee-details'>
      <h2>Employee Details</h2>
      <p>
        <strong>EMP-ID:</strong> {employee?._id}
      </p>
      <p>
        <strong>First Name:</strong> {employee?.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {employee?.lastName}
      </p>
      <p>
        <strong>Email:</strong> {employee?.email}
      </p>

      <Link to='/dashboard'>
        <button className='button muted-button'>Close Details</button>
      </Link>
    </div>
  );
};

export default EmployeeDetails;

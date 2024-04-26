import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './confirmMessage';

const List = ({ employees, handleEdit, handleDelete }) => {
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employee, setEmployee] = useState(null);
  const token = localStorage.getItem('token');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(null);

  const handleGetDetails = (employee) => {
    // console.log(employee);
    setSelectedEmployee(employee);
    navigate('/view/' + employee._id);
  };

  const confirmDelete = () => {
    // do delete
    handleDelete(employee._id);
    setIsConfirmationOpen(false);
  };

  const cancelDelete = () => {
    // cancel deletion
    setIsConfirmationOpen(false);
  };

  return (
    <>
      <div className='contain-table'>
        <h1>List of Employees</h1>
        <table className='striped-table'>
          <thead>
            <tr>
              <th>Emp-ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th colSpan={3} className='text-center'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees?.length > 0 ? (
              employees.map((employee, i) => (
                <tr key={employee?.id}>
                  <td>EMP_{i + 1}</td>
                  <td>{employee?.firstName}</td>
                  <td>{employee?.lastName}</td>
                  <td>{employee?.email}</td>
                  <td className='text-right'>
                    <button
                      id='view'
                      onClick={(e) => {
                        e.preventDefault();
                        handleGetDetails(employee);
                      }}
                      className='button muted-button'
                    >
                      View
                    </button>
                  </td>

                  <td className='text-right'>
                    <button
                      id='edit'
                      onClick={() => handleEdit(employee._id)}
                      className='button muted-button'
                    >
                      Edit
                    </button>
                  </td>
                  <td className='text-left'>
                    <button
                      id='delete'
                      onClick={() => {
                        setIsConfirmationOpen(true);
                        setEmployee(employee);
                      }}
                      className='button muted-button'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No Employees</td>
              </tr>
            )}
          </tbody>
        </table>
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          message='Are you sure you want to delete?'
          onConfirm={confirmDelete}
          onClose={cancelDelete}
        />
      </div>
    </>
  );
};

export default List;

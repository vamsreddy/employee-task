import React from 'react';
import Modal from 'react-modal';

const ConfirmationModal = ({ isOpen, message, onConfirm, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      contentLabel='Confirmation Modal'
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '400px', // Adjust the maximum width as per your requirement
          maxHeight: '80vh', // Adjust the maximum height as per your requirement
          overflow: 'auto', // Enable scrolling if the content overflows the modal
        },
      }}
    >
      <h2>Confirmation</h2>
      <p>{message}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={onConfirm}>Yes</button>
        <button style={{ backgroundColor: 'red' }} onClick={onClose}>
          No
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;

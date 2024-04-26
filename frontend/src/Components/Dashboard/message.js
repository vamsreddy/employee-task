import React from 'react';
import Modal from 'react-modal';

const MessageModal = ({ isOpen, message, onConfirm, onClose, data }) => {
  return (
    <Modal
      isOpen={isOpen}
      contentLabel='Message Modal'
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
      <h2>Message</h2>
      <p>{message}</p>
      {data === true ? ( // Check if data is 'buttons'
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            style={{
              backgroundColor: 'red',
            }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      ) : (
        // Otherwise, render default buttons
        <div style={{ textAlign: 'center' }}>
          <button onClick={onConfirm}>Ok</button>
        </div>
      )}
    </Modal>
  );
};

export default MessageModal;

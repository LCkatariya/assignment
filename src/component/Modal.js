import React from 'react';

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  content: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

const Modal = ({ isOpen, onClose,set_id, handleSubmit, children }) => {
  const closePopup = () =>{
    onClose()
    set_id()
  }
  if (!isOpen) {
    return null;
  }

  return (
    <div style={modalStyle.overlay} onClick={closePopup}>
      <div style={modalStyle.content} onClick={(e) => e.stopPropagation()}>
        {children}
        <button type='button' class="btn btn-outline-danger" onClick={closePopup}>Close</button>{` `}
        <button type='button' class="btn btn-outline-primary" onClick={handleSubmit}>{isOpen=="edit"?`Update`:`SubmitData`}</button>
      </div>
    </div>
  );
};

export default Modal
import React from 'react';
import '../App.css';

function Modal({ title, children, onClose }) {
  const handleOverlayClick = (event) => {
    if (event.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div id="modal-overlay" className="custom-modal-overlay" onClick={handleOverlayClick}>
      <div className="custom-modal-content">
        <div className="custom-modal-close-btn" onClick={onClose}>&times;</div>
        <div className="custom-modal-header">
          <h2>{title}</h2>
        </div>
        <div className="custom-modal-body">
          {children}
        </div>
        <div className="modal-actions">
          <button className="button">Action 1</button>
          <button className="button decline">Action 2</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
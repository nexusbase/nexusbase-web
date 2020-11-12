import React, { FC } from 'react';
import './styles.css';

interface CIModal {
}

const Modal: FC<CIModal> = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>
  )
}

export default Modal;

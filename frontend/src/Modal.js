import React, { useState } from 'react';
import './modal.css';

const Modal = ({ handleCloseYes, handleCloseNo, show, children }) => {
  const showHideClassName = show ? "alert-modal shown" : "alert-modal hidden";
  let [secs, setSecs] = useState(120)
  let countdown = () => {
    if(secs === 0){
      handleCloseNo()
      clearInterval(id)
    }
    setSecs(--secs)
  }
  const id = setInterval(countdown, 1000)
  return (
    <div className={showHideClassName}>
        <div className="alert-modal-content">
          {children}
          <button class="toggle-button" onClick={handleCloseYes}>YES</button>    <button class="toggle-button" onClick={handleCloseNo}>NO</button>
          <p>You have {secs}s to respond</p>
        </div>
      </div>
    );
};

export default Modal;
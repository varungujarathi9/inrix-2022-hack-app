import React, { useState } from 'react';
import './modal.css';

const Modal = ({ handleCloseYes, handleCloseNo, show, children }) => {
  const showHideClassName = show ? "alert-modal shown" : "alert-modal hidden";
  let [secs, setSecs] = useState(40)
  let countdown = () => {
    if(secs <= 0){
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
          <br/>
          <button class="button-yes" onClick={handleCloseYes}>YES</button>    <button class="button-no" onClick={handleCloseNo}>NO</button>
          <br/>
          <br/>
          <p>An alert will be sent to your emergency contact in {secs} seconds</p>
        </div>
      </div>
    );
};

export default Modal;
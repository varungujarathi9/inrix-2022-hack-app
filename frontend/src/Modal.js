import './modal.css';

const Modal = ({ handleCloseYes, handleCloseNo, show, children }) => {
  const showHideClassName = show ? "alert-modal shown" : "alert-modal hidden";
  console.log(showHideClassName)
  return (
    <div className={showHideClassName}>
        <div className="alert-modal-content">
          {children}
          <button class="toggle-button" onClick={handleCloseYes}>YES</button>    <button class="toggle-button" onClick={handleCloseNo}>NO</button>
        </div>
      </div>
    );
};

export default Modal;
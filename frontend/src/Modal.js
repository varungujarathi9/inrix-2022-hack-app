import './modal.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show==="true" ? "modal shown" : "modal hidden";
  console.log(showHideClassName)
  return (
    <div>
      
    </div>
    );
};

export default Modal;
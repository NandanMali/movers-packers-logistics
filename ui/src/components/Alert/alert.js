import './alert.css';
import { useEffect, useState } from "react";

function Alert({ message, type }) {
  const [show, setShow] = useState(true);

  const icon = {
    successAlert : <i className="fa-regular fa-circle-check"></i>,
    errorAlert : <i className="fa-regular fa-circle-xmark"></i>,
    warningAlert : <i className="fa-solid fa-triangle-exclamation"></i>,
    infoAlert : <i className="fa-solid fa-user-check"></i>,
  };

  useEffect(() => {
  setShow(true);

  const timer = setTimeout(() => {
    setShow(false);
  }, 4000);

  return () => clearTimeout(timer);
  }, [message]);

  if (!show) return null;

  return (
    <>
    <div className={`alert ${type}`}>
        <div className='alert-icon'>{icon[type]}</div>
      {message}
    </div>
    </>
  );
}

export default Alert;
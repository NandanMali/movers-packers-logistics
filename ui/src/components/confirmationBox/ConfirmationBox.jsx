import "./ConfirmationBox.css";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="confirm-buttons">
          <button
            className="confirm-yes"
            onClick={onConfirm}
          >
            Yes
          </button>

          <button
            className="confirm-no"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
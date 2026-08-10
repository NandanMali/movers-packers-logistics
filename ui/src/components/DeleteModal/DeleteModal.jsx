import "./deleteModal.css";

const DeleteModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Delete",
    message = "Are you sure?",
    loading = false
}) => {

    if (!isOpen) return null;

    return (

        <div className="delete-overlay">

            <div className="delete-modal">

                <h2>
                     {title}?

                </h2>

                <p>

                    This action cannot be undone.

                </p>


                <p>{message}</p>

                <div className="delete-actions">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-btn"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Deleting..."
                                : "Delete"
                        }
                    </button>

                </div>

            </div>

        </div>

    );

};

export default DeleteModal;
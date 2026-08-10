import "./../admin.css";

const BookingModal = ({
  open,
  onClose
}) => {

  if (!open) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <h2>Booking Details</h2>

        <p>Booking ID : BK1023</p>

        <p>User : Rahul Sharma</p>

        <p>Status : Pending</p>

        <button onClick={onClose}>
          Close
        </button>

      </div>

    </div>
  );
};

export default BookingModal;
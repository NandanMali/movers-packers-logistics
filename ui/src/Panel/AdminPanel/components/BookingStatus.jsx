const BookingStatus = () => {
  return (
    <div className="booking-status-grid">

      <div className="status-card">
        <h2>120</h2>
        <p>Pending</p>
      </div>

      <div className="status-card">
        <h2>340</h2>
        <p>In Transit</p>
      </div>

      <div className="status-card">
        <h2>520</h2>
        <p>Delivered</p>
      </div>

      <div className="status-card">
        <h2>20</h2>
        <p>Cancelled</p>
      </div>

    </div>
  );
};

export default BookingStatus;
import { useState } from "react";
import AssignedJobDetailsModal from "./AssignedJobDetailsModal";
import "./assignedJobs.css";

function AssignedJobCard({ booking , refresh }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
    <div className="assigned-job-card">
      <h3>{booking.bookingId}</h3>

      <p>
        <strong>Customer :</strong>

        {booking.customerName}
      </p>

      <p>
        <strong>Pickup :</strong>

        {booking.pickupAddress}
      </p>

      <p>
        <strong>Drop :</strong>

        {booking.dropAddress}
      </p>

      <p>
        <strong>Amount :</strong>₹{booking.finalAmount}
      </p>

      <button onClick={() => setShowDetails(true)}>View Details</button>

      </div>
      <AssignedJobDetailsModal
        isOpen={showDetails}
        booking={booking}
        onClose={() => setShowDetails(false)}
        onAssign={refresh}
      />
      </>
  );
}

export default AssignedJobCard;

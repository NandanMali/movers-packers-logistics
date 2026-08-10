import { useState } from "react";

import OrderDetailsModal from "./OrderDetailsModal";
import StatusBadge from "../../../components/SatutsBadge/Statusbadge";

function OrderCard({
  booking,

  refresh,
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="assigned-job-card">
        <h3>{booking.bookingId}</h3>

        <p>
          <strong>Customer : </strong>

          {booking.customerName}
        </p>

        <p>
          <strong>Pickup : </strong>

          {booking.pickupAddress}
        </p>

        <p>
          <strong>Drop : </strong>

          {booking.dropAddress}
        </p>

          <StatusBadge status={booking.status}/>
        

        <button onClick={() => setShowDetails(true)}>Manage Order</button>
      </div>

      <OrderDetailsModal
        isOpen={showDetails}
        booking={booking}
        onClose={() => setShowDetails(false)}
        onUpdate={refresh}
      />
    </>
  );
}

export default OrderCard;

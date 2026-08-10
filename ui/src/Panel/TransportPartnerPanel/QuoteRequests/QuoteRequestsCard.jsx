import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWeightHanging,
  FaTruckMoving,
  FaBoxOpen,
  FaUsers,
  FaEye,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import StatusBadge from "../../../components/SatutsBadge/Statusbadge";

function QuoteRequestCard({
  booking,

  onViewDetails,
  onSendQuote,
}) {
  return (
    <div className="quote-card">
      {/* Header */}

      <div className="quote-card-header">
        
          <h3>Booking #{booking._id}</h3>
        
      </div>
        <div className="booking-status-card">
          <span className="waiting-status">Waiting For Quote</span>
        </div>

      {/* Route */}

      <div className="route-box">
        <div>
          <p className="label">Pickup</p>

          <h4>{booking.pickupAddress}</h4>
        </div>

        <div className="route-arrow">→</div>

        <div>
          <p className="label">Drop</p>

          <h4>{booking.dropAddress}</h4>
        </div>
      </div>

      {/* Details */}

      <div className="booking-details">
        <div className="detail-item">
          <FaCalendarAlt />

          <span>
            {booking.bookingDate
              ? booking.bookingDate
              : " After Booking Completation"}
          </span>
        </div>

        <div className="detail-item">
          <FaUsers />

          <span>
            {booking.workersNeeded ? booking.workersNeeded : " Info Not Given"}
          </span>
        </div>

        <div className="detail-item">
          <FaBoxOpen />

          <span>{booking.category}</span>
        </div>

        <div className="detail-item">
          <FaMapMarkerAlt />

          <span>{parseInt(booking.distance)} KM</span>
        </div>
      </div>

      {/* Budget */}

      <div className="budget-box">
        <div>
          <p>Estimated Budget</p>

          <h3>
            ₹ {booking.estimatedFare} - {booking.estimatedFare + 2000}
          </h3>
        </div>
      </div>

      {/* Footer */}

      <div className="quote-card-footer">
        <button className="view-btn" onClick={() => onViewDetails(booking)}>
          <FaEye /> &nbsp; View Details
        </button>

        <button className="quote-btn" onClick={() => onSendQuote(booking)}>
          <FaFileInvoiceDollar />
          &nbsp;Enter Your Quote
        </button>
      </div>
    </div>
  );
}

export default QuoteRequestCard;

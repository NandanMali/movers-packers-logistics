import { bookinguploadurl } from "../../../apiUrl";
import "./bookingDetailsModal.css";

function BookingDetailsModal({
  isOpen,

  booking,

  onClose,
}) {
  if (!isOpen || !booking) {
    return null;
  }

  return (
    <div className="booking-details-overlay">
      <div className="booking-details-modal">
        {/* Header */}

        <div className="booking-details-header">
          <div>
            <h2>Booking Details</h2>

            <span>{booking.bookingId}</span>
          </div>

          <button onClick={onClose} className="booking-close-btn">
            ✕
          </button>
        </div>

        {/* Body */}

        <div className="booking-details-body">
          {/* Booking Information */}

          <div className="booking-detail-section">
            <h3>Booking Information</h3>

            <div className="booking-detail-grid">
              <Detail label="Booking ID" value={booking.bookingId} />

              <Detail label="Status" value={booking.status} />

              <Detail label="Category" value={booking.category} />

              <Detail label="Sub Category" value={booking.subCategory} />

              <Detail
                label="Distance"
                value={
                  booking.distance ? `${booking.distance.toFixed(2)} km` : "N/A"
                }
              />

              <Detail
                label="Duration"
                value={
                  booking.duration
                    ? `${booking.duration.toFixed(0)} min`
                    : "N/A"
                }
              />

              <Detail
                label="Estimated Fare"
                value={
                  booking.estimatedFare ? `₹${booking.estimatedFare}` : "N/A"
                }
              />

              <Detail
                label="Customer Offer"
                value={
                  booking.customerOffer ? `₹${booking.customerOffer}` : "N/A"
                }
              />
            </div>
          </div>

          {/* Customer Information */}

          <div className="booking-detail-section">
            <h3>Customer Information</h3>

            <div className="booking-detail-grid">
              <Detail label="Name" value={booking.customer?.name} />

              <Detail label="Username" value={booking.customer?.username} />

              <Detail label="Mobile" value={booking.customer?.phone} />

              <Detail label="Email" value={booking.customer?.email} />

              <Detail label="Customer ID" value={booking.customerId} />
            </div>
          </div>

          {/* Location */}

          <div className="booking-detail-section">
            <h3>Location Details</h3>

            <div className="booking-location-box">
              <div>
                <span>Pickup</span>

                <p>{booking.pickupAddress}</p>
              </div>

              <div>
                <span>Drop</span>

                <p>{booking.dropAddress}</p>
              </div>
            </div>
          </div>

          <div className="booking-detail-section">
            <h3>Accepted Quote</h3>

            {booking.acceptedQuote ? (
              <div className="booking-detail-grid">
                <Detail label="Quote ID" value={booking.acceptedQuote._id} />

                <Detail
                  label="Price"
                  value={`₹${booking.acceptedQuote.estimatedPrice}`}
                />

                <Detail
                  label="Estimated Days"
                  value={booking.acceptedQuote.estimatedDays}
                />

                <Detail
                  label="Vehicle Type"
                  value={booking.acceptedQuote.vehicleType}
                />

                <Detail label="Message" value={booking.acceptedQuote.message} />
              </div>
            ) : (
              <p className="not-available">No quote accepted yet.</p>
            )}
          </div>

          {/* Partner */}

          <div className="booking-detail-section">
            <h3>Partner Information</h3>

            {booking.partner ? (
              <div className="booking-detail-grid">
                <Detail label="Name" value={booking.partner?.name} />

                <Detail label="Company" value={booking.company?.companyName} />

                <Detail label="Phone" value={booking.partner?.phone} />

                <Detail label="Email" value={booking.partner?.email} />

                <Detail
                  label="Business Address"
                  value={booking.company?.businessAddress}
                />
              </div>
            ) : (
              <p className="not-available">Partner not assigned</p>
            )}
          </div>

          {/* Driver */}

          <div className="booking-detail-section">
            <h3>Driver Information</h3>

            {booking.driver ? (
              <div className="booking-detail-grid">
                <Detail label="Name" value={booking.driver?.driverName} />

                <Detail label="Phone" value={booking.driver?.phone} />

                <Detail label="License" value={booking.driver?.licenseNumber} />

                <Detail label="Status" value={booking.driver?.status} />
              </div>
            ) : (
              <p className="not-available">Driver not assigned</p>
            )}
          </div>

          {/* Vehicle */}

          <div className="booking-detail-section">
            <h3>Vehicle Information</h3>

            {booking.vehicle ? (
              <div className="booking-detail-grid">
                <Detail
                  label="Vehicle Name"
                  value={booking.vehicle?.vehicleName}
                />

                <Detail
                  label="Vehicle Number"
                  value={booking.vehicle?.vehicleNumber}
                />

                <Detail
                  label="Vehicle Type"
                  value={booking.vehicle?.vehicleType}
                />

                <Detail label="Status" value={booking.vehicle?.status} />
              </div>
            ) : (
              <p className="not-available">Vehicle not assigned</p>
            )}
          </div>

          {/* Payment */}

          <div className="booking-detail-section">
            <h3>Payment Information</h3>

            <div className="booking-detail-grid">
              <Detail
                label="Payment Status"
                value={booking.paymentStatus || "Not Paid"}
              />

              <Detail
                label="Payment Amount"
                value={
                  booking.finalAmount ? `₹${booking.finalAmount}` : "N/A"
                }
              />

              <Detail label="Payment ID" value={booking.transactionId || "N/A"} />
            </div>
          </div>

          {/* Images */}

          {booking.images?.length > 0 && (
            <div className="booking-detail-section">
              <h3>Item Images</h3>

              <div className="booking-images">
                {booking.images.map((image, index) => (
                  <img key={index} src={bookinguploadurl+ image} alt="Booking Item" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}

        <div className="booking-details-footer">
          <button onClick={onClose} style={{width:"100%"}}><h3>Close</h3></button>
        </div>
      </div>
    </div>
  );
}

/* Reusable Detail Component */

function Detail({
  label,

  value,
}) {
  return (
    <div className="booking-detail-item">
      <span>{label}</span>

      <strong>{value || "N/A"}</strong>
    </div>
  );
}

export default BookingDetailsModal;

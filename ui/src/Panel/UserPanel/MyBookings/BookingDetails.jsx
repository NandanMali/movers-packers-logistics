import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTruckMoving,
  FaHome,
  FaUsers,
  FaBuilding,
  FaStickyNote,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";

import "./bookingDetails.css";

import {
  apiUrlPartnerDriver,
  apiUrlPartnerVehicle,
  apiUrlUser,
  bookinguploadurl,
} from "../../../apiUrl";
import ModalLayout from "../../TransportPartnerPanel/components/ModalLayout/ModalLayout";
import BookingAction from "./Components/BookingAction/BookingAction";
import StatusBadge from "../../../components/SatutsBadge/Statusbadge";

function BookingDetails({ isOpen, onClose, booking_Details, onViewQuote }) {
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(true);

  const [vehicle, setVehicle] = useState(null);

  const [partner, setPartner] = useState(null);
  const [driver, setDriver] = useState(null);
  const notgiven = " Info Not Given";

  const getBooking = async () => {
    setLoading(true);

    setBooking(booking_Details);
  };

  useEffect(() => {
    getBooking();
  }, [booking_Details]);

  useEffect(() => {
    getFetch();
  }, [booking?.partnerId]);

  const getFetch = async () => {
    if (
      booking &&
      (booking.status === "Confirmed" ||
        booking.status === "Assigned" ||
        booking.status === "Reached Pickup" ||
        booking.status === "Pickup Completed" ||
        booking.status === "In Progress" ||
        booking.status === "Reached Destination" ||
        booking.status === "Completed")
    ) {
      setLoading(true);

      const partnerId = Number(
        booking_Details?.partnerId ? booking_Details.partnerId : "",
      );
      await axios
        .get(apiUrlUser + "fetch", {
          params: {
            _id: partnerId,
          },
        })
        .then((res) => {
          setPartner(res.data[0]);
          setLoading(false);
        })
        .catch((err) => {
          setPartner([]);
          setLoading(false);
        });
      if (
        booking.status === "Assigned" ||
        booking.status === "Reached Pickup" ||
        booking.status === "Pickup Completed" ||
        booking.status === "In Progress" ||
        booking.status === "Reached Destination" ||
        booking.status === "Completed"
      ) {
        const driverId = Number(
          booking_Details?.driverId ? booking_Details.vehicle : "",
        );
        setLoading(true);
        await axios
          .get(
            apiUrlPartnerDriver + "view/" + Number(booking_Details?.driverId),
          )
          .then((res) => {
            setDriver(res.data.driver);
            setLoading(false);
          })
          .catch((err) => {
            setDriver([]);
            setLoading(false);
          });

        const vehicleId = Number(
          booking_Details?.vehicleId ? booking_Details.vehicleId : "",
        );
        setLoading(true);
        await axios
          .get(apiUrlPartnerVehicle + "fetch", {
            params: {
              _id: vehicleId,
            },
          })
          .then((res) => {
            setVehicle(res.data[0]);
            setLoading(false);
          })
          .catch((err) => {
            setVehicle([]);
            setLoading(false);
          });
      }
    }
    setLoading(false);
  };
  if (!isOpen) {
    return null;
  }
  const handlePayment = () => {
    const id = booking_Details?.quoteId;
    navigate(`/user/mybookings/payment/${id}/${booking._id}`);
  };

  if (loading) {
    return <div className="quote-details-loading">Loading Booking...</div>;
  }

  if (!booking) {
    return <div className="quote-details-loading">Booking Not Found</div>;
  }

  return (
    <ModalLayout onClose={onClose}>
      <div className="quote-details-page">
        {/* Header */}

        <div className="details-header">
          <div>
            <h2>Booking #{booking._id}</h2>

            <p>Review booking information before sending quotation.</p>
          </div>
        </div>

        {/* Status */}

        {/* <BookingAction booking={booking}/> */}
        <div className="booking-status-card">
          <StatusBadge status={booking.status} />
        </div>

        {/* Pickup */}

        <div className="details-card">
          <h3>Pickup Information</h3>

          <div className="details-grid">
            <div>
              <FaMapMarkerAlt />

              <span>{booking.pickupAddress}</span>
            </div>

            <div>
              <FaBuilding />

              <span>
                Floor :{booking.pickupFloor ? booking.pickupFloor : notgiven}
              </span>
            </div>

            <div>
              <FaHome />

              <span>
                Lift :{booking.pickupLift ? booking.pickupLift : " Available"}
              </span>
            </div>

            <div>
              <FaPhoneAlt />

              <span>{booking.mobile}</span>
            </div>
          </div>
        </div>

        {/* Drop */}

        <div className="details-card">
          <h3>Drop Information</h3>

          <div className="details-grid">
            <div>
              <FaMapMarkerAlt />

              <span>{booking.dropAddress}</span>
            </div>

            <div>
              <FaBuilding />

              <span>
                Floor :{booking.dropFloor ? booking.dropFloor : notgiven}
              </span>
            </div>

            <div>
              <FaHome />

              <span>
                Lift :{booking.dropLift ? booking.dropLift : " Available"}
              </span>
            </div>
          </div>
        </div>

        {(booking.status === "Accepted" ||
          booking.status === "Confirmed" ||
          booking.status === "Assigned" ||
          booking.status === "Reached Pickup" ||
          booking.status === "Pickup Completed" ||
          booking.status === "In Progress" ||
          booking.status === "Reached Destination" ||
          booking.status === "Completed") && (
          <>
            {/* Partner */}
            {partner && (
              <>
                <div className="details-card">
                  <h3>Partner Information</h3>

                  <div className="details-grid">
                    <div>
                      <strong>Name</strong>

                      <span>{partner?.name}</span>
                    </div>

                    <div>
                      <strong>Phone</strong>

                      <span>{partner?.phone}</span>
                    </div>

                    <div>
                      <strong>Email</strong>

                      <span>{partner?.email}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {(booking.status === "Assigned" ||
              booking.status === "Reached Pickup" ||
              booking.status === "Pickup Completed" ||
              booking.status === "In Progress" ||
              booking.status === "Reached Destination" ||
              booking.status === "Completed") && (
              <>
                {/* Driver */}

                <div className="details-card">
                  <h3>Driver Information</h3>

                  <div className="details-grid">
                    <div>
                      <strong>Name</strong>

                      <span>{driver?.driverName}</span>
                    </div>

                    <div>
                      <strong>Phone</strong>

                      <span>{driver?.phone}</span>
                    </div>

                    <div>
                      <strong>License Number</strong>

                      <span>{driver?.licenseNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Vehicle */}

                <div className="details-card">
                  <h3>Vehicle Information</h3>

                  <div className="details-grid">
                    <div>
                      <strong>Vehicle Name</strong>

                      <span>{vehicle?.vehicleName}</span>
                    </div>

                    <div>
                      <strong>Vehicle Number</strong>

                      <span>{vehicle?.vehicleNumber}</span>
                    </div>

                    <div>
                      <strong>Vehicle Type</strong>

                      <span>{vehicle?.vehicleType}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Moving Details */}

        <div className="details-card">
          <h3>Moving Details</h3>

          <div className="moving-grid">
            <div>
              <FaTruckMoving />

              <span>Service</span>

              <strong>{booking.category}</strong>
            </div>

            <div>
              <FaHome />

              <span>Items</span>

              <strong>{booking.subCategory}</strong>
            </div>

            <div>
              <FaUsers />

              <span>Workers</span>

              <strong>
                {booking.workersNeeded ? booking.workersNeeded : "Not Needed"}
              </strong>
            </div>

            <div>
              <FaCalendarAlt />

              <span>Moving Date</span>

              <strong>
                {booking.bookingDate
                  ? booking.bookingDate
                  : "Decided After Booking"}
              </strong>
            </div>

            <div>
              <FaClock />

              <span>Preferred Time</span>

              <strong>
                {booking.preferredTime ? booking.preferredTime : notgiven}
              </strong>
            </div>
          </div>
        </div>

        {/* Distance */}

        <div className="details-card">
          <h3>Distance</h3>

          <div className="distance-box">
            <FaMapMarkerAlt />

            <span>{parseInt(booking.distance)} KM</span>
          </div>
        </div>

        {/* Notes */}

        <div className="details-card">
          <h3>Customer Notes</h3>

          <div className="note-box">
            <FaStickyNote />

            <p>{booking.note || "No additional instructions."}</p>
          </div>
        </div>

        {/* Images */}

        <div className="details-card">
          <h3>Uploaded Images</h3>

          <div className="image-grid">
            {booking.images && booking.images.length > 0 ? (
              booking.images.map((image, index) => (
                <img
                  key={index}
                  src={bookinguploadurl + image}
                  alt="booking"
                  className="booking-image"
                />
              ))
            ) : (
              <p>No Images Uploaded</p>
            )}
          </div>
        </div>

        {/* Budget */}

        <div className="details-card budget-card">
          <FaMoneyBillWave />

          <div>
            <p>Estimated Budget</p>

            <h2>
              ₹ {booking.estimatedFare} - {booking.estimatedFare + 2000}
            </h2>
          </div>
        </div>

        <div className="details-card budget-card">
          <FaMoneyBillWave />

          <div>
            <p>My Offer</p>

            <h2>₹ {booking.customerOffer}</h2>
          </div>
        </div>

        {/* Footer */}

        <BookingAction booking={booking} />
        <br />
        <div className="quote-action">
          {booking.status === "Pending" ? (
            <button
              className="quote-btn"
              style={{ width: "100%" }}
              onClick={() => onViewQuote(booking)}
            >
              View Received Quotes
            </button>
          ) : booking.status === "Accepted" ? (
            <button
              className="quote-btn"
              style={{ width: "100%" }}
              onClick={() => {
                handlePayment();
              }}
            >
              Make Payment
            </button>
          ) : (
            <button
              className="quote-btn"
              style={{ width: "100%" }}
              onClick={onClose}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </ModalLayout>
  );
}

export default BookingDetails;

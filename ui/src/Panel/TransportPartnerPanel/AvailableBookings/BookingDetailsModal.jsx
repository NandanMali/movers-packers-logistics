import { useState } from "react";
import SubmitQuoteModal from "./SubmitQuoteModal";

function BookingDetailsModal({

    isOpen,

    onClose,

    booking,

    refresh

}) {

    const [showQuote, setShowQuote] = useState(false);

    if (!isOpen) return null;

    return (

        <>
            <div className="modal-overlay">

                <div className="booking-modal">

                    <div className="modal-header">

                        <h2>

                            Booking Details

                        </h2>

                        <button onClick={onClose}>

                            ✕

                        </button>

                    </div>

                    <div className="modal-body">

                        <div className="detail-row">

                            <strong>Category</strong>

                            <span>{booking.category}</span>

                        </div>

                        <div className="detail-row">

                            <strong>Sub Category</strong>

                            <span>{booking.subCategory}</span>

                        </div>

                        <div className="detail-row">

                            <strong>Customer Budget</strong>

                            <span>

                                ₹ {booking.customerBudget}

                            </span>

                        </div>

                        <div className="detail-row">

                            <strong>Estimated Fare</strong>

                            <span>

                                ₹ {booking.estimatedFare}

                            </span>

                        </div>

                        <div className="detail-row">

                            <strong>Distance</strong>

                            <span>

                                {booking.distance?.toFixed(1)} KM

                            </span>

                        </div>

                        <div className="detail-row">

                            <strong>Pickup</strong>

                            <span>

                                {booking.pickupAddress}

                            </span>

                        </div>

                        <div className="detail-row">

                            <strong>Drop</strong>

                            <span>

                                {booking.dropAddress}

                            </span>

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button

                            className="quote-btn"

                            onClick={() => setShowQuote(true)}

                        >

                            Submit Quote

                        </button>

                    </div>

                </div>

            </div>

            <SubmitQuoteModal

                isOpen={showQuote}

                onClose={() => setShowQuote(false)}

                booking={booking}

                refresh={refresh}

            />

        </>

    );

}

export default BookingDetailsModal;
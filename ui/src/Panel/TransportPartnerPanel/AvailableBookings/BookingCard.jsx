import { useState } from "react";
import BookingDetailsModal from "./BookingDetailsModal";

function BookingCard({ booking, refresh }) {

    const [showDetails, setShowDetails] = useState(false);

    return (

        <>
            <div className="booking-card">

                <div className="booking-top">

                    <h3>{booking.category}</h3>

                    <span className="booking-status">

                        {booking.status}

                    </span>

                </div>

                <div className="booking-body">

                    <p>

                        <strong>Budget : </strong>

                        ₹ {booking.customerBudget}

                    </p>

                    <p>

                        <strong>Distance : </strong>

                        {booking.distance?.toFixed(1)} KM

                    </p>

                    <p>

                        <strong>Pickup : </strong>

                        {booking.pickupAddress}

                    </p>

                    <p>

                        <strong>Drop : </strong>

                        {booking.dropAddress}

                    </p>

                </div>

                <div className="booking-footer">

                    <button

                        className="view-btn"

                        onClick={() => setShowDetails(true)}

                    >

                        View Details

                    </button>

                </div>

            </div>

            <BookingDetailsModal

                isOpen={showDetails}

                onClose={() => setShowDetails(false)}

                booking={booking}

                refresh={refresh}

            />

        </>

    );

}

export default BookingCard;
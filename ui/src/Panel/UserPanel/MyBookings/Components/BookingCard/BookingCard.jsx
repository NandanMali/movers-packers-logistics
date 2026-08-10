import {
    FaMapMarkerAlt,
    FaBoxOpen,
    FaRoute,
    FaCalendarAlt,
    FaArrowRight
} from "react-icons/fa";

import "./bookingCard.css";
import StatusBadge from "../../../../../components/SatutsBadge/Statusbadge";

function BookingCard({

    booking,

    onView

}) {

    return (

        <div className="booking-card">

            <div className="booking-card-header">

                <div>

                    <h3>

                        {booking.bookingId}

                    </h3>

                    <p>

                        {booking.category}

                        {

                            booking.subCategory &&

                            <> • {booking.subCategory}</>

                        }

                    </p>

                </div>

                    <StatusBadge status={booking.status} />
            </div>


            <div className="booking-route">

                <div>

                    <FaMapMarkerAlt />

                    <span>

                        {booking.pickupAddress}

                    </span>

                </div>

                <div>

                    <FaMapMarkerAlt />

                    <span>

                        {booking.dropAddress}

                    </span>

                </div>

            </div>

            <div className="booking-info">

                <div>

                    <FaBoxOpen />

                    <span>

                        {booking.category}

                    </span>

                </div>

                <div>

                    <FaRoute />

                    <span>

                        {booking.distance.toFixed(1)} km

                    </span>

                </div>

                <div>

                    <FaCalendarAlt />

                    <span>

                        {

                            new Date(

                                booking.createdAt

                            ).toLocaleDateString()

                        }

                    </span>

                </div>

            </div>

            <div className="booking-fare">

                <span>

                    Estimated Fare

                </span>

                <h2>

                    ₹

                    {

                        booking.estimatedFare.toLocaleString()

                    }

                </h2>

            </div>

            <button

                className="booking-view-btn"

                onClick={() => onView(booking)}

            >

                View Details

                <FaArrowRight />

            </button>

        </div>

    );

}

export default BookingCard;
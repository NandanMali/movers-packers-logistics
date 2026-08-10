function BookingCard({

    booking,

    onViewDetails

}) {

    return (

        <div className="admin-booking-card">

            <div className="booking-card-header">

                <h3>

                    {booking.bookingId}

                </h3>

                <span

                    className={

                        `booking-status ${

                            booking.status

                                ?.toLowerCase()

                                .replace(/\s+/g, "-")

                        }`

                    }

                >

                    {booking.status}

                </span>

            </div>


            <div className="booking-card-body">

                <p>

                    <strong>
                        Customer:
                    </strong>{" "}

                    {booking.customerName}

                </p>

                <p>

                    <strong>
                        Category:
                    </strong>{" "}

                    {booking.category}

                </p>

                <p>

                    <strong>
                        Pickup:
                    </strong>{" "}

                    {booking.pickupAddress}

                </p>

                <p>

                    <strong>
                        Drop:
                    </strong>{" "}

                    {booking.dropAddress}

                </p>

                <p>

                    <strong>
                        Distance:
                    </strong>{" "}

                    {booking.distance?.toFixed(1)} km

                </p>

            </div>


            <div className="booking-card-footer">

                <button

                    onClick={() =>
                        onViewDetails(booking)
                    }

                >

                    View Full Details

                </button>

            </div>

        </div>

    );

}

export default BookingCard;
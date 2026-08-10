import "../booking.css";

function Step6Summary({ booking, prevStep, submitBooking }) {

    return (

        <div className="booking-summary">

            <h2>Booking Summary</h2>

            <div className="summary-card">

                <div className="summary-row">
                    <span>Name</span>
                    <strong>{booking.customerName}</strong>
                </div>

                <div className="summary-row">
                    <span>Phone</span>
                    <strong>{booking.phone}</strong>
                </div>

                <div className="summary-row">
                    <span>Category</span>
                    <strong>{booking.category}</strong>
                </div>

                <div className="summary-row">
                    <span>Sub Category</span>
                    <strong>{booking.subCategory}</strong>
                </div>

                <div className="summary-row">
                    <span>Pickup</span>
                    <strong>{booking.pickup}</strong>
                </div>

                <div className="summary-row">
                    <span>Drop</span>
                    <strong>{booking.drop}</strong>
                </div>

                <div className="summary-row">
                    <span>Distance</span>
                    <strong>{booking.distance?.toFixed(2)} KM</strong>
                </div>

                <div className="summary-row">
                    <span>Duration</span>
                    <strong>{booking.duration?.toFixed(0)} Min</strong>
                </div>

                <div className="summary-row">
                    <span>Estimated Fare</span>
                    <strong>₹ {booking.estimatedFare}</strong>
                </div>

                <div className="summary-row">
                    <span>Your Offer</span>
                    <strong>₹ {booking.customerOffer}</strong>
                </div>

                {/* <div className="summary-buttons">

                    <button
                        className="secondary-btn"
                        onClick={prevStep}
                    >
                        Previous
                    </button>

                    <button
                        className="primary-btn"
                        onClick={submitBooking}
                    >
                        Confirm Booking
                    </button>

                </div> */}

            </div>

        </div>

    );

}

export default Step6Summary;
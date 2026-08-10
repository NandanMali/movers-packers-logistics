import "./paymentCards.css";

function BookingSummaryCard({ booking }) {


    return (

        <div className="payment-card">

            <h3>

                Booking Summary

            </h3>

            <div className="summary-row">

                <span>Booking ID</span>

                <strong>{booking?.bookingId}</strong>

            </div>

            <div className="summary-row">

                <span>Category</span>

                <strong>{booking?.category}</strong>

            </div>

            <div className="summary-row">

                <span>Pickup</span>

                <strong>{booking?.pickupAddress}</strong>

            </div>

            <div className="summary-row">

                <span>Drop</span>

                <strong>{booking?.dropAddress}</strong>

            </div>

            <div className="summary-row">

                <span>Distance</span>

                <strong>{booking?.distance?.toFixed(1)} KM</strong>

            </div>

        </div>

    );

}

export default BookingSummaryCard;
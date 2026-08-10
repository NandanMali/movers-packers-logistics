import "./bookingStatistics.css";

function BookingStatistics({ bookings }) {

    const total = bookings.length;

    const pending = bookings.filter(

        booking => booking.status === "Pending"

    ).length;

    const confirmed = bookings.filter(

        booking => booking.status === "Confirmed"

    ).length;

    const completed = bookings.filter(

        booking => booking.status === "Completed"

    ).length;

    return (

        <div className="booking-stats">

            <div className="stat-card">

                <h2>{total}</h2>

                <p>Total Bookings</p>

            </div>

            <div className="stat-card">

                <h2>{pending}</h2>

                <p>Pending</p>

            </div>

            <div className="stat-card">

                <h2>{confirmed}</h2>

                <p>Confirmed</p>

            </div>

            <div className="stat-card">

                <h2>{completed}</h2>

                <p>Completed</p>

            </div>

        </div>

    );

}

export default BookingStatistics;
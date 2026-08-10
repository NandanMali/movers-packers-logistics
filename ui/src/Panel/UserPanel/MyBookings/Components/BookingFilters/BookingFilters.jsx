import "./bookingFilters.css";

function BookingFilters({

    search,

    setSearch,

    status,

    setStatus

}) {

    return (

        <div className="booking-filters">

            <input

                type="text"

                placeholder="Search Booking ID"

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />

            <select

                value={status}

                onChange={(e)=>setStatus(e.target.value)}

            >

                <option value="All">

                    All Status

                </option>

                <option value="Pending">

                    Pending

                </option>

                <option value="Quote Accepted">

                    Quote Accepted

                </option>

                <option value="Confirmed">

                    Confirmed

                </option>

                <option value="Assigned">

                    Assigned

                </option>

                <option value="In Progress">

                    In Progress

                </option>

                <option value="Completed">

                    Completed

                </option>

                <option value="Cancelled">

                    Cancelled

                </option>

            </select>

        </div>

    );

}

export default BookingFilters;
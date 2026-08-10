import { useEffect, useState } from "react";
import axios from "axios";
import "./myBookings.css";
import BookingStatistics from "./Components/BookingStatistics/BookingStatistics";
import BookingFilters from "./Components/BookingFilters/BookingFilters";
import BookingCard from "./Components/BookingCard/BookingCard";

import { apiUrlUserBooking } from "../../../apiUrl";

import BookingDetails from "./BookingDetails";
import ReceivedQuotes from "../ReceivedQuotes/ReceivedQuotes";

function MyBookings() {

  const [bookings, setBookings] = useState([]);

  const [filteredBookings, setFilteredBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [showDetails, setShowDetails] = useState(false);

  const [showQuote, setShowQuote] = useState(false);

  //------------------------------------------

  const getBookings = async () => {
    try {
      const response = await axios.get(apiUrlUserBooking + "fetch", {
        params:
        {customerId: localStorage.getItem("_id"),
      }});

      setBookings(response.data.booking);

      setFilteredBookings(response.data.booking);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  //------------------------------------------

  useEffect(() => {
    getBookings();
  }, []);

  //------------------------------------------

  useEffect(() => {
    let data = [...bookings];

    if (search) {
      data = data.filter((booking) =>
        booking.bookingId

          .toLowerCase()

          .includes(search.toLowerCase()),
      );
    }

    if (status !== "All") {
      data = data.filter((booking) => booking.status === status);
    }

    setFilteredBookings(data);
  }, [search, status, bookings]);

  //------------------------------------------

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetails(true);
  };

  const handleviewQuote = (booking) => {
    setShowDetails(false);
    setSelectedBooking(booking);
    setShowQuote(true);
  };

  //------------------------------------------

  return (
    <div className="my-bookings-page">
      <BookingStatistics bookings={bookings} />

      <BookingFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {loading ? (
        <h3>Loading...</h3>
      ) : filteredBookings.length === 0 ? (
        <div className="empty-bookings">
          <h2>No Bookings Found</h2>
        </div>
      ) : (
        <div className="booking-grid">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onView={handleViewDetails}
            />
          ))}
        </div>
      )}

      <BookingDetails
        isOpen={showDetails}
        onClose={() => {
          setShowDetails(false);
        }}
        booking_Details={selectedBooking}
        onViewQuote={handleviewQuote}
      />

      <ReceivedQuotes
        isOpen={showQuote}
        onClose={() => setShowQuote(false)}
        booking={selectedBooking}
      />
    </div>
  );
}

export default MyBookings;

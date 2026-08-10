import { useEffect, useState } from "react";
import axios from "axios";

import BookingCard from "./BookingCard";
import BookingDetailsModal from "./BookingDetailsModal";

import "./bookings.css";

import { apiUrlUserBooking } from "../../../apiUrl";
import StatsCard from "../../../components/Dashboard/StatsCard/StatsCard";
import PageToolbar from "../../TransportPartnerPanel/components/PageToolbar/PageToolbar";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [showDetails, setShowDetails] = useState(false);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");
  const [statusFilter, setStatusFilter] = useState("All");

  //-------------------------------------

  const getBookings = async () => {
    try {
      const response = await axios.get(apiUrlUserBooking + "admin/all");

      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error) {}
  };

  //-------------------------------------

  useEffect(() => {
    getBookings();
  }, []);

  //-------------------------------------

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);

    setShowDetails(true);
  };

  //-------------------------------------

  const filteredbookings = bookings.filter((booking) => {
    const matchSearch =
      booking.bookingId.toLowerCase().includes(search.toLowerCase()) 

    const matchStatus =
      statusFilter === "All" || booking.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const sortedbookings = [...filteredbookings];

  switch (sort) {
    case "Newest":
      sortedbookings.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      break;

    case "Oldest":
      sortedbookings.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );

      break;

    default:
      break;
  }


  return (
    <div className="admin-bookings-page">
      <div className="admin-bookings-header">
        <div>
          <h2>Bookings</h2>
        </div>

        <div className="stats-grid">
          <StatsCard title="Total Bookings" value={bookings.length} />

          <StatsCard
            title="Pending"
            value={bookings.filter((booking) => booking.status === "Pending").length}
          />

          <StatsCard
            title="Accepted"
            value={
              bookings.filter((booking) => booking.status === "Accepted").length
            }
          />

          <StatsCard
            title="Confirmed"
            value={
              bookings.filter(
                (booking) =>
                  booking.status === "Confirmed"
              ).length
            }
          />

          <StatsCard
            title="Assigned"
            value={
              bookings.filter((booking) => booking.status === "Assigned").length
            }
          />

           <StatsCard
          title="In Progress"
          value={
            bookings.filter((booking) => booking.status === "In Progress" || booking.status === "Reached Pickup" || booking.status === "Pickup Completed" || booking.status === "Reached Destination").length
          }
        />

          <StatsCard
            title="Completed booking"
            value={
              bookings.filter((booking) => booking.status === "Completed").length
            }
          />
          <StatsCard
            title="Cancelled"
            value={
              bookings.filter((booking) => booking.status === "Cancelled").length
            }
          />
        </div>
      </div>

      <PageToolbar
          search={search}
          setSearch={setSearch}
          filter={statusFilter}
          setFilter={setStatusFilter}
          sort={sort}
          setSort={setSort}
          filterOptions={[ "All", "Pending","Confirmed","In Progress","Completed"]}
          sortOptions={["Newest", "Oldest"]}
          total={sortedbookings.length}
        />

        {filteredbookings.length === 0 ? (
            <div className="no-bookings">No bookings found.</div>
        ) : (
            <div className="admin-bookings-grid">
          {sortedbookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onViewDetails={handleViewDetails}
            />
          ))}
      </div>
        )}

      <BookingDetailsModal
        isOpen={showDetails}
        booking={selectedBooking}
        onClose={() => {
          setShowDetails(false);

          setSelectedBooking(null);
        }}
      />
    </div>
  );
}

export default AdminBookings;

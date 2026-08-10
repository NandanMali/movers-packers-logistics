import { useState, useEffect } from "react";
import axios from "axios";
import QuoteRequestCard from "./QuoteRequestsCard.jsx";
import "./quoteRequests.css";
import QuoteFilters from "./components/QuoteFilters.jsx";
import QuoteStatistics from "./components/QuoteStatistics.jsx";
import PriceSummary from "./components/PriceSummary.jsx";
import { apiUrlBookingQuote } from "../../../apiUrl.js";
import QuoteDetails from "./QuoteDetails.jsx";
import SendQuote from "./SendQuoteModal.jsx";
import PageToolbar from "../components/PageToolbar/PageToolbar.jsx";

function QuoteRequests() {
  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [showDetails, setShowDetails] = useState(false);

  const [sendQuotePage, setSendQuote] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [sort, setSort] = useState("Newest");

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    const partnerId = parseInt(localStorage.getItem("_id"));

    const response = await axios.get(
      apiUrlBookingQuote + `requests/${partnerId}`,
    );

    setRequests(response.data.requests);
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }

  const handleView = (booking) => {
    setSelectedBooking(booking);

    setShowDetails(true);
  };

  const handleSend = (booking) => {
    setShowDetails(false);

    setSelectedBooking(booking);

    setSendQuote(true);
  };

  const filteredrequests = requests.filter((request) => {
    const searchText = search.toLowerCase();
    const matchSearch = request.bookingId
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All" || request.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const sortedrequests = [...filteredrequests];

  switch (sort) {
    case "Newest":
      sortedrequests.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      break;

    case "Oldest":
      sortedrequests.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );

      break;

    default:
      break;
  }

  return (
    <div className="quote-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2>Quote Requests</h2>

          <p>View customer booking requests and send your quotation.</p>
        </div>
      </div>

     
      <PageToolbar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        sortOptions={["Newest", "Oldest"]}
        total={sortedrequests.length}
      />

      {/* Cards */}
      <div className="quote-grid">
        {filteredrequests.map((booking) => (
          <QuoteRequestCard
            key={booking._id}
            booking={booking}
            onViewDetails={handleView}
            onSendQuote={handleSend}
          />
        ))}
      </div>

      <QuoteDetails
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        booking_Details={selectedBooking}
        onSendQuote={handleSend}
      />

      <SendQuote
        isOpen={sendQuotePage}
        onClose={() => {
          setSendQuote(false);
        }}
        booking_Details={selectedBooking}
      />
    </div>
  );
}

export default QuoteRequests;

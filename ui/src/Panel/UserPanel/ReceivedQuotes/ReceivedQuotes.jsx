import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import "./receivedQuotes.css";

import QuoteHeader from "./Components/QuoteHeader/QuoteHeader";
import QuoteFilters from "../../TransportPartnerPanel/QuoteRequests/components/QuoteFilters";
import PartnerQuoteCard from "./Components/PartnerQuoteCard/PartnerQuoteCard";
// import EmptyQuotes from "./Components/EmptyQuotes";

import AcceptQuoteModal from "./Modals/AcceptQuoteModal";

import { apiUrlBookingQuote } from "../../../apiUrl";
import ModalLayout from "../../TransportPartnerPanel/components/ModalLayout/ModalLayout";
import Payment from "../Payment/Payment";
import EmptyQuote from "./Components/QuoteHeader/EmptyQuotes";

function ReceivedQuotes({ isOpen, onClose, booking }) {
  const navigate = useNavigate();

  const [quotes, setQuotes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedQuote, setSelectedQuote] = useState(null);

  const [showAccept, setShowAccept] = useState(false);

  const [sortBy, setSortBy] = useState("price");

  const [showPay, setShowPay] = useState(false);

  const getQuotes = async () => {
    try {
      const response = await axios.get(
        apiUrlBookingQuote + "customer/" + booking._id,
      );

      setQuotes(response.data.quotes);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      getQuotes();
    }, [booking]);
    if (!isOpen) return null;

  
//   const bookingId = booking._id;
  const handleAccept = (quote) => {
    setSelectedQuote(quote);

    setShowAccept(true);
  };

  const handlePayment = (quote) => {
    setShowAccept(false);
    getQuotes();
    const id=quote._id;
    navigate(`/user/mybookings/payment/${id}/${booking._id}`)
  };

  return (
    <>
      <ModalLayout onClose={onClose} >
      <div className="model-overlay">
        <div className="received-quotes-page">

          {loading ? (
            <p>Loading Quotes...</p>
          ) : quotes.length === 0 ? (
            <EmptyQuote />
          ) : (
            <>
              <QuoteHeader bookingId={booking._id} totalQuotes={quotes.length} />

              <div className="partner-quote-grid">
                {quotes.map((quote) => (
                  <PartnerQuoteCard
                    key={quote._id}
                    quote={quote}
                    booking={booking}

                    onAccept={() => handleAccept(quote)}
                  />
                ))}
              </div>
            </>
          )}

          <AcceptQuoteModal
            isOpen={showAccept}
            quote={selectedQuote}
            onClose={() => setShowAccept(false)}
            onSuccess={()=>{handlePayment(selectedQuote)}}
          />
        </div>

        
      </div>
         </ModalLayout>
    </>
  );
}

export default ReceivedQuotes;

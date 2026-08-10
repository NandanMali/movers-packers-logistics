import { useState } from "react";
import axios from "axios";
import "./acceptQuoteModal.css";
import { apiUrlBookingQuote } from "../../../../apiUrl";
import Alert from "../../../../components/Alert/alert";

function AcceptQuoteModal({
  isOpen,

  quote,

  onClose,

  onSuccess
}) {
  const [loading, setLoading] = useState(false);

  const [alertData,setAlert]=useState(null);

  if (!isOpen || !quote) return null;

  const handleAccept = async () => {
    try {
      setLoading(true);

      await axios.patch(
        apiUrlBookingQuote + "accept",

        {
          bookingId: quote.bookingId,

          quoteId: quote._id,

          partnerId: quote.partnerId,

        },
      );

      setAlert({
        message:"Quote Accepted",
        type:"successAlert"
      })

      
      onSuccess(quote);
      setTimeout(() => {
        setAlert(null);
        
        onClose();
      }, 2000);
    } catch (error) {

      setAlert({
        message:"Something Went Wrong...",
        type:"errorAlert"
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {alertData && <Alert message={alertData.message} type={alertData.type} />}
    <div className="modal-overlay">
      <div className="accept-modal">
        <h2>Accept Quote</h2>

        <p>You are going to accept this quotation.</p>

        <div className="quote-summary">
          <div>
            <strong>Company</strong>

            <span>{quote.companyName}</span>
          </div>

          <div>
            <strong>Price</strong>

            <span>₹{quote.estimatedPrice}</span>
          </div>

          <div>
            <strong>Delivery</strong>

            <span>{quote.estimatedDays}</span>
          </div>
        </div>

        <div className="warning-box">
          After accepting this quote:
          <ul>
            <li>Other quotations will be rejected.</li>

            <li>You'll proceed to payment.</li>
          </ul>
        </div>

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose} disabled={loading}>
            Cancel
          </button>

          <button
            className="accept-btn"
            onClick={handleAccept}
            disabled={loading}
          >
            {loading ? "Please Wait..." : "Accept Quote"}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default AcceptQuoteModal;

import "./partnerQuoteCard.css";

function PartnerQuoteCard({
  quote,

  booking,

  onView,

  onAccept,
}) {

  return (
    <div className="partner-quote-card">
      <div className="partner-card-top">
        {/* <img

                    src={
                        quote.companyLogo
                            ?
                            quote.companyLogo
                            :
                            "/images/company.png"
                    }

                    alt="Company"

                    className="partner-logo"

                /> */}

        <div>
          <h1>Quote # {quote._id}</h1>
        </div>
      </div>

      <div className="quote-price">
        <strong>Quoted Price</strong>

        <h2>₹{quote.estimatedPrice.toLocaleString()}</h2>
      </div>

      <div className="quote-days">
        <strong>Estimated Delivery</strong>

        <span>{quote.estimatedDays}</span>
      </div>

      {quote.message && (
        <div className="quote-message">
          <strong>Message</strong>

          <p>{quote.message}</p>
        </div>
      )}

      <div
       >
        <button
         className="quote-btn" style={{width:"100%"}}
          onClick={() => {
            onAccept(quote);
          }}
        >
          Accept Quote
        </button>
      </div>
    </div>
  );
}

export default PartnerQuoteCard;

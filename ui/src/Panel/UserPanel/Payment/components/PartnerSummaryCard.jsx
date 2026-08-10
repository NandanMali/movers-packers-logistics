import "./paymentCards.css";

function PartnerSummaryCard({ quote }) {
    if (!quote) {
        return null;
    }

    return (

        <div className="payment-card">

            <h3>

                Partner Details

            </h3>

            <div className="summary-row">

                <span>Vehicle</span>

                <strong>{quote?.vehicleType}</strong>

            </div>

            <div className="summary-row">

                <span>Delivery</span>

                <strong>

                    {quote?.estimatedDays} 

                </strong>

            </div>

             <div className="summary-row">

                <span>Partner Message</span>

                <strong>{quote?.message || "Partner didn't mwntion anything"}</strong>

            </div>

        </div>

    );

}

export default PartnerSummaryCard;
import "./paymentCards.css";

function PaymentSummaryCard({ quote }) {
    if (!quote) {
        return null;
    }

    return (

        <div className="payment-card">

            <h3>

                Payment Summary

            </h3>

            <div className="summary-row">

                <span>Quoted Price</span>

                <strong>

                    ₹{quote.estimatedPrice}

                </strong>

            </div>

            <div className="summary-row">

                <span>Platform Fee( + 1%)</span>

                <strong>

                    ₹ {quote.estimatedPrice / 100}

                </strong>

            </div>

            <div className="summary-row">

                <span>Taxes</span>

                <strong>

                    ₹0

                </strong>

            </div>

            <hr/>

            <div className="summary-row total-row">

                <span>Total</span>

                <strong>

                    ₹{quote.estimatedPrice + (quote.estimatedPrice/100)}

                </strong>

            </div>

        </div>

    );

}

export default PaymentSummaryCard;
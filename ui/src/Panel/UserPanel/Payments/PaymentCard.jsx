import "./paymentCard.css";

function PaymentCard({ item, openReceipt }) {
  const {
    payment,

    partner,
  } = item;

  return (
    <div className="payment-card">
      <div className="payment-top">
        <h3>Booking #{payment.bookingId}</h3>

        <span className="paid-status">{payment.paymentStatus}</span>
      </div>

      <div className="payment-body">
        <p>
          <strong>Partner :</strong>

          {partner?.companyName}
        </p>

        <p>
          <strong>Amount :</strong>₹{payment.amount}
        </p>

        <p>
          <strong>Method :</strong>

          {payment.paymentMethod}
        </p>

        <p>
          <strong>Transaction :</strong>

          {payment.transactionId}
        </p>

        <p>
          <strong>Date :</strong>

          {new Date(payment.paidAt).toLocaleDateString()}
        </p>
      </div>

      <button onClick={() => openReceipt(payment.bookingId)}>
        View Receipt
      </button>
    </div>
  );
}

export default PaymentCard;

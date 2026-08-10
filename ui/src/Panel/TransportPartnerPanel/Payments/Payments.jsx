import { useEffect, useState } from "react";
import axios from "axios";

import "./payments.css";
import { apiUrlPayment } from "../../../apiUrl";
import PaymentCard from "./PaymentCard";
import PaymentReceiptModal from "../../../components/PaymentReceipt/PaymentReceiptModal";

function PartnerPayments() {
  const [payments, setPayments] = useState([]);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const [receipt, setReceipt] = useState(null);

  const fetchPayments = async () => {
    const partnerId = localStorage.getItem("_id");

    try {
      const response = await axios.get(
        apiUrlPayment + "partner/" + partnerId,
      );

      if (response.data.success) {
        setPayments(response.data.payments);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const openReceipt = async (bookingId) => {
    try {
      const response = await axios.get(apiUrlPayment + "completereceipt/" + bookingId);

      if (response.data.success) {
        setReceipt(response.data.receipt);
        setIsReceiptOpen(true);
      }
    } catch (error) {
    }
  };

  return (
    <div className="payments-page">
      <div className="payments-header">
        <h2>My Earnings</h2>

        <p>View all successful payments.</p>
      </div>

      <div className="payments-list">
        {payments.length > 0 ? (
          payments.map((item) => (
            <PaymentCard
              key={item.payment._id}
              item={item}
              openReceipt={openReceipt}
            />
          ))
        ) : (
          <div className="empty-payment">Earning Not Started</div>
        )}
      </div>

      <PaymentReceiptModal
        isOpen={isReceiptOpen}
        receipt={receipt}
        onClose={() => {
          setIsReceiptOpen(false);

          setReceipt(null);
        }}
      />
    </div>
  );
}

export default PartnerPayments;

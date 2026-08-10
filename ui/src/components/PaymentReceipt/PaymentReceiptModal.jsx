import "./paymentReceiptModal.css";

import { FaTimes } from "react-icons/fa";

function PaymentReceiptModal({

    isOpen,

    onClose,

    receipt

}) {

    if (

        !isOpen ||

        !receipt

    ) {

        return null;

    }

    const {

        payment,

        booking,

        customer,

        partner,

        partnerProfile,

        quote

    } = receipt;

    return (

        <div className="receipt-overlay">

            <div className="receipt-modal">

                <div className="receipt-header">

                    <h2>

                        Payment Receipt

                    </h2>

                    <button

                        onClick={onClose}

                    >

                        <FaTimes/>

                    </button>

                </div>

                {/* -------------------- */}

                <div className="receipt-section">

                    <h3>

                        Payment Information

                    </h3>

                    <div className="receipt-grid">

                        <p>

                            <strong>

                                Payment ID

                            </strong>

                            {payment?._id}

                        </p>

                        <p>

                            <strong>

                                Booking ID

                            </strong>

                            {payment?.bookingId}

                        </p>

                        <p>

                            <strong>

                                Transaction ID

                            </strong>

                            {payment?.transactionId}

                        </p>

                        <p>

                            <strong>

                                Amount

                            </strong>

                            ₹{payment?.amount}

                        </p>

                        <p>

                            <strong>

                                Method

                            </strong>

                            {payment?.paymentMethod}

                        </p>

                        <p>

                            <strong>

                                Status

                            </strong>

                            {payment?.paymentStatus}

                        </p>

                        <p>

                            <strong>

                                Paid On

                            </strong>

                            {

                                new Date(

                                    payment?.paidAt

                                ).toLocaleString()

                            }

                        </p>

                    </div>

                </div>

                {/* -------------------- */}

                <div className="receipt-section">

                    <h3>

                        Customer Information

                    </h3>

                    <div className="receipt-grid">

                        <p>

                            <strong>

                                Name

                            </strong>

                            {customer?.name}

                        </p>

                        <p>

                            <strong>

                                Email

                            </strong>

                            {customer?.email}

                        </p>

                        <p>

                            <strong>

                                Phone

                            </strong>

                            {customer?.phone}

                        </p>

                    </div>

                </div>

                {/* -------------------- */}

                <div className="receipt-section">

                    <h3>

                        Partner Information

                    </h3>

                    <div className="receipt-grid">

                        <p>

                            <strong>

                                Company

                            </strong>

                            {partnerProfile?.companyName}

                        </p>

                        <p>

                            <strong>

                                Owner

                            </strong>

                            {partner?.name}

                        </p>

                        <p>

                            <strong>

                                Phone

                            </strong>

                            {partner?.phone}

                        </p>

                    </div>

                </div>

                {/* -------------------- */}

                <div className="receipt-section">

                    <h3>

                        Booking Information

                    </h3>

                    <div className="receipt-grid">

                        <p>

                            <strong>

                                Pickup

                            </strong>

                            {booking?.pickupAddress}

                        </p>

                        <p>

                            <strong>

                                Drop

                            </strong>

                            {booking?.dropAddress}

                        </p>

                        <p>

                            <strong>

                                Vehicle

                            </strong>

                            {quote?.vehicleType}

                        </p>

                        <p>

                            <strong>

                                Price

                            </strong>

                            ₹{quote?.estimatedPrice}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PaymentReceiptModal;
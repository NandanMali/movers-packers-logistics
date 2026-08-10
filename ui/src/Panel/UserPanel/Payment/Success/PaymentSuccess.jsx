import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./paymentSuccess.css";
import { apiUrlPayment } from "../../../../apiUrl";

function PaymentSuccess() {

    const navigate = useNavigate();

const [searchParams] = useSearchParams();

const bookingId = searchParams.get("bookingId");

const [receipt, setReceipt] = useState(null);

const fetchReceipt = async () => {

    try {

        const response = await axios.get(

            apiUrlPayment +

            "receipt/" +

            bookingId

        );

        if (response.data.success) {

            setReceipt(response.data);

        }

    }

    catch (error) {


    }

};

useEffect(() => {

    fetchReceipt();

}, []);

if (!receipt) {

    return <h2>Loading Receipt...</h2>;

}

const {

    booking,

    quote,
} = receipt;

    return (

        <div className="payment-success-page">

            <div className="success-card">

                <FaCheckCircle className="success-icon"/>

                <h1>

                    Payment Successful

                </h1>

                <p>

                    Your booking has been confirmed successfully.

                </p>

                <div className="success-details">

                    <div className="detail-row">

                        <span>

                            Booking ID

                        </span>

                        <strong>

                            {bookingId}

                        </strong>

                    </div>

                    <div className="detail-row">

                        <span>

                            Partner ID

                        </span>

                        <strong>

                            {quote.partnerId}

                        </strong>

                    </div>

                    <div className="detail-row">

                        <span>

                            Amount Paid

                        </span>

                        <strong>

                            ₹{quote.estimatedPrice}

                        </strong>

                    </div>

                    <div className="detail-row">

                        <span>

                            Payment Method

                        </span>

                        <strong>

                            {booking?.paymentMethod}

                        </strong>

                    </div>

                </div>

                <button

                    className="success-btn"

                    onClick={() =>

                        navigate("/user/mybookings")

                    }

                >

                    Go To My Bookings

                </button>

            </div>

        </div>

    );

}

export default PaymentSuccess;
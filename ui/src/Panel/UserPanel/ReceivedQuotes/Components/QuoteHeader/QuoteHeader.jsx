import { FaArrowLeft } from "react-icons/fa";
import "./quoteHeader.css";

function QuoteHeader({

    bookingId,

    totalQuotes,

}) {

    return (

        <div className="quote-header">

            {/* <button

                className="back-btn"

                onClick={onBack}

            >

                <FaArrowLeft />

            </button> */}

            <div>

                <h2>

                    Received Quotes

                </h2>

                <p>

                    Booking ID : {bookingId}

                </p>

            </div>

            <div className="quote-count">

                <span>

                    {totalQuotes}

                </span>

                <small>

                    Quotes Received

                </small>

            </div>

        </div>

    );

}

export default QuoteHeader;
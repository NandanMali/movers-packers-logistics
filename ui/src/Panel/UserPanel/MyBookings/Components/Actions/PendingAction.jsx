import { FaFileInvoiceDollar } from "react-icons/fa";

function PendingAction({

    booking,

    onViewQuotes

}) {

    return (

        <div className="booking-action-card">

            <h3>

                Waiting For Quotations

            </h3>

            <p>

                Your booking has been published.

                Partners are sending quotations.

            </p>

            {

                booking.receivedQuotes > 0 && (

                    <button

                        className="primary-btn"

                        onClick={() =>

                            onViewQuotes(booking)

                        }

                    >

                        <FaFileInvoiceDollar />

                        View Received Quotes

                        ({booking.receivedQuotes})

                    </button>

                )

            }

        </div>

    );

}

export default PendingAction;
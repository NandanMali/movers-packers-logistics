import {

    FaStar,

    FaFileDownload

} from "react-icons/fa";

function CompletedAction({

    onRate,

    onInvoice

}) {

    return (

        <div className="booking-action-card">

            <h3>

                Booking Completed

            </h3>

            <div className="action-buttons">

                <button

                    className="primary-btn"

                    onClick={onRate}

                >

                    <FaStar />

                    Rate Partner

                </button>

                <button

                    className="secondary-btn"

                    onClick={onInvoice}

                >

                    <FaFileDownload />

                    Invoice

                </button>

            </div>

        </div>

    );

}

export default CompletedAction;
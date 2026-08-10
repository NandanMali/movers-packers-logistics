import { FaLocationArrow } from "react-icons/fa";

function InProgressAction({

    onTrack

}) {

    return (

        <div className="booking-action-card">

            <h3>

                Trip In Progress

            </h3>

            <button

                className="primary-btn"

                onClick={onTrack}

            >

                <FaLocationArrow />

                Live Tracking

            </button>

        </div>

    );

}

export default InProgressAction;
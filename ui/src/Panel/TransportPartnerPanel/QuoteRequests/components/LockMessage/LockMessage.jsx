import { FaLock } from "react-icons/fa";
import "./lockMessage.css";

function LockMessage({

    title = "Contact Information Locked",

    message = "Customer and Partner contact details will become visible after the booking is confirmed and payment is completed."

}) {

    return (

        <div className="lock-message">

            <div className="lock-icon">

                <FaLock />

            </div>

            <div className="lock-content">

                <h4>

                    {title}

                </h4>

                <p>

                    {message}

                </p>

            </div>

        </div>

    );

}

export default LockMessage;
import { FaArrowLeft } from "react-icons/fa";
import "./quoteHeader.css";

function EmptyQuote() {

    return (

        <div className="quote-header">

            
            <div>

                <h2>

                  No Received Quotes

                </h2>

            </div>

            <div className="quote-count">

                <span>

0
                </span>

                <small>

                    Quotes Received

                </small>

            </div>

        </div>

    );

}

export default EmptyQuote;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
    FaArrowLeft,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaTruckMoving,
    FaWeightHanging,
    FaHome,
    FaUsers,
    FaBuilding,
    FaStickyNote,
    FaMoneyBillWave,
    FaPhoneAlt,
    FaClock
} from "react-icons/fa";

import "./quoteDetails.css";

import {
    apiUrlUserBooking,
    bookinguploadurl
} from "../../../apiUrl";
import ModalLayout from "../components/ModalLayout/ModalLayout";
import ContactCard from "./components/Contactcard/ContactCard";
import LockMessage from "./components/LockMessage/LockMessage";

function QuoteDetails({
    isOpen,
    onClose,
    booking_Details,
    onSendQuote,
}) {


    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);

    const [loading, setLoading] = useState(true);

    const [canViewContact,setcanViewContact] = useState(false);

    const notgiven=" Info Not Given";
    

    const getBooking = async () => {

try{
            setLoading(true);

            
            setBooking(booking_Details);

            setLoading(false);
}
catch{}

    };

    useEffect(() => {
        
        getBooking();
        
    }, [booking_Details]);
    if (!isOpen) {return null;}


    if (loading) {

        return (

            <div className="quote-details-loading">

                Loading Booking...

            </div>

        );

    }

    if (!booking) {

        return (

            <div className="quote-details-loading">

                Booking Not Found

            </div>

        );

    }
    

    return (
         <ModalLayout onClose={onClose} >

            
        <div className="quote-details-page">

            {/* Header */}

            <div className="details-header">

                

                
                <div> 

                    <h2>

                        Booking #

                        {booking._id}

                    </h2>

                    <p>

                        Review booking information before sending quotation.

                    </p>

                </div>

            </div>

            {/* Status */}

            <div className="booking-status-card">

                <span className="waiting-status">

                    Waiting For Quote

                </span>

            </div>

            <ContactCard

    title="Customer Information"

    name={booking.customerName}

    phone={booking.mobile}

    email={booking.email}

    address={booking.pickupAddress}

    showContact={canViewContact}

/>

{

    !canViewContact &&
<>
    <LockMessage />
    <br/>
</>
}


            {/* Pickup */}

            <div className="details-card">

                <h3>

                    Pickup Information

                </h3>

                <div className="details-grid">

                    <div>

                        <FaMapMarkerAlt />

                        <span>

                            {booking.pickupAddress}

                        </span>

                    </div>

                    <div>

                        <FaBuilding />

                        <span>

                            Floor :

                            {booking.pickupFloor ? booking.pickupFloor : notgiven}

                        </span>

                    </div>

                    <div>

                        <FaHome />

                        <span>

                            Lift :

                            {booking.pickupLift ? booking.pickupLift : " Available"}

                        </span>

                    </div>

                    <div>

                        <FaPhoneAlt />

                        <span>

                            {booking.mobile}

                        </span>

                    </div>

                </div>

            </div>

            {/* Drop */}

            <div className="details-card">

                <h3>

                    Drop Information

                </h3>

                <div className="details-grid">

                    <div>

                        <FaMapMarkerAlt />

                        <span>

                            {booking.dropAddress}

                        </span>

                    </div>

                    <div>

                        <FaBuilding />

                        <span>

                            Floor : 

                            {booking.dropFloor ? booking.dropFloor : notgiven}

                        </span>

                    </div>

                    <div>

                        <FaHome />

                        <span>

                            Lift :

                            {booking.dropLift ? booking.dropLift : " Available"}

                        </span>

                    </div>

                </div>

            </div>

            {/* Moving Details */}

            <div className="details-card">

                <h3>

                    Moving Details

                </h3>

                <div className="moving-grid">

                    <div>

                        <FaTruckMoving />

                        <span>

                            Service

                        </span>

                        <strong>

                            {booking.category}

                        </strong>

                    </div>

                    <div>

                        <FaHome />

                        <span>

                            Items

                        </span>

                        <strong>

                            {booking.subCategory}

                        </strong>

                    </div>

                    <div>

                        <FaUsers />

                        <span>

                            Workers

                        </span>

                        <strong>

                            {booking.workersNeeded ? booking.workersNeeded : "Not Needed"}

                        </strong>

                    </div>

                    <div>

                        <FaCalendarAlt />

                        <span>

                            Moving Date

                        </span>

                        <strong>

                            {booking.bookingDate ? booking.bookingDate : "Decided After Booking"}

                        </strong>

                    </div>

                    <div>

                        <FaClock />

                        <span>

                            Preferred Time

                        </span>

                        <strong>

                            {booking.preferredTime ? booking.preferredTime : notgiven}

                        </strong>

                    </div>

                </div>

            </div>

            {/* Distance */}

            <div className="details-card">

                <h3>

                    Distance

                </h3>

                <div className="distance-box">

                    <FaMapMarkerAlt />

                    <span>

                        {parseInt(booking.distance)} KM

                    </span>

                </div>

            </div>

            {/* Notes */}

            <div className="details-card">

                <h3>

                    Customer Notes

                </h3>

                <div className="note-box">

                    <FaStickyNote />

                    <p>

                        {

                            booking.note ||

                            "No additional instructions."

                        }

                    </p>

                </div>

            </div>

            {/* Images */}

            <div className="details-card">

                <h3>

                    Uploaded Images

                </h3>

                <div className="image-grid">

                    {

                        booking.images &&
                        booking.images.length > 0 ?

                            booking.images.map((image, index) => (

                                <img

                                    key={index}

                                    src={bookinguploadurl+ image}

                                    alt="booking"

                                    className="booking-image"

                                />

                            ))

                            :

                            <p>

                                No Images Uploaded

                            </p>

                    }

                </div>

            </div>

            {/* Budget */}

            <div className="details-card budget-card">

                <FaMoneyBillWave />

                <div>

                    <p>

                        Estimated Budget

                    </p>

                    <h2>

                        ₹ {booking.estimatedFare} - {booking.estimatedFare+2000}

                    </h2>

                </div>

            </div>


            <div className="details-card budget-card">

                <FaMoneyBillWave />

                <div>

                    <p>

                        Customer Offered

                    </p>

                    <h2>

                        ₹ {booking.customerOffer}

                    </h2>

                </div>

            </div>

            {/* Footer */}

            <div className="quote-action">

                <button

                    className="quote-btn"
                    style={{width:"100%"}}
                    

                    onClick={onSendQuote}

                >

                    Enter Your Quote

                </button>

            </div>

        </div>
        </ModalLayout>

    );

}

export default QuoteDetails;
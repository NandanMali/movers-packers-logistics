import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./payment.css";

import PartnerSummaryCard from "./components/PartnerSummaryCard";
import PaymentSummaryCard from "./components/PaymentSummaryCard";

import BookingSummaryCard from "./components/BookingSummaryCard";
import { apiUrlBookingQuote, apiUrlPayment, apiUrlUserBooking } from "../../../apiUrl";
import axios from "axios";
import Alert from "../../../components/Alert/alert";

function BookingPayment() {
    const [alertData,setAlert]=useState(null);

    const [quote,setQuote]=useState(null);

    const [booking,setBooking] =useState(null);

const {quoteId , bookingId } =useParams();
    //----------------------------------------

    const fetch = async () =>{
        await axios.get(apiUrlBookingQuote+"id",{
            params:{
                _id:quoteId
            }}).then((res)=>{
                setQuote(res.data.quote[0]);
                
            })
        

        await axios.get(apiUrlUserBooking+"fetch",{
            params:{
                _id:bookingId
            }
        }).then((res)=>{
            setBooking(res.data.booking[0])
        })
    }

    useEffect(()=>{
        fetch()
    },[])
const handlePayment = async () => {

    try {

        const response = await axios.post(

            apiUrlPayment + "create-session",

            {

                bookingId: bookingId,

                customerId:
                    Number(
                        localStorage.getItem("_id")
                    ),

                quoteId:quoteId,
                    

                email:
                    localStorage.getItem("email")

            }

        );


        if (response.data.success) {

            window.location.href =
                response.data.url;

        }

    }

    catch (error) {

        setAlert({
        message:"Unable to start payment",
        type:"errorAlert"
      })

    }

};    

    //----------------------------------------

    return (

        <div className="payment-page">
            {alertData && <Alert message={alertData.message} type={alertData.type} />}

            <div className="payment-header">

                <h2>

                    Complete Payment

                </h2>

            </div>

            <div className="payment-layout">

                <div className="payment-left">

                    <BookingSummaryCard

                        booking={booking}

                    />

                    <PartnerSummaryCard

                        quote={quote}

                    />

                </div>

                <div className="payment-right">

                    <PaymentSummaryCard

                        quote={quote}

                    />

                    {/* <PaymentMethods

                        paymentMethod={paymentMethod}

                        setPaymentMethod={setPaymentMethod}

                    /> */}

                    <button

                        className="pay-btn"

                        onClick={handlePayment}

                    >

                        Pay ₹{quote?.estimatedPrice + (quote?.estimatedPrice/100)}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default BookingPayment;
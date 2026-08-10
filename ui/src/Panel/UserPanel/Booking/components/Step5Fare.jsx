function Step5Fare({
    booking,
    setBooking
}){
    return(
        <div className="booking-card">

    <h2>

        Your Offer

    </h2>

    <p>

        Estimated Fare :
        ₹ {booking.estimatedFare}

    </p>

    <div className="input-group">

        <label>

            Your Budget

        </label>

        <input

            type="number"

            value={booking.customerOffer}

            onChange={(e)=>

                setBooking({

                    ...booking,

                    customerOffer:e.target.value

                })

            }

            placeholder="Enter Your Budget"

        />

    </div>

</div>
    )
}


export default Step5Fare;
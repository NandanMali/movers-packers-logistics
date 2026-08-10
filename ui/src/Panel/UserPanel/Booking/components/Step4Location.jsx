import { useState } from "react";
import "../booking.css";
import LocationMap from "./LocationMap";
import LocationSearch from "./LocationSearch";

const Step4Location = ({ booking, setBooking }) => {

    const [pickupLocation,setPickupLocation]=useState(null);

const [dropLocation,setDropLocation]=useState(null);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setBooking({

            ...booking,

            [name]: value

        });

    };

    const handlePickup = (location) => {

    setBooking({

        ...booking,

        pickup: location.display_name,

        pickupCoordinates: {

            lat: Number(location.lat),

            lng: Number(location.lon)

        }

    });

};


const handleDrop = (location) => {

    setBooking({

        ...booking,

        drop: location.display_name,

        dropCoordinates: {

            lat: Number(location.lat),

            lng: Number(location.lon)

        }

    });

};

    return (

         <div className="booking-card">

            <h2>Pickup & Drop Location</h2>

           <LocationSearch

label="Pickup Address"

onSelect={handlePickup}

/>

<LocationSearch

label="Drop Address"

onSelect={handleDrop}

/>

            {/* 👇 Yahan se Map Start hoga */}

           <LocationMap

booking={booking}

setBooking={setBooking}

/>

<div className="fare-card">

    <h3>

        Estimated Trip

    </h3>

    <p>

        Distance :

        <strong>

            {(booking.distance ?? 0).toFixed(2)} KM

        </strong>

    </p>

    <p>

        Duration :

        <strong>

            {(booking.duration ?? 0).toFixed(0)} Minutes

        </strong>

    </p>

    <p>

        Estimated Fare :

        <strong>

            ₹ {booking.estimatedFare ?? 0}

        </strong>

    </p>

</div>

<div className="location-actions">

    <button

        type="button"

        onClick={() =>

            setBooking({

                ...booking,

                pickup: "",

                pickupCoordinates: null

            })

        }

    >

        Reset Pickup

    </button>

    <button

        type="button"

        onClick={() =>

            setBooking({

                ...booking,

                drop: "",

                dropCoordinates: null

            })

        }

    >

        Reset Drop

    </button>

</div>
        </div>

    );
};

export default Step4Location;
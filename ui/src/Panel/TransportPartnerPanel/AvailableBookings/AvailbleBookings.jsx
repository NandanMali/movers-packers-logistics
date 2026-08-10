import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrlPartner } from "../../../apiUrl";
import BookingCard from "./BookingCard";

function AvailableBookings() {

    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadBookings();

    }, []);

    const loadBookings = async () => {

        try {

            const response = await axios.get(

                apiUrlPartner + "booking/available"

            );

            setBookings(response.data.bookings);

        }

        catch(error){


        }

        finally{

            setLoading(false);

        }

    };

    if(loading){

        return <h2>Loading...</h2>;

    }

    return(

        <div className="available-bookings">

            <div className="page-header">

                <h2>

                    Available Bookings

                </h2>

                <p>

                    Submit quotation for nearby customers

                </p>

            </div>

            <div className="booking-grid">

                {

                    bookings.map((booking)=>(

                        <BookingCard

                            key={booking._id}

                            booking={booking}

                            refresh={loadBookings}

                        />

                    ))

                }

            </div>

        </div>

    );

}

export default AvailableBookings;
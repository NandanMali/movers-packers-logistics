import { useEffect } from "react";
import "../booking.css";

const Step1Customer = ({ booking, setBooking }) => {

    const handleChange = (e) => {

        setBooking({

            ...booking,

            [e.target.name]: e.target.value

        });

    };

    return (

        <div className="booking-card">

            <h2>

                Customer Details

            </h2>

            <p>

                Fill your personal information.

            </p>

            <div className="booking-grid">

                <div className="input-group">

                    <label>

                        Full Name

                    </label>

                    <input

                        type="text"

                        name="customerName"

                        value={booking.customerName}

                        onChange={handleChange}

                        placeholder="Enter Full Name"

                    />

                </div>

                <div className="input-group">

                    <label>

                        Phone Number

                    </label>

                    <input

                        type="tel"

                        name="phone"

                        value={booking.phone}

                        onChange={handleChange}

                        placeholder="Enter Phone Number"

                    />

                </div>

                <div className="input-group">

                    <label>

                        Email

                    </label>

                    <input

                        type="email"

                        name="email"

                        value={booking.email}

                        onChange={handleChange}

                        placeholder="Enter Email"

                    />

                </div>

                <div className="input-group">

                    <label>

                        Moving Date

                    </label>

                    <input

                        type="date"

                        name="movingDate"

                        value={booking.movingDate}

                        onChange={handleChange}

                    />

                </div>

            </div>

        </div>

    );

};

export default Step1Customer;

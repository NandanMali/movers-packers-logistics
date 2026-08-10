import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./quoteRequests.css";
import { apiUrlBookingQuote, apiUrlPartnerVehicle, apiUrlUserBooking } from "../../../apiUrl";
import ModalLayout from "../components/ModalLayout/ModalLayout";
import { FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Alert from "../../../components/Alert/alert";


function SendQuote({
    isOpen,
    onClose,
    booking_Details
}) {

    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);

    const [vehicles, setVehicles] = useState([]);

    const [loading, setLoading] = useState(false);

    const [alertData,setAlert]=useState(null);

    const [formData, setFormData] = useState({

        estimatedPrice: "",

        estimatedDays: "",

        vehicleType:"",

        message: ""

    });
    //---------------------------------------------
    
    const getBooking = () => {
            setBooking(booking_Details);
        };

    //---------------------------------------------

    const getVehicles = async () => {
        
        try {
            const id=localStorage.getItem("_id");
            
            const response = await axios.get(
                
                apiUrlPartnerVehicle +
                
                "fetch" ,
                
                {params:{partnerId : id
                }}
            );
            
            setVehicles(response.data);

        }

        catch (error) {
        }
        
    };
    
    //---------------------------------------------
    
    useEffect(() => {

        getBooking();
        
        getVehicles();
        
    }, [booking_Details]);
    
    if(!isOpen) return null;
    //---------------------------------------------

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    //---------------------------------------------

    const handleSubmit = async (e) => {

        e.preventDefault();
        setAlert(null);

        try {

            setLoading(true);

            await axios.post(

                apiUrlBookingQuote + "send",

                {

                    bookingId: booking._id,

                    partnerId: localStorage.getItem("_id"),

                    estimatedPrice: formData.estimatedPrice,

                    estimatedDays: formData.estimatedDays,

                    vehicleType:formData.vehicleType,

                    message: formData.message

                }

            );

            setAlert({
                message:"Quote Sent Successfully",
                type:"successAlert"
            })

setTimeout(() => {
    onClose();
}, 3000);
        }

        catch (error) {

            setAlert({
                message:"Unable to send quote.",
                type:"errorAlert"
            })


        }

        finally {

            setLoading(false);

        }

    };


    //---------------------------------------------

    return (
        <ModalLayout title="Send Quote" onClose={onClose}>
            {alertData && <Alert message={alertData.message} type={alertData.type}/> }

        <div className="send-quote-page">

            <div className="send-quote-card">

                {

                    booking &&

                    <div className="booking-summary">

                        

                            <strong>

                                Booking # 

                            {booking._id}
                            </strong>


                

                        <p>

                            {booking.pickupAddress}
                            <br/>
<div style={{alignItems:"center"}}>

                           <strong>
                             <FaArrowDown />
                            </strong>
</div>
                            {booking.dropAddress}

                        </p>

                    </div>

                }
                <br/><br/>

                <form


                >

                    <div className="form-group">

                        <label>

                             Your Quoted Price

                        </label>

                        <input

                            type="number"

                            name="estimatedPrice"

                            value={formData.estimatedPrice}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Estimated Completion Time

                        </label>

                        <select

                            name="estimatedDays"

                            value={formData.estimatedDays}

                            onChange={handleChange}

                            required

                        >

                            <option value="">

                                Select

                            </option>

                            <option>

                                Same Day

                            </option>

                            <option>

                                1 Day

                            </option>

                            <option>

                                2 Days

                            </option>

                            <option>

                                3 Days

                            </option>

                            <option>

                                5 Days

                            </option>

                            <option>

                                1 Week

                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Select Vehicle

                        </label>

                        <select

                            name="vehicleType"

                            value={formData.vehicleType}

                            onChange={handleChange}

                            required

                        >

                            <option value="">

                                Select Vehicle

                            </option>

                            {

                                vehicles.map(vehicle => (

                                    <option

                                        key={vehicle._id}

                                        value={vehicle.vehicleType}

                                    >

                                        {vehicle.vehicleName}

                                        {" - "}

                                        {vehicle.vehicleNumber}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Message

                        </label>

                        <textarea

                            rows="5"

                            name="message"

                            value={formData.message}

                            onChange={handleChange}

                            placeholder="Write additional information..."

                        />

                    </div>

                    <div className="quote-summary-box">

                        <h3>

                            Quote Summary

                        </h3>

                        <div>

                            <span>

                                Price

                            </span>

                            <strong>

                                &nbsp;₹ {formData.estimatedPrice || 0}

                            </strong>

                        </div>

                        <div>

                            <span>

                                Time

                            </span>

                            <strong>

                                &nbsp;{formData.estimatedDays || "-"}

                            </strong>

                        </div>

                    </div>

                    <div className="button-group">

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={onClose}

                        >

                            Cancel

                        </button>

                        <button

                            onClick={handleSubmit}

                            className="submit-btn"

                            disabled={loading}

                        >

                            {

                                loading

                                    ?

                                    "Sending..."

                                    :

                                    "Send Quote"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>
        </ModalLayout>

    );

}

export default SendQuote;
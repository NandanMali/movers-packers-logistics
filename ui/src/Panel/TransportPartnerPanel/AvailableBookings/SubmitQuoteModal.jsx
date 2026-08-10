import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrlPartner } from "../../../apiUrl";
import Alert from "../../../components/Alert/alert";

function SubmitQuoteModal({

    isOpen,

    onClose,

    booking,

    refresh

}) {

    const [vehicles, setVehicles] = useState([]);

    const [alertData,setAlert]=useState(null);

    const [quote, setQuote] = useState({

        vehicleId: "",

        quotedAmount: "",

        message: "",

        estimatedArrival: ""

    });

    useEffect(() => {

        if (isOpen) {

            loadVehicles();

        }

    }, [isOpen]);

    const loadVehicles = async () => {

        try {

            const response = await axios.get(

                apiUrlPartner + "vehicle/my"

            );

            setVehicles(response.data.vehicles);

        }

        catch (error) {


        }

    };

    const submitQuote = async () => {

        try {

            await axios.post(

                apiUrlPartner + "quotation/save",

                {

                    bookingId: booking._id,

                    vehicleId: quote.vehicleId,

                    quotedAmount: quote.quotedAmount,

                    estimatedArrival: quote.estimatedArrival,

                    message: quote.message

                }

            );

            setAlert({
        message:"Your Quote Submitted Successfully",
        type:"successAlert"
      })

      setTimeout(() => {
        setAlert(null);
          refresh();
          
          onClose();
        }, 3000);

        }

        catch (error) {
setAlert({
        message:"Quote Submission Failed",
        type:"errorAlert"
      })
        }

    };

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">
            {alertData && <Alert message={alertData.message} type={alertData.type} />}

            <div className="quote-modal">

                <h2>

                    Submit Your Quote

                </h2>

                <label>

                    Select Vehicle

                </label>

                <select

                    value={quote.vehicleId}

                    onChange={(e)=>

                        setQuote({

                            ...quote,

                            vehicleId:e.target.value

                        })

                    }

                >

                    <option value="">

                        Select Vehicle

                    </option>

                    {

                        vehicles.map(vehicle=>(

                            <option

                                key={vehicle._id}

                                value={vehicle._id}

                            >

                                {vehicle.vehicleNumber}

                                {" - "}

                                {vehicle.vehicleName}

                            </option>

                        ))

                    }

                </select>

                <label>

                    Your Quote

                </label>

                <input

                    type="number"

                    placeholder="Enter Amount"

                    value={quote.quotedAmount}

                    onChange={(e)=>

                        setQuote({

                            ...quote,

                            quotedAmount:e.target.value

                        })

                    }

                />

                <label>

                    Arrival Time

                </label>

                <input

                    type="text"

                    placeholder="20 Minutes"

                    value={quote.estimatedArrival}

                    onChange={(e)=>

                        setQuote({

                            ...quote,

                            estimatedArrival:e.target.value

                        })

                    }

                />

                <label>

                    Message

                </label>

                <textarea

                    rows={4}

                    placeholder="Optional"

                    value={quote.message}

                    onChange={(e)=>

                        setQuote({

                            ...quote,

                            message:e.target.value

                        })

                    }

                />

                <div className="quote-buttons">

                    <button

                        className="cancel-btn"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    <button

                        className="submit-btn"

                        onClick={submitQuote}

                    >

                        Submit Quote

                    </button>

                </div>

            </div>

        </div>

    );

}

export default SubmitQuoteModal;
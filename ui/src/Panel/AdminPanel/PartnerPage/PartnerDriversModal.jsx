import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrlPartnerDriver } from "../../../apiUrl";

// import "./partnerDriversModal.css";

function PartnerDriversModal({

    isOpen,
    partner,
    onClose

}) {

    const [drivers, setDrivers] = useState([]);

    const [loading, setLoading] = useState(false);

    //-----------------------------------------

    const getDrivers = async () => {

        try {

            setLoading(true);

            const response = await axios.get(

                apiUrlPartnerDriver +
                "partner/" +
                partner._id

            );

            setDrivers(

                response.data.drivers || []

            );

        }

        catch (error) {


        }

        finally {

            setLoading(false);

        }

    };

    //-----------------------------------------

    useEffect(() => {

        if (isOpen && partner) {

            getDrivers();

        }

    }, [isOpen, partner]);

    //-----------------------------------------

    if (!isOpen) {

        return null;

    }

    //-----------------------------------------

    return (

        <div className="admin-modal-overlay">

            <div className="partner-drivers-modal">

                <div className="admin-modal-header">

                    <h2>

                        {partner.companyName || partner.name}

                        {" - Drivers"}

                    </h2>

                    <button

                        onClick={onClose}

                    >

                        ✕

                    </button>

                </div>

                <div className="partner-drivers-body">

                    {loading && (

                        <p className="drivers-message">

                            Loading drivers...

                        </p>

                    )}

                    {!loading && drivers.length === 0 && (

                        <p className="drivers-message">

                            No drivers found for this partner.

                        </p>

                    )}

                    {!loading && drivers.length > 0 && (

                        <div className="partner-drivers-grid">

                            {drivers.map((driver) => (

                                <div

                                    className="partner-driver-card"

                                    key={driver._id}

                                >

                                    <div className="driver-card-image">

                                        <img

                                            src={

                                                driver.profilepic ||

                                                "/images/default-profile.png"

                                            }

                                            alt={driver.name}

                                        />

                                    </div>

                                    <div className="driver-card-content">

                                        <h3>

                                            {driver.name}

                                        </h3>

                                        <p>

                                            <b>Phone:</b>{" "}

                                            {driver.phone || "N/A"}

                                        </p>

                                        <p>

                                            <b>Email:</b>{" "}

                                            {driver.email || "N/A"}

                                        </p>

                                        <p>

                                            <b>License:</b>{" "}

                                            {driver.licenseNumber || "N/A"}

                                        </p>

                                        <p>

                                            <b>Status:</b>{" "}

                                            <span

                                                className={

                                                    driver.status === "Available"

                                                    ? "driver-status-available"

                                                    : "driver-status-busy"

                                                }

                                            >

                                                {driver.status || "Available"}

                                            </span>

                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}

export default PartnerDriversModal;
import { useState } from "react";

import './partnerDetailsModal.css';
import PartnerDriversModal from "./PartnerDriversModal";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import { profileuploadurl } from "../../../apiUrl";

// import PartnerDriversModal from "./PartnerDriversModal";
// import PartnerVehiclesModal from "./PartnerVehiclesModal";
// import DeletePartnerModal from "./DeletePartnerModal";

function PartnerDetailsModal({

    isOpen,
    partner,
    onClose,
    refresh,
    deletePartner,
    company

}) {
    const navigate=useNavigate();

    const [showDrivers, setShowDrivers] = useState(false);

    const [showVehicles, setShowVehicles] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    if (!isOpen) return null;

    const handleDriver = (partner)=>{
        const id=partner._id;
        navigate(`/admin/partners/drivers/${id}`);
    }

    const handleVehicle = (partner)=>{
        const id=partner._id;
        navigate(`/admin/partners/vehicles/${id}`);
    }

    return (

        <>

            <div className="admin-modal-overlay">

                <div className="partner-details-modal">

                    <div className="admin-modal-header">

                        <h2>
                            Partner Details
                        </h2>

                        <button
                            onClick={onClose}
                        >
                            ✕
                        </button>

                    </div>

                    <div className="partner-details-body">

                        {/* Partner Details */}

                        <div className="detail-section">

                            <h3>
                                Partner Information
                            </h3>

                            <img
                                className="partner-profile-image"
                                src={profileuploadurl+
                                    partner?.ProfilePic
                                    || "/images/default-profile.png"
                                }
                                alt="Partner"
                            />

                            <p>
                                <b>Name:</b>{" "}
                                {partner?.name}
                            </p>

                            <p>
                                <b>Username:</b>{" "}
                                {partner?.username}
                            </p>

                            <p>
                                <b>Email:</b>{" "}
                                {partner?.email}
                            </p>

                            <p>
                                <b>Phone:</b>{" "}
                                {partner?.phone}
                            </p>

                            <p>
                                <b>Address:</b>{" "}
                                {partner?.address || "N/A"}
                            </p>

                        </div>


                        {/* Company Details */}

                        <div className="detail-section">

                            <h3>
                                Company Information
                            </h3>

                            <p>
                                <b>Company:</b>{" "}
                                {company?.companyName || "N/A"}
                            </p>

                            <p>
                                <b>Business Address:</b>{" "}
                                {company?.businessAddress || "N/A"}
                            </p>

                            <p>
                                <b>GST Number:</b>{" "}
                                {company?.gstNumber || "N/A"}
                            </p>

                            <p>
                                <b>Experience:</b>{" "}
                                {company?.experience || "N/A"}
                            </p>

                            <p>
                                <b>Services:</b>{" "}
                                {
                                    company?.services?.join(", ")
                                    || "N/A"
                                }
                            </p>

                            <p>
                                <b>Service Cities:</b>{" "}
                                {
                                    company?.serviceCities?.join(", ")
                                    || "N/A"
                                }
                            </p>

                            <p>
                                <b>Description:</b>{" "}
                                {company?.description || "N/A"}
                            </p>

                        </div>

                    </div>


                    {/* Bottom Options */}

                    <div className="partner-details-actions">

                        <button
                            onClick={()=>{handleDriver(partner)}}
                        >
                            View Drivers
                        </button>

                        <button
                            onClick={()=>{handleVehicle(partner)}}
                        >
                            View Vehicles
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() =>
                                setShowDelete(true)
                            }
                        >
                            Delete Partner
                        </button>

                    </div>

                </div>

            </div>

             <DeleteModal
                    isOpen={showDelete}
                    onClose={() => setShowDelete(false)}
                    onConfirm={deletePartner}
                    title="Delete Transport Partner"
                    message={`Are you sure you want to delete ${partner.name}?`}
                  />

        </>

    );

}

export default PartnerDetailsModal;
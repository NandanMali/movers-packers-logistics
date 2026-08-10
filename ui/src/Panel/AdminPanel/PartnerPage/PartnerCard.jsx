import { useEffect, useState } from "react";
import './partnerCard.css';
import PartnerDetailsModal from "./PartnerDetailsModal";
import { apiUrlPartnerProfile, profileuploadurl } from "../../../apiUrl";
import axios from "axios";
// import ChangePartnerStatusModal from "./ChangePartnerStatusModal";

function PartnerCard({ partner, refresh , status , deletePartner }) {

    const [company,setCompany]=useState(null);
    const [showDetails, setShowDetails] = useState(false);

       const fetchCompany = async () => {
        await axios.get(apiUrlPartnerProfile+"fetch/"+partner._id).then((res)=>{

            setCompany(res.data.profile[0]);
        })
       }
       useEffect(()=>{
        fetchCompany();
       },[])

    return (

        <>

            <div className="partner-card">

                <div className="partner-card-top">

                    <img
                        src={profileuploadurl+
                            partner?.ProfilePic
                            || "/images/default-profile.png"
                        }
                        alt="Partner"
                    />

                    <div>

                        <h3>
                            {partner?.name}
                        </h3>

                        <p>
                            {partner?.email}
                        </p>

                    </div>

                </div>

                <div className="partner-card-info">

                    <p>
                        <b>Company:</b>{" "}
                        {company?.companyName || "Not Added"}
                    </p>

                    <p>
                        <b>Phone:</b>{" "}
                        {partner?.phone}
                    </p>

                    <p>
                        <b>Status:</b>{" "}

                        <span
                            className={
                                partner?.status
                                ? "partner-active"
                                : "partner-inactive"
                            }
                        >
                            {
                                partner?.status
                                ? "Active"
                                : "Inactive"
                            }
                        </span>

                    </p>

                </div>

                <div className="partner-card-actions">

                    <button
                        onClick={() =>
                            setShowDetails(true)
                        }
                    >
                        View Details
                    </button>

                    <button
                        onClick={status}
                    >
                        Change Status
                    </button>

                </div>

            </div>

            <PartnerDetailsModal

                isOpen={showDetails}

                partner={partner}

                onClose={() =>
                    setShowDetails(false)
                }

                refresh={refresh}

                deletePartner={deletePartner}

                company={company}

            />

            {/* <ChangePartnerStatusModal

                isOpen={showStatus}

                partner={partner}

                onClose={() =>
                    setShowStatus(false)
                }

                refresh={refresh}

            /> */}

        </>

    );

}

export default PartnerCard;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./completeProfile.css";
import { apiUrlPartnerProfile } from "../../../apiUrl";
import { FaCross } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Alert from "../../../components/Alert/alert";

function CompleteProfile() {

    const navigate = useNavigate();

    const services = [
        "Home Shifting",
        "Office Shifting",
        "Vehicle Transport",
        "Bike Transport",
        "Packing",
        "Storage"
    ];

    const cities = [
        "Bhopal",
        "Indore",
        "Ujjain",
        "Sehore",
        "Vidisha",
        "Sagar"
    ];
    const [alertData,setAlert]=useState(null);

    const [formData, setFormData] = useState({

        companyName: "",

        gstNumber: "",

        businessAddress: "",

        experience: "",

        description: "",

        services: [],

        serviceCities: [],

        companyLogo: "",

        documents: []

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleCheckbox = (field, value) => {

        setFormData(prev => ({

            ...prev,

            [field]: prev[field].includes(value)

                ? prev[field].filter(item => item !== value)

                : [...prev[field], value]

        }));

    };

    const handleLogo = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {

            setFormData(prev => ({

                ...prev,

                companyLogo: reader.result

            }));

        };

        reader.readAsDataURL(file);

    };

    const handleDocuments = (e) => {

        const files = Array.from(e.target.files);

        const readers = files.map(file => {

            return new Promise(resolve => {

                const reader = new FileReader();

                reader.onload = () => resolve(reader.result);

                reader.readAsDataURL(file);

            });

        });

        Promise.all(readers).then(data => {

            setFormData(prev => ({

                ...prev,

                documents: data

            }));

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setAlert(null);

        try {

            await axios.post(

                apiUrlPartnerProfile + "save",

                {

                    userId: (localStorage.getItem("_id")),

                    ...formData

                }

            );

            setAlert({
                message:"Business Profile Completed Successfully",
                type:"successAlert"
            })
            setTimeout(() => {
                
                navigate("/partner");
            }, 3000);

        }

        catch (error) {
            setAlert({
                message:"Business Profile Complete Failed",
                type:"errorAlert"
            })

        }

    };


    const removeLogo = () => {

    setFormData(prev => ({

        ...prev,

        companyLogo: ""

    }));

};

const removeDocument = (index) => {

    setFormData(prev => ({

        ...prev,

        documents: prev.documents.filter(

            (_, i) => i !== index

        )

    }));

};

   return (

    <div className="complete-profile-page">

{alertData && <Alert message={alertData.message} type={alertData.type} /> }
        <div className="profile-card">

            <h2>Complete Business Profile</h2>

            <p>
                Complete your business profile to start receiving booking requests.
            </p>

            <form onSubmit={handleSubmit}>

                {/* Business Information */}

                <div className="profile-section">

                    <div className="section-title">
                        Business Information
                    </div>

                    <div className="section-content">

                        <div className="section">

                            <label>Company Logo</label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogo}
                            />

                           {
    formData.companyLogo &&

    <div className="logo-container">

        <img
            src={formData.companyLogo}
            alt="Company Logo"
            className="logo-preview"
        />

        <button
            type="button"
            className="remove-btn"
            onClick={removeLogo}
        >
            Remove
        </button>

    </div>
}

                        </div>

                        <div className="section">

                            <label>Company Name</label>

                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Enter Company Name"
                                required
                            />

                        </div>

                        <div className="section">

                            <label>GST Number</label>

                            <input
                                type="text"
                                name="gstNumber"
                                value={formData.gstNumber}
                                onChange={handleChange}
                                placeholder="Enter GST Number"
                            />

                        </div>

                        <div className="section">

                            <label>Business Experience</label>

                            <input
                                type="text"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                placeholder="Example : 5 Years"
                            />

                        </div>

                    </div>

                </div>

                {/* Business Address */}

                <div className="profile-section">

                    <div className="section-title">
                        Business Address
                    </div>

                    <div className="section-content">

                        <div className="section">

                            <label>Business Address</label>

                            <textarea
                                rows="3"
                                name="businessAddress"
                                value={formData.businessAddress}
                                onChange={handleChange}
                                placeholder="Enter Complete Business Address"
                                required
                            />

                        </div>

                        <div className="section">

                            <label>Business Description</label>

                            <textarea
                                rows="5"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Tell customers about your company..."
                            />

                        </div>

                    </div>

                </div>

                {/* Services */}

                <div className="profile-section">

                    <div className="section-title">
                        Services Offered
                    </div>

                    <div className="section-content">

                        <div className="checkbox-grid">

                            {

                                services.map(service => (

                                    <label key={service}>

                                        <input
                                            type="checkbox"
                                            checked={formData.services.includes(service)}
                                            onChange={() =>
                                                handleCheckbox(
                                                    "services",
                                                    service
                                                )
                                            }
                                        />

                                        {service}

                                    </label>

                                ))

                            }

                        </div>

                    </div>

                </div>

                {/* Service Cities */}

                <div className="profile-section">

                    <div className="section-title">
                        Service Areas
                    </div>

                    <div className="section-content">

                        <div className="checkbox-grid">

                            {

                                cities.map(city => (

                                    <label key={city}>

                                        <input
                                            type="checkbox"
                                            checked={formData.serviceCities.includes(city)}
                                            onChange={() =>
                                                handleCheckbox(
                                                    "serviceCities",
                                                    city
                                                )
                                            }
                                        />

                                        {city}

                                    </label>

                                ))

                            }

                        </div>

                    </div>

                </div>

                {/* Documents */}

                <div className="profile-section">

                    <div className="section-title">
                        Business Documents
                    </div>

                    <div className="section-content">

                        <div className="section">

                            <label>Upload Documents</label>

                            <input
                                type="file"
                                multiple
                                onChange={handleDocuments}
                            />

                        </div>

                        {

                            formData.documents.length > 0 &&

                            <div className="documents-preview">

    {

        formData.documents.map((doc, index) => (

            <div
                className="document-item"
                key={index}
            >

                <span>

                    Document {index + 1}

                </span>

                <button
                    type="button"
                    className="remove-btn"
                    
                    onClick={() => removeDocument(index)}
                >
                    <FaXmark />
                </button>

            </div>

        ))

    }

</div>

                        }

                    </div>

                </div>

                <button
                    type="submit"
                    className="save-btn"
                >

                    Save Business Profile

                </button>

            </form>

        </div>

    </div>

);

}

export default CompleteProfile;
import axios from "axios";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { apiUrlPartner, apiUrlPartnerVehicle } from "../../../apiUrl";
import Alert from "../../../components/Alert/alert";

const AddVehicleModal = ({
    isOpen,
    onClose,
    onSave
}) => {

    const [formData, setFormData] = useState({

        vehicleNumber: "",
        vehicleName: "",
        vehicleType: "Mini Truck",
        brand: "",
        model: "",
        capacity: "",
        fuelType: "Diesel",
        status: "Available",
        image: "",
        preview:""

    });
    const [alertData,setAlert]=useState(null)

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value

        });

    };

    const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

        setFormData(prev => ({

            ...prev,

            image: file,          // Actual file for upload

            preview: reader.result // Preview image

        }));

    };

    reader.readAsDataURL(file);

};

    const handleSubmit = async (e) => {

    e.preventDefault();
    setAlert(null);

    try {

        const id = (

            localStorage.getItem("_id")

        );

        const data = new FormData();

        data.append("partnerId", id);

        data.append("vehicleNumber", formData.vehicleNumber);

        data.append("vehicleName", formData.vehicleName);

        data.append("vehicleType", formData.vehicleType);

        data.append("brand", formData.brand);

        data.append("model", formData.model);

        data.append("capacity", formData.capacity);

        data.append("fuelType", formData.fuelType);

        data.append("status", formData.status);

        data.append("image", formData.image);

        const response = await axios.post(

            apiUrlPartnerVehicle + "save",

            data

        );

        setAlert({
            message:"Vehicle Added Successfully",
            type:"successAlert"
        })
        setTimeout(() => {

        onSave();
        setFormData({

    vehicleNumber: "",

    vehicleName: "",

    vehicleType: "Mini Truck",

    brand: "",

    model: "",

    capacity: "",

    fuelType: "Diesel",

    status: "Available",

    image: null,

    preview: ""

});

        onClose();
    
}, 3000);
    }

    catch(error){

setAlert({
            message:"Vehicle Not Added",
            type:"errorAlert"
        })
    }

};

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">
            {alertData && <Alert message={alertData.message} type={alertData.type} />}

            <div className="vehicle-modal">

                <div className="modal-header">

                    <h2>Add Vehicle</h2>

                    <button onClick={onClose}>
                                            <FaXmark size={24}/>
                                        </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="vehicle-form"
                >

                    <input
                        type="text"
                        name="vehicleNumber"
                        placeholder="Vehicle Number"
                        value={formData.vehicleNumber}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="vehicleName"
                        placeholder="Vehicle Name"
                        value={formData.vehicleName}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                    >
                        <option>Mini Truck</option>
                        <option>Pickup</option>
                        <option>Container</option>
                        <option>Trailer</option>
                    </select>

                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="model"
                        placeholder="Model"
                        value={formData.model}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="capacity"
                        placeholder="Capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                    />

                    <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                    >
                        <option>Diesel</option>
                        <option>Petrol</option>
                        <option>CNG</option>
                        <option>Electric</option>
                    </select>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option>Available</option>
                        <option>Assigned</option>
                        <option>On Trip</option>
                        <option>Maintenance</option>
                        <option>Inactive</option>
                    </select>

                    <input
    type="file"
    onChange={handleImage}
/>

{
    formData.preview && (

        <img
            src={formData.preview}
            alt="Vehicle"
            className="preview-img"
        />

    )
}
                    <button
                        type="submit"
                        className="save-btn"
                    >

                        Save Vehicle

                    </button>

                </form>

            </div>

        </div>

    );

};

export default AddVehicleModal;
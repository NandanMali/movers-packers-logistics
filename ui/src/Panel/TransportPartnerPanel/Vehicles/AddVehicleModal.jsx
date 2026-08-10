import axios from "axios";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { apiUrlPartner, apiUrlPartnerVehicle } from "../../../apiUrl";
import Alert from "../../../components/Alert/alert";
import ModalLayout from "../components/ModalLayout/ModalLayout";
import FormInput from "../components/FormInput/FormInput";
import ImageUploader from "../components/ImageUploader/ImageUploader";

const AddVehicleModal = ({
    isOpen,
    onClose,
    onSave
}) => {

    const [alertData,setAlert]=useState(null)
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

    try {

        const id = (

            localStorage.getItem("_id")

        );

        setAlert(null);

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
            type:"errorAlert",
        })

    }

};

    if (!isOpen) return null;

    return (

        <>
            {alertData && <Alert message={alertData.message} type={alertData.type} />}
  <ModalLayout

        title="Add Vehicle"

        onClose={onClose}

    >

                <form>

                    <FormInput
                        type="text"
                        label="Vehicle Number"
                        name="vehicleNumber"
                        placeholder="Vehicle Number"
                        value={formData.vehicleNumber}
                        onChange={handleChange}
                        required
                    />

                    <FormInput
                        type="text"
                        label="Vehicle Name"
                        name="vehicleName"
                        placeholder="Vehicle Name"
                        value={formData.vehicleName}
                        onChange={handleChange}
                        required
                    />

                    <FormInput
                        type="select"
                        label="Vehicle Type"

                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                    
                        options={[
                            "Mini Truck",
                        "Pickup",
                        "Container",
                        "Trailer",]}
                    />

                    <FormInput
                        type="text"
                        label="Brand"
                        name="Brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleChange}
                    />

                    <FormInput
                        type="text"
                        label="Model"
                        name="model"
                        placeholder="Model"
                        value={formData.model}
                        onChange={handleChange}
                    />

                    <FormInput
                        type="text"
                        label="Capacity"
                        name="capacity"
                        placeholder="Capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                    />

                    <FormInput
                    type="select"
                    label="Fuel Type"
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        options={[
                            "Diesel",
                        "Petrol",
                        "CNG",
                        "Electric",]}
                    />

                    <FormInput
                    type="select"
                    label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    options={[
                            "Available",

"Assigned",

"On Trip",

"Maintenance",

"Inactive",]}
                        />

                   <ImageUploader

preview={formData.preview}

onChange={handleImage}

onRemove={()=>

setFormData(prev=>({

...prev,

image:null,

preview:""

}))

}

/>
                    <button
                        className="save-btn" onClick={handleSubmit}
                    >

                        Save Vehicle

                    </button>

                </form>
</ModalLayout>
        </>

    );

};

export default AddVehicleModal;
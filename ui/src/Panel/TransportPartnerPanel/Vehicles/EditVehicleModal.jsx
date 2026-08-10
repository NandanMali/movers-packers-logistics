import { useState, useEffect } from "react";
import axios from "axios";
import { FaXmark } from "react-icons/fa6";
import { apiUrlPartnerVehicle } from "../../../apiUrl";
import Alert from "../../../components/Alert/alert";
import ModalLayout from "../components/ModalLayout/ModalLayout";

function EditVehicleModal({

    isOpen,

    onClose,

    vehicle,

    onUpdate

}) {

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

        image: null,

        preview: ""

    });

    useEffect(() => {

        if(vehicle){

            setFormData({

                vehicleNumber: vehicle.vehicleNumber,

                vehicleName: vehicle.vehicleName,

                vehicleType: vehicle.vehicleType,

                brand: vehicle.brand,

                model: vehicle.model,

                capacity: vehicle.capacity,

                fuelType: vehicle.fuelType,

                status: vehicle.status,

                image:null,

                preview:"/assets/uploads/vehicles/"+vehicle.image

            });

        }

    },[vehicle]);

    const handleChange=(e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };

    const handleImage=(e)=>{

        const file=e.target.files[0];

        if(!file) return;

        const reader=new FileReader();

        reader.onload=()=>{

            setFormData(prev=>({

                ...prev,

                image:file,

                preview:reader.result

            }));

        };

        reader.readAsDataURL(file);

    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{
            setAlert(null);

            const data=new FormData();

            data.append("id",vehicle._id);

            data.append("vehicleNumber",formData.vehicleNumber);

            data.append("vehicleName",formData.vehicleName);

            data.append("vehicleType",formData.vehicleType);

            data.append("brand",formData.brand);

            data.append("model",formData.model);

            data.append("capacity",formData.capacity);

            data.append("fuelType",formData.fuelType);

            data.append("status",formData.status);

            if(formData.image){

                data.append("image",formData.image);

            }

            const response=await axios.put(

                apiUrlPartnerVehicle+"update",

               data

            );

             setAlert({
            message:"Vehicle Update Successfully",
            type:"successAlert"
        })

        setTimeout(()=>{

            onUpdate();
            
            onClose();
        },3000);

        }

        catch(error){


            setAlert({
            message:"Vehicle Not Updated",
            type:"errorAlert",
        })
        }

    };

    if(!isOpen) return null;

    return(
<>
        {alertData && <Alert message={alertData.message} type={alertData.type} />}
         <ModalLayout

        title="Edit Vehicle"

        onClose={onClose}

    >

                <form
                    className="vehicle-form"
                >

                    <input
                        type="text"
                        name="vehicleNumber"
                        value={formData.vehicleNumber}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="vehicleName"
                        value={formData.vehicleName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
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

                        formData.preview &&

                        <img

                            src={formData.preview}

                            className="preview-img"

                            alt="Preview"

                        />

                    }

                    <button
                        className="save-btn"
                        onClick={handleSubmit}
                    >

                        Update Vehicle

                    </button>

                </form>

            </ModalLayout>
        </>

    );

}

export default EditVehicleModal;
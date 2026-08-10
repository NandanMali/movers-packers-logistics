import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

const EditVehicleModal = ({
    isOpen,
    onClose,
    vehicle,
    onUpdate
}) => {

    const [formData, setFormData] = useState({vehicle});


    useEffect(() => {

    if(vehicle){

        setFormData(vehicle);

    }

},[vehicle]);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value

        });

    };

    const handleImage = (e) => {

        const file =
            e.target.files[0];

        if (!file) return;

        const reader =
            new FileReader();

        reader.onload = () => {

            setFormData({

                ...formData,

                image: reader.result

            });

        };

        reader.readAsDataURL(file);

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onUpdate(formData);

onClose();

    };
    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

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
                        formData.image &&

                        <img
                            src={formData.image}
                            alt=""
                            className="preview-img"
                        />
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

export default EditVehicleModal;
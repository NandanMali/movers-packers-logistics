import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

const DriverModal = ({
    isOpen,
    onClose,
    onSave,
    editingDriver = null
}) => {

    const [vehicles, setVehicles] = useState([]);

    const initialState = {

        id: "",

        image: "",

        fullName: "",

        phone: "",

        email: "",

        address: "",

        licenseNumber: "",

        licenseExpiry: "",

        experience: "",

        assignedVehicle: "",

        assignedPartner: "",

        status: "Available"

    };

    const [formData, setFormData] =
        useState(initialState);

    useEffect(() => {

       const data =
(JSON.parse(localStorage.getItem("vehicles")) || [])
.filter(vehicle => vehicle.status === "Available");

        setVehicles(data);

    }, []);

    useEffect(() => {

        if (editingDriver) {

            setFormData(editingDriver);

        } else {

            setFormData(initialState);

        }

    }, [editingDriver]);

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

        const driver = {

            ...formData,

            id:
                editingDriver?.id ||
                Date.now(),

            createdAt:
                editingDriver?.createdAt ||
                new Date().toLocaleString()

        };

        onSave(driver);

    };

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="vehicle-modal">

                <div className="modal-header">

                    <h2>

                        {
                            editingDriver ?

                            "Edit Driver"

                            :

                            "Add Driver"
                        }

                    </h2>

                    <button onClick={onClose}>
                                            <FaXmark size={24}/>
                                        </button>

                </div>

                <form
                    className="vehicle-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <textarea
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="licenseNumber"
                        placeholder="License Number"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="licenseExpiry"
                        value={formData.licenseExpiry}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="experience"
                        placeholder="Experience (Years)"
                        value={formData.experience}
                        onChange={handleChange}
                    />

                    <select
                        name="assignedVehicle"
                        value={formData.assignedVehicle}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Vehicle
                        </option>

                        {

                            vehicles.map((vehicle) => (

                                <option
                                    key={vehicle.id}
                                    value={vehicle.vehicleNumber}
                                >

                                    {vehicle.vehicleNumber}

                                    {" - "}

                                    {vehicle.vehicleName}

                                </option>

                            ))

                        }

                    </select>

                    <input
                        type="text"
                        name="assignedPartner"
                        placeholder="Assigned Partner"
                        value={formData.assignedPartner}
                        onChange={handleChange}
                    />

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >

                        <option>
                            Available
                        </option>

                        <option>
                            On Trip
                        </option>

                        <option>
                            On Leave
                        </option>

                        <option>
                            Inactive
                        </option>

                    </select>

                    <input
                        type="file"
                        accept="image/*"
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
                        className="save-btn"
                        type="submit"
                    >

                        {

                            editingDriver ?

                            "Update Driver"

                            :

                            "Save Driver"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

};

export default DriverModal;
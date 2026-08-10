import { FaXmark } from "react-icons/fa6";

const ViewVehicleModal = ({
    isOpen,
    vehicle,
    onClose
}) => {

    if (!isOpen || !vehicle) return null;

    return (

        <div className="modal-overlay">

            <div className="vehicle-modal">

                <div className="modal-header">

                    <h2>Vehicle Details</h2>

                    <button onClick={onClose}>
                                            <FaXmark size={24}/>
                                        </button>

                </div>

                <div className="vehicle-details">

                    <div className="vehicle-image-section">

                        {
                            vehicle.image ?

                            <img
                                src={vehicle.image}
                                alt={vehicle.vehicleName}
                                className="vehicle-preview"
                            />

                            :

                            <div className="vehicle-placeholder large">
                                🚚
                            </div>
                        }

                    </div>

                    <div className="vehicle-info">

                        <p><strong>Vehicle No:</strong> {vehicle.vehicleNumber}</p>

                        <p><strong>Name:</strong> {vehicle.vehicleName}</p>

                        <p><strong>Type:</strong> {vehicle.vehicleType}</p>

                        <p><strong>Brand:</strong> {vehicle.brand}</p>

                        <p><strong>Model:</strong> {vehicle.model}</p>

                        <p><strong>Capacity:</strong> {vehicle.capacity}</p>

                        <p><strong>Fuel:</strong> {vehicle.fuelType}</p>

                        <p><strong>Status:</strong> {vehicle.status}</p>

                        <p><strong>Created:</strong> {vehicle.createdAt}</p>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ViewVehicleModal;
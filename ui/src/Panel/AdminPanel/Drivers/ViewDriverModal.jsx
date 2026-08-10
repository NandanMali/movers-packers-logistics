import { FaCross, FaCrosshairs, FaPlus, FaXmark } from "react-icons/fa6";

const ViewDriverModal = ({
    isOpen,
    driver,
    onClose
}) => {

    if (!isOpen || !driver) return null;

    return (

        <div className="modal-overlay">

            <div className="vehicle-modal">

                <div className="modal-header">

                    <h2>Driver Details</h2>

                    <button onClick={onClose}>
                        <FaXmark size={24}/>
                    </button>

                </div>

                <div className="vehicle-info">

                    <p><strong>Name:</strong> {driver.fullName}</p>

                    <p><strong>Phone:</strong> {driver.phone}</p>

                    <p><strong>Email:</strong> {driver.email}</p>

                    <p><strong>License:</strong> {driver.licenseNumber}</p>

                    <p><strong>Vehicle:</strong> {driver.assignedVehicle}</p>

                    <p><strong>Status:</strong> {driver.status}</p>

                </div>

            </div>

        </div>

    );

};

export default ViewDriverModal;
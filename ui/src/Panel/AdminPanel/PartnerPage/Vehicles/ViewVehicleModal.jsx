import { FaXmark } from "react-icons/fa6";
import ModalLayout from "../../../TransportPartnerPanel/components/ModalLayout/ModalLayout";
import { vehicleuploadurl } from "../../../../apiUrl";

function ViewVehicleModal({
  isOpen,

  onClose,

  vehicle,
}) {
  if (!isOpen || !vehicle) return null;

  return (
    <>
      <ModalLayout title="Vehicle Details" width="850px" onClose={onClose}>
        <img
          src={vehicleuploadurl + vehicle.images}
          alt="Vehicle"
          className="view-image"
        />

        <div className="vehicle-info">
          <div>
            <label>Vehicle Number</label>

            <p>{vehicle.vehicleNumber}</p>
          </div>

          <div>
            <label>Vehicle Name</label>

            <p>{vehicle.vehicleName}</p>
          </div>

          <div>
            <label>Vehicle Type</label>

            <p>{vehicle.vehicleType}</p>
          </div>

          <div>
            <label>Brand</label>

            <p>{vehicle.brand}</p>
          </div>

          <div>
            <label>Model</label>

            <p>{vehicle.model}</p>
          </div>

          <div>
            <label>Capacity</label>

            <p>{vehicle.capacity}</p>
          </div>

          <div>
            <label>Fuel Type</label>

            <p>{vehicle.fuelType}</p>
          </div>

          <div>
            <label>Status</label>

            <p>{vehicle.status}</p>
          </div>
        </div>
      </ModalLayout>
    </>
  );
}

export default ViewVehicleModal;

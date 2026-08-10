import { useEffect, useState } from "react";
import axios from "axios";

import {
  apiUrlPartnerDriver,
  apiUrlPartnerVehicle,
  apiUrlUserBooking,
} from "../../../apiUrl";
import { FaXmark } from "react-icons/fa6";
import Alert from "../../../components/Alert/alert";
import ModalLayout from "../components/ModalLayout/ModalLayout";

function OrderDetailsModal({
  isOpen,

  booking,

  onClose,

  onUpdate,
}) {
  const [status, setStatus] = useState(booking?.status || "");

  const [loading, setLoading] = useState(false);

  const [driver, setDriver] = useState([]);

  const [vehicle, setVehicle] = useState([]);

  const [alertData,setAlert]=useState(null);

  const fetchdriver = async () => {
    try {
      const response = await axios.get(
        apiUrlPartnerDriver + "view/" + booking.driverId,
      );

      setDriver(response.data.driver);
    } catch (error) {
      setDriver([]);
    }
  };

  const fetchVehicle = async () => {
    try {
      const response = await axios.get(apiUrlPartnerVehicle + "fetch", {
        params: {
          _id: booking.vehicleId,
        },
      });

      setVehicle(response.data[0]);
    } catch (error) {
      setVehicle([]);
    }
  };

  useEffect(() => {
    fetchdriver();
    fetchVehicle();
  }, []);

  //-------------------------------------

  if (!isOpen) return null;

  //-------------------------------------

  const handleUpdate = async () => {
    try {
      setAlert(null);
      setLoading(true);

      const response = await axios.put(
        apiUrlUserBooking + "update-status",

        {
          bookingId: booking._id,

          status,
        },
      );

      setAlert({
        message:"Booking Status Updated Successfully",
        type:"successAlert"
      })

setTimeout(() => {
  setAlert(null);
  
  onUpdate();
  
  onClose();
}, 3000);
    } catch (error) {
      setAlert({
        message:"Booking Status Update Failed",
        type:"errorAlert"
      })


    } finally {
      setLoading(false);
    }
  };

  //-------------------------------------

  return (
    <ModalLayout title="Order Details" onClose={onClose}>
      {alertData ? <Alert message={alertData.message} type={alertData.type} />:""}
      <div className="modal-box">
       
        <div className="modal-body">
          <h3>Booking Information</h3>

          <p>
            <b>Booking ID :</b>

            {booking.bookingId}
          </p>

          <p>
            <b>Customer :</b>

            {booking.customerName}
          </p>

          <p>
            <b>Mobile :</b>

            {booking.mobile}
          </p>

          <p>
            <b>Pickup :</b>

            {booking.pickupAddress}
          </p>

          <p>
            <b>Drop :</b>

            {booking.dropAddress}
          </p>

          <p>
            <b>Distance :</b>
            {booking.distance?.toFixed(1)}
            km
          </p>

          <p>
            <b>Amount :</b>₹{booking.finalAmount}
          </p>

          <hr />

          <h3>Driver</h3>

          <p>{driver?.driverName || "Assigned"}</p>

          <hr />

          <h3>Vehicle</h3>

          <p>
            {vehicle?.vehicleName || "Assigned"}
            {" - " + vehicle?.vehicleType || ""}
          </p>

          <hr />

          <h3>Update Status</h3>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Assigned">Assigned</option>

            <option value="Reached Pickup">Reached Pickup</option>

            <option value="Pickup Completed">Pickup Completed</option>

            <option value="In Progress">In Progress</option>

            <option value="Reached Destination">Reached Destination</option>

            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="modal-footer">
          <button onClick={onClose}>Cancel</button>

          <button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}

export default OrderDetailsModal;

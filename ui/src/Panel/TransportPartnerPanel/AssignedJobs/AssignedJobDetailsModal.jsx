import { useEffect, useState } from "react";
import axios from "axios";
import {
  apiUrlPartnerDriver,
  apiUrlPartnerVehicle,
  apiUrlUserBooking,
} from "../../../apiUrl";
import "./assignedJobs.css";
import ModalLayout from "../components/ModalLayout/ModalLayout";
import { FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { FaMoneyBillWave, FaTruck, FaXmark } from "react-icons/fa6";
import Alert from "../../../components/Alert/alert";

function AssignedJobDetailsModal({ isOpen, booking, onClose, onAssign }) {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [driverId, setDriverId] = useState("");

  const [vehicleId, setVehicleId] = useState("");

  const [loading, setLoading] = useState(false);

  const [alertData,setAlert]=useState(null);

  const partnerId = localStorage.getItem("_id");

  //-------------------------------------

  useEffect(() => {
    if (isOpen) {
      getDrivers();

      getVehicles();
    }
  }, [isOpen]);

  //-------------------------------------

  const getDrivers = async () => {
    try {
      const response = await axios.get(
        apiUrlPartnerDriver + "partner/" + partnerId,
      );

      setDrivers(response.data.drivers);
    } catch (error) {
    }
  };

  //-------------------------------------

  const getVehicles = async () => {
    try {

      const response = await axios.get(
        apiUrlPartnerVehicle + "fetch",{
            params:{
            partnerId:partnerId,
        vehicleType:booking.vehicleType}}
      );

      setVehicles(response.data);
    } catch (error) {
    }
  };

  //-------------------------------------

  const handleAssign = async () => {
    if (!driverId) {
      return alert("Select Driver");
    }

    if (!vehicleId) {
      return alert("Select Vehicle");
    }

    try {
      setLoading(true);


      await axios.post(
        apiUrlUserBooking + "assign-driver",

        {
          bookingId: booking._id,

          partnerId,

          driverId,

          vehicleId,
        },
      );

      setAlert({
        message:"Jobs Assigned Successfully",
        type:"successAlert"
      })
      setTimeout(() => {
        
        setAlert(null);
        onAssign();
        
        onClose();
      }, 3000);
    } catch (error) {
      setAlert({
        message:"Jobs Assignment Failed",
        type:"errorAlert"
      })
    } finally {
      setLoading(false);
    }
  };

  //-------------------------------------

  if (!isOpen) return null;

  //-------------------------------------

  return (
    <>
      <div className="modal-overlay">
        {alertData && <Alert message={alertData.message} type={alertData.type} />}
        <div className="modal-box">
          <div className="modal-header">
            <h2>Booking Details</h2>

            <button
              onClick={onClose}
              style={{ width: "60px", alignItems: "flex-end" }}
            >
              <FaXmark size={40} />
            </button>
          </div>

          <div className="modal-body">
            <h3>Booking Information</h3>

            <p>
              <b>Booking ID :</b> {booking.bookingId}
            </p>

            <p>
              <b>Customer :</b> {booking.customerName}
            </p>

            <p>
              <b>Mobile :</b> {booking.mobile}
            </p>

            <p>
              <b>Pickup :</b> {booking.pickupAddress}
            </p>

            <p>
              <b>Drop :</b> {booking.dropAddress}
            </p>

            <p>
              <b>Vehicle Required :</b> {booking.vehicleType}
            </p>

            <p>
              <b>Distance :</b> {booking.distance.toFixed(1)} km
            </p>

            <p>
              <b>Amount :</b> ₹ {booking.finalAmount}
            </p>

            <hr />

            <h3>Assign Driver</h3>

            <select
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
            >
              <option value="">Select Driver</option>

              {drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {driver.driverName}
                </option>
              ))}
            </select>

            <h3>Assign Vehicle</h3>

            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
            >
              <option value="">Select Vehicle</option>

              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.vehicleName}

                  {" - "}

                  {vehicle.vehicleNumber}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-footer">
            <button onClick={onClose}>Cancel</button>

            <button onClick={handleAssign} disabled={loading}>
              {loading ? "Assigning..." : "Assign Driver & Vehicle"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignedJobDetailsModal;

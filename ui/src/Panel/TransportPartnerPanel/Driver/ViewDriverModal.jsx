import ModalLayout from "../components/ModalLayout/ModalLayout";
import StatusBadge from "../../../components/SatutsBadge/Statusbadge";

function ViewDriverModal({
  isOpen,

  onClose,

  driver,
}) {
  if (!isOpen || !driver) return null;
  return (
    <>
      <ModalLayout title="Driver Details" width="850px" onClose={onClose}>
        <img
          src={
             `/assets/uploads/drivers/${driver.profilePic}`
              
          }
          alt="Driver"
          className="view-driver-img"
        />

        <div className="driver-view-details">
          <p>
            <strong>Name :</strong>
          {driver?.driverName}
</p>
          <p>
            <strong>Phone :</strong>

            {driver?.phone}
          </p>

          <p>
            <strong>Email :</strong>

            {driver?.email}
          </p>

          <p>
            <strong>License :</strong>

            {driver?.licenseNumber}
          </p>

          <p>
            <strong>Experience :</strong>

            {driver?.experience}
          </p>

          <p>
            <strong>Address :</strong>

            {driver?.address}
          </p>

          <p>
            <strong>Status :</strong>

            <StatusBadge status={driver?.status} />
          </p>
        </div>
      </ModalLayout>
    </>
  );
}

export default ViewDriverModal;

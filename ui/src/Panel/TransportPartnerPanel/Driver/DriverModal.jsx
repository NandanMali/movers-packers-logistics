import axios from "axios";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { apiUrlPartnerDriver } from "../../../apiUrl";
import Alert from "../../../components/Alert/alert";
import FormInput from "../components/FormInput/FormInput";
import ImageUploader from "../components/ImageUploader/ImageUploader";
import ModalLayout from "../components/ModalLayout/ModalLayout";

const DriverModal = ({ isOpen, onClose, driver, onupdate }) => {
  const [alertData, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    driverName: "",

    phone: "",

    email: "",

    licenseNumber: "",

    experience: "",

    address: "",

    status: "Available",

    profilePic: null,

    preview: "",
  });

  useEffect(() => {
    if (driver) {
      setFormData({
        driverName: driver.driverName,

        phone: driver.phone,

        email: driver.email,

        licenseNumber: driver.licenseNumber,

        experience: driver.experience,

        address: driver.address,

        status: driver.status,

        profilePic: null,

        preview:  `/assets/uploads/drivers/${driver.profilePic}`,
      });
    }
  }, [driver]);

  // useEffect(() => {

  //     if (editingDriver) {

  //         setFormData(editingDriver);

  //     } else {

  //         setFormData(initialState);

  //     }

  // }, [editingDriver]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,

        profilePic: file,

        preview: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,

      profilePic: null,

      preview: "",
    }));
  };

  // update
  const updateDriver = async (e) => {
e.preventDefault();
setAlert(null);
    try {
      const data = new FormData();

      data.append("id", driver._id);
      data.append( "driverName", formData.driverName);

      data.append( "phone", formData.phone);

      data.append( "email", formData.email);

      data.append( "licenseNumber", formData.licenseNumber);

      data.append( "experience", formData.experience);

      data.append( "address", formData.address);

      data.append( "status", formData.status);

      if (formData.profilePic) {
        data.append( "profilePic", formData.profilePic);
      }

      const response=await axios.put(apiUrlPartnerDriver+"update",data);
setAlert({
    message:"Driver Details Updated Successfully",
    type:"successAlert"
})
      setTimeout(() => {
        
          onClose();
          onupdate();
        }, 3000);
    } catch (error) {
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ModalLayout title="Edit Driver" onClose={onClose}>
      {alertData && <Alert message={alertData.message} type={alertData.type} />}
        <form>
          <ImageUploader
            preview={formData.preview}
            onChange={handleImage}
            onRemove={removeImage}
            label="Driver Photo"
          />
          <FormInput
            label="Driver Name"
            name="driverName"
            value={formData.driverName}
            onChange={handleChange}
          />

          <FormInput
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <FormInput
            label="License Number"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
          />

          <FormInput
            label="Experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />

          <FormInput
            type="textarea"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
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

              "On Leave",

              "Inactive",
            ]}
          />

          <button className="save-btn" onClick={updateDriver}>
            Update Driver
          </button>
        </form>
      </ModalLayout>
    </>
  );
};

export default DriverModal;

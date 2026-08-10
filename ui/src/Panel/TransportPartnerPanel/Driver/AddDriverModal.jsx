import axios from "axios";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import {
  apiUrlPartner,
  apiUrlPartnerDriver,
  apiUrlPartnerVehicle,
} from "../../../apiUrl";
import Alert from "../../../components/Alert/alert";
import ModalLayout from "../components/ModalLayout/ModalLayout";
import FormInput from "../components/FormInput/FormInput";
import ImageUploader from "../components/ImageUploader/ImageUploader";

const AddDriverModal = ({ isOpen, onClose, onSave }) => {
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

  const [loading, setLoading] = useState(false);

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

        profilePic: file, // Actual file for upload

        preview: reader.result, // Preview image
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const id = localStorage.getItem("_id");

      setAlert(null);

      const data = new FormData();

      data.append("partnerId", id);

      data.append("driverName", formData.driverName);

      data.append("phone", formData.phone);

      data.append("email", formData.email);

      data.append("licenseNumber", formData.licenseNumber);

      data.append("experience", formData.experience);

      data.append("address", formData.address);

      data.append("status", formData.status);

      if (formData.profilePic) {
        data.append(
          "profilePic",

          formData.profilePic,
        );
      }
      await axios.post(
        `${apiUrlPartnerDriver}save`,

        data,
      );

      setAlert({
        message: "Vehicle Added Successfully",
        type: "successAlert",
      });

      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {

      setAlert({
        message: "Vehicle Not Added",
        type: "errorAlert",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,

      profilePic: null,

      preview: "",
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      <ModalLayout title="Add Driver" onClose={onClose}>
        {alertData && (
          <Alert message={alertData.message} type={alertData.type} />
        )}
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

          <button
            className="save-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Driver"}
          </button>
        </form>
      </ModalLayout>
    </>
  );
};

export default AddDriverModal;

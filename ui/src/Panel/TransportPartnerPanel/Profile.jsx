import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrlUser } from "../../apiUrl";
import Alert from "../../components/Alert/alert";
import { FaUserLarge } from "react-icons/fa6";
import "./partner.css";

function PartnerProfile() {
  const [profilePreview, setProfilePreview] = useState();

  const [aleert, setAlert] = useState(null);

  const [edit, setEdit] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    role: "",
    address: "",
    file: null,
    ProfilePic: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  const avatarLetter = formData.name?.trim()?.charAt(0)?.toUpperCase() || "?";

  const fetchProfile = () => {
    const email = localStorage.getItem("email");
    axios
      .get(apiUrlUser + "fetch", {
        params: { email: email },
      })
      .then((res) => {
        const user = res.data[0];
        setFormData({
          name: user.name,
          email: user.email,
          username: user.username,
          phone: user.phone,
          role: user.role,
          address: user.address,
          ProfilePic: user.ProfilePic || "",
        });

        localStorage.setItem("name", user.name);
        localStorage.setItem("role", user.role);
        localStorage.setItem("username", user.username);
        localStorage.setItem("ProfilePic", user.ProfilePic || "");
        window.dispatchEvent(new Event("profileChange"));

        if (user.ProfilePic) {
          setProfilePreview(
            `${process.env.PUBLIC_URL}/assets/uploads/ProfileImage/${user.ProfilePic}`,
          );
        } else {
          setProfilePreview(null);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // =========================
  // IMAGE PREVIEW
  // =========================

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, file }));

    validateField("file", file);

    const reader = new FileReader();

    reader.onload = (e) => {
      setProfilePreview(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setProfilePreview(null);
    setFormData((prev) => ({
      ...prev,
      file: null,
      ProfilePic: "",
    }));
  };

  const [errors, setErrors] = useState({});

  //validation

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (!(value.length >= 3)) {
          error = "Name is too small";
        }
        break;

      case "username":
        if (!value.trim()) {
          error = "Username is required";
        } else if (!(value.length >= 5)) {
          error = "Username is too small";
        } else if (existingUsernames.includes(formData.email.toLowerCase())) {
          error = "Username already registered";
        }
        break;

      case "phone":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!/^\d+$/.test(value)) {
          error = "Only numbers are allowed";
        } else if (!(value.length === 10)) {
          error = "Enter a valid 10-digit number";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  // Finding existed username

  const [existingUsernames, setExistingsUsernames] = useState([]);
  useEffect(() => {
    axios.get(apiUrlUser + "fetch").then((res) => {
      const users = res.data;

      const existingUsername = [];

      for (let user of users) {
        existingUsername.push(user.username);
      }

      setExistingsUsernames(existingUsername);
    });
  }, []);

  const validateForm = () => {
    let newErrors = {};

    const errorField = () => {
      // Name Validation
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
        errorField();
      } else if (!(formData.name.length >= 3)) {
        newErrors.name = "Name is too small";
        errorField();
      }

      // Username Validation
      if (!formData.username.trim()) {
        newErrors.username = "Username is required";
        errorField();
      } else if (existingUsernames.includes(formData.username.toLowerCase())) {
        newErrors.username = "Username already registered";
        errorField();
      } else if (!(formData.username.length >= 5)) {
        newErrors.username = "UserName is too small";
        errorField();
      }

      // Phone Validation
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
        errorField();
      } else if (!/^\d+$/.test(formData.phone)) {
        newErrors.phone = "Only numbers are allowed";
        errorField();
      } else if (!(formData.phone.length === 10)) {
        newErrors.phone = "Enter a valid 10-digit number";
        errorField();
      }
    };
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setErrors({});
    }

    const users = {
      name: formData.name,
      email: formData.email,
      username: formData.username,
      phone: formData.phone,
      role: formData.role,
      address: formData.address,
      ProfilePic: formData.ProfilePic || "",
    };
    setAlert(null);

    const formdata1 = new FormData();
    formdata1.append("condition_obj", JSON.stringify({ email: users.email }));
    formdata1.append("content_obj", JSON.stringify(users));

    if (formData.file) {
      formdata1.append("file", formData.file);
    }

    axios
      .patch(apiUrlUser + "update", formdata1)
      .then((res) => {
        localStorage.setItem("name", users.name);
        localStorage.setItem("role", users.role);
        localStorage.setItem("username", users.username);
        localStorage.setItem("ProfilePic", users.ProfilePic || "");

        setAlert({
          message: "Profile updated successfully",
          type: "successAlert",
        });
        fetchProfile();

        setTimeout(() => {
          setFormData((prev) => ({
            ...prev,
            name: prev.name,
            username: prev.username,
            email: prev.email,
            phone: prev.phone,
            role: prev.role,
            address: prev.address,
          }));
        }, 4000);
        setEdit(true);
      })
      .catch((err) => {
        setAlert({ message: "Profile Updation Failed", type: "errorAlert" });
      });
  };

  useEffect(() => {
    document.body.style.opacity = "1";
    window.scrollTo(0, 0);
  }, []);

  const handleEdit = () => {
    setEdit(false);
  };
  if (loading) {
    return null; // or return a loader/spinner
  }

  return (
    <>
      {/* <!-- RIGHT PANEL --> */}

      <div className="admin-page">
        {aleert && <Alert message={aleert.message} type={aleert.type} />}
        <div className="users-top">
          <div>
            <h1>
              <FaUserLarge /> &nbsp;&nbsp;&nbsp; <big>Profile</big>
            </h1>
          </div>

          <button className="add-btn" onClick={handleEdit}>
            + Edit Profile
          </button>
        </div>
        <br />
        <br />

        {/* <!-- Upload --> */}

        <div className="upload-section">
          <div className="avatar-preview">
            {profilePreview ? (
              <img
                src={profilePreview}
                alt="profile"
                style={{ display: "block" }}
              />
            ) : (
              <span
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#E31E24",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "64px",
                  fontWeight: "bold",
                }}
              >
                {avatarLetter}
              </span>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            name="file"
            onChange={handleImageUpload}
            id="profileImage"
          />

          {!edit && (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <label htmlFor="profileImage" className="upload-btn">
                Upload Profile Image
              </label>
              {profilePreview && (
                <button
                  type="button"
                  className="remove-btn"
                  style={{
                    padding: "10px 16px",
                    borderRadius: "8px",
                    border: "1px solid #e31e24",
                    background: "white",
                    color: "#e31e24",
                    cursor: "pointer",
                  }}
                  onClick={handleRemoveImage}
                >
                  Remove Image
                </button>
              )}
            </div>
          )}
        </div>

        <div style={{ width: "100%" }}>
          <div className="form-grid">
            <div>
              <label>Full Name</label>
              {edit && <h3>{formData.name}</h3>}
              <div className="input-group">
                {!edit && (
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                )}
                {errors.name && (
                  <span className="error" style={{ color: "red" }}>
                    {errors.name}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label>Username</label>
              {edit && <h3>{formData.username}</h3>}
              <div className="input-group">
                {!edit && (
                  <input
                    type="text"
                    placeholder="Choose Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                )}
                {errors.username && (
                  <span className="error" style={{ color: "red" }}>
                    {errors.username}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label>Email Address</label>
              <h3>{formData.email}</h3>
            </div>
            <div>
              <label>Phone Number</label>
              {edit && <h3>{formData.phone}</h3>}
              <div className="input-group">
                {!edit && (
                  <input
                    type="tel"
                    placeholder="Enter Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                )}
                {errors.phone && (
                  <span className="error" style={{ color: "red" }}>
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label>Role</label>
              <h3>{formData.role}</h3>
            </div>

            <div>
              <label>Address</label>
              {edit && <h3>{formData.address}</h3>}
              <div className="input-group">
                {!edit && (
                  <textarea
                    cols={3}
                    placeholder="Enter Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                )}
              </div>
            </div>
          </div>
        </div>

        {!edit && (
          <button
            className="next-btn"
            id="nextBtn"
            style={{ width: "100%" }}
            onClick={handleSubmit}
          >
            Update Profile
            <i className="fas fa-arrow-right"></i>
          </button>
        )}
      </div>
    </>
  );
}

export default PartnerProfile;

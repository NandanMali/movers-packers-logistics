import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../../components/Alert/alert";
import { apiUrlUser } from "../../apiUrl";
import { useNavigate } from "react-router-dom";

const ChangeEmail = () => {
  const [loading, setLoading] = useState(false);
  const [aleert, setAlert] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentEmail:"",
    newEmail:"",
});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [errors, setErrors] = useState({});

  //validation

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "currentEmail":
        if (!value.trim()) {
          error = "Current Name is required";
        }
        break;

      case "newEmail":
        if (!value.trim()) {
          error = "New Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = "Invalid email";
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

  const [existingEmails,setExistingsEmail]=useState([]);
    const [existingUsernames,setExistingsUsernames]=useState([]);
  useEffect(()=>{ 
    axios.get(apiUrlUser+"fetch").then((res)=>{
      const users=res.data;
      
            const existingEmail = [];

      for (let user of users){
        existingEmail.push(user.email);
      }

      setExistingsEmail(existingEmail);
      })
},[]);

  const validateForm = () => {
    let newErrors = {};

    // Name Validation
    if (!formData.currentEmail.trim()) {
      newErrors.currentEmail = "Current Email is required";
    }

    // Email Validation
    if (!formData.newEmail.trim()) {
      newErrors.newEmail = "New Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.newEmail = "Invalid email"
    } else if (existingEmails.includes(formData.newEmail.toLowerCase())) {
      newErrors.email = "New Email must be unique";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setErrors("");
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 2000);

      setAlert(null);
      axios
        .patch(apiUrlUser + "update", {condition_obj:{email:formData.currentEmail},condition_obj:{email:formData.newEmail,status:false}})
        .then((res) => {

          setAlert({ message: "Email Changed Successful", type: "successAlert" });
          setTimeout(() => {
            
              navigate("/verify-otp", {
                  state: {
                      email: formData.newEmail,
                    },
                });
                
                setFormData({
                    currentEmail:"",
                    newEmail:"",
                    
                });
            }, 4000);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            setAlert({ message: "Verify Your Email", type: "warningAlert" });
            setTimeout(() => {
              navigate("/verify-otp");
            }, 4000);
          } else if (err.response.status === 404) {
            setAlert({ message: "Invalid Details", type: "warningAlert" });
          } else {
            setAlert({ message: "Login Failed", type: "errorAlert" });
          }
        });
    }
  };

  return (
    <>
        {/* <!-- RIGHT PANEL --> */}

        <div className="right-panel">
          <div className="login-card">
            <div className="user-icon">
              <i className="fas fa-user"></i>
            </div>

            <h2>Change Email Id</h2>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Current Email</label>

                <input
                  type="text"
                  placeholder="Enter Current Email"
                  name="currentEmail"
                  value={formData.currentEmail}
                  onChange={handleChange}
                />
                {errors.currentEmail && (
                  <span className="error" style={{ color: "red" }}>
                    {errors.currentEmail}
                  </span>
                )}
              </div>

              <div className="input-group">
                <label>New Email Id</label>

                <input
                  type="text"
                  placeholder="Enter New Email Id"
                  name="newEmail"
                  value={formData.newEmail}
                  onChange={handleChange}
                />
                {errors.newEmail && (
                  <span className="error" style={{ color: "red" }}>
                    {errors.newEmail}
                  </span>
                )}
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                Change Email Id
              </button>
            </form>
          </div>
        </div>
      
    </>
  );
};

export default ChangeEmail;

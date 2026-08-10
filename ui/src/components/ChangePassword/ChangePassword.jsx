import { useState } from "react";
import axios from "axios";
import { apiUrlUser } from "../../apiUrl";
import Alert from "../Alert/alert";
import { useNavigate } from "react-router-dom";

function ChangePassword(){

    const [confirmPassword , setConfirmPassword]=useState("");
    const [formdata,setformdata]=useState({
        oldPassword:"",
        newPassword:"",
    });
    const [errors,setErrors]=useState({});
    const [aleert,setAlert]=useState();
    const [showPassword,setShowPassword]=useState();
    const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "oldPassword":
        if (!value.trim()) {
          error = "Old Password is required";
        }
        break;

      case "newPassword":
        if (!value.trim()) {
          error = "New Password is required";
        }
        break;

      case "confirmPassword":
        if (!value.trim()) {
          error = "Confirm Password is required";
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

    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };
    
    const validateForm = () => {
    let newErrors = {};

    // Old Password Validation
    if (!formdata.oldPassword.trim()) {
      newErrors.oldPassword = "Old Password is required";
    }

    // New Password Validation
    if (!formdata.newPassword.trim()) {
      newErrors.newPassword = "New Password is required";
    } 

    // Confirm Password Validation
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // PASSWORD STRENGTH
  // =========================

  const getStrength = () => {
    let strength = 0,
      colorr,
      message;

    if (formdata.newPassword.length >= 6) strength += 25;

    if (formdata.newPassword.length >= 8) {
      strength += 25;
    }

    if (/[A-Z]/.test(formdata.newPassword) && formdata.newPassword.length >= 4) {
      strength += 25;
    }

    if (/[0-9]/.test(formdata.newPassword) && formdata.newPassword.length >= 4) {
      strength += 25;
    }
    if (strength === 0) {
      colorr = "#fff";
    } else if (strength <= 25) {
      colorr = "#ef4444";
      message = "Poor Password";
    } else if (strength <= 50) {
      colorr = "#f59e0b";
      message = "Good Password";
    } else if (strength <= 75) {
      colorr = "#3b82f6";
      message = "Strong Password";
    } else {
      colorr = "#22c55e";
      message = "Very Strong Password";
    }

    return { strength, colorr, message };
  };

  const strength = getStrength();

  // =========================
  // PASSWORD MATCH
  // =========================
  const passwordMatch =
    formdata.newPassword === confirmPassword ;

    const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm() && passwordMatch) {
      setErrors("");
      
      const email=localStorage.getItem("email");
      
      setAlert(null);
      axios
        .patch(apiUrlUser + "update",{
          condition_obj:{"email":email,"password":formdata.oldPassword},
          content_obj:{"password":formdata.newPassword}} )
        .then((res) => {

          setAlert({ message: "Password Changed Successful", type: "successAlert" });
          setConfirmPassword("");
          setformdata({
            oldPassword:"",
            newPassword:"",
          });
          
          })
        .catch((err) => {
          if(err.status===404)
           setAlert({ message: "Incorrect Old Password", type: "errorAlert" })
          else{ 
          setAlert({ message: "Password Changed Failed", type: "errorAlert" });
          }
        });
    }
  };

    return(
        <>
        {/* <!-- RIGHT PANEL --> */}
        {aleert && <Alert message={aleert.message} type={aleert.type}/>}


        <div className="right-panel">
          <div className="login-card">
            <div className="user-icon">
              <i className="fas fa-user"></i>
            </div>

            <h2>Change Password</h2>

            <form onSubmit={handleSubmit}>

              <div className="input-group">
                  <label>Old Password</label>
                  <div className="password-box">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Create Password"
                      name="oldPassword"
                      value={formdata.oldPassword}
                      onChange={handleChange}
                    />
                    <i
                      className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  </div>
                  {errors.oldPassword && (
                    <span className="error" style={{ color: "red" }}>
                      {errors.oldPassword}
                    </span>
                  )}
                </div>

              <div className="input-group">
                  <label>New Password</label>
                  <div className="password-box">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Create Password"
                      name="newPassword"
                      value={formdata.newPassword}
                      onChange={handleChange}
                    />
                    <i
                      className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  </div>
                  {errors.newPassword && (
                    <span className="error" style={{ color: "red" }}>
                      {errors.newPassword}
                    </span>
                  )}
                </div>

                <div className="strength-wrapper">
                  <span>Password Strength</span>

                  <div className="strength-bar">
                    <div
                      id="strengthFill"
                      style={{
                        width: `${strength.strength}%`,
                        background: `${strength.colorr}`,
                      }}
                    ></div>
                  </div>
                  <h5 style={{ color: `${strength.colorr}` }}>
                    {strength.message}
                  </h5>
                </div>

                <div className="input-group">
                  <label>Confirm Password</label>
                  <div className="password-box">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <i
                      className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  </div>

                  <small className={passwordMatch ? "match" : "not-match"}>
                    {" "}
                    {confirmPassword
                      ? passwordMatch
                        ? "✓ Passwords match"
                        : "✗ Passwords do not match"
                      : ""}
                  </small>
                </div>

                <button type="submit" className="login-btn" >
                    Change Password
              </button>

              </form>

            </div>
        </div>
        </>
    )
}

export default ChangePassword;
import { useState , useEffect } from "react";
import axios from "axios";
import { apiUrlUser } from "../../apiUrl";
import Alert from "../../components/Alert/alert";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
// import "./admin.css";

function AddAll({AddRole}){
    const navigate=useNavigate();

 const [profilePreview, setProfilePreview] = useState();

  const [aleert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    role: "",
    address: "",
    password:"",
    file: null,
    ProfilePic: null,
  });

  // =========================
  // IMAGE PREVIEW
  // =========================

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

      setFormData((prev)=>({...prev,file}));

    validateField("file",file);

    const reader = new FileReader();

    reader.onload = (e) => {
      setProfilePreview(e.target.result);
    };

    reader.readAsDataURL(file);
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

             case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = "Invalid email";
        } else if (existingEmails.includes(formData.email.toLowerCase())) {
          error = "Email already registered";
        }
        break;

      case "username":
        if (!value.trim()) {
          error = "Username is required";
        } else if (!(value.length >= 5)) {
          error = "Username is too small";
        } else if (existingUsernames.includes(formData.email.toLowerCase())) {
          error = "Username already registered";}
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

        case "password":
        if (!value.trim()) {
          error = "Password is required";
        } else if (!(value.length >= 5)) {
          error = "Password is too small";
        }break

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

  const [existingEmails,setExistingsEmail]=useState([]);
  const [existingUsernames,setExistingsUsernames]=useState([]);
  useEffect(()=>{ 
    axios.get(apiUrlUser+"fetch").then((res)=>{
      const users=res.data;
              const existingEmail = [];  
            const existingUsername = [];

      for (let user of users){
        existingEmail.push(user.email);
        existingUsername.push(user.username);
      }

      setExistingsEmail(existingEmail);
      setExistingsUsernames(existingUsername);
      }).catch(()=>{
        const users={};
      })
},[]);



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

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      errorField();
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email";
      errorField();
    } else if (existingEmails.includes(formData.email.toLowerCase())) {
      newErrors.email = "Email already registered";
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
    // Password Validation
    if (!formData.password.trim()) {
      newErrors.username = "Password is required";
      errorField();
    } else if (!(formData.password.length >= 5)) {
      newErrors.username = "Password is too small";
      errorField();
    }
  }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setErrors("");
    }

    const users = {
      name: formData.name,
      email: formData.email,
      username: formData.username,
      phone: formData.phone,
      role: AddRole,
      password:formData.password,
      address: formData.address,
      ProfilePic: formData.ProfilePic || "",
    };
    setAlert(null);

    const formdata1 = new FormData();
    formdata1.append("name",formData.name);
    formdata1.append("email",formData.email);
    formdata1.append("username",formData.username);
    formdata1.append("phone",formData.phone);
    formdata1.append("role",AddRole);
    if (formData.file) {
      formdata1.append("file", formData.file);
    }
    formdata1.append("password",formData.password);
    formdata1.append("address",formData.address);
    

    axios
      .post(apiUrlUser + "save", formdata1)
      .then((res) => {
        setAlert({ message: ` ${AddRole} Added successfully`, type: "successAlert" });
       
        setTimeout(() => {
          setFormData((prev) => ({
            ...prev,
            name: "",
            username: "",
            email: "",
            phone: "",
            password:"",
            address: "",
            file:null,
            ProfilePic:null,
            
          }));
          setProfilePreview(null);
        }, 4000);
      })
      .catch((err) => {
        setAlert({ message: ` ${AddRole} Addition Failed`, type: "errorAlert" });
      });
  };

  useEffect(() => {
    document.body.style.opacity = "1";
    window.scrollTo(0, 0);
  }, []);


   return(
    <>
    {/* <!-- RIGHT PANEL --> */}

          <div className="right-panel" style={{width:"100%"}}>
            {aleert && <Alert message={aleert.message} type={aleert.type} />}
          
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
                        <FaUserLarge/>
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

                  
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <label htmlFor="profileImage" className="upload-btn">
                        Upload Profile Image
                      </label>
                    </div>
                  
                </div>

            <div style={{width:"100%"}}>
              
              <div className="form-grid">
                <div className="input-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                   {errors.name && (
                    <span className="error" style={{ color: "red" }}>
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="input-group">
                  <label>Username</label>

                  <input
                    type="text"
                    placeholder="Choose Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <span className="error" style={{ color: "red" }}>
                      {errors.username}
                    </span>
                  )}
                </div>

                <div className="input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="error" style={{ color: "red" }}>
                      {errors.email}
                    </span>
                  )}
                  
                </div>

                <div className="input-group">
                  <label>Phone Number</label>

                  <input
                    type="tel"
                    placeholder="Enter Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <span className="error" style={{ color: "red" }}>
                      {errors.phone}
                    </span>
                  )}
                </div>
              
                <div className="input-group">
                  <label>Password</label>

                  <input
                    type="text"
                    placeholder="Enter Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <span className="error" style={{ color: "red" }}>
                      {errors.password}
                    </span>
                  )}
                </div>

              <div className="input-group">
                  <label>Address</label>

                 <textarea
                    cols={3}
                    placeholder="Enter Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                </div>
                </div>

              </div>

              <button className="next-btn" id="nextBtn" style={{width:"65vh"}} onClick={handleSubmit} >
                Add {AddRole}
                <i className="fas fa-arrow-right"></i>
              </button>
            
          </div>
          
    </>
   )
}

export default AddAll;
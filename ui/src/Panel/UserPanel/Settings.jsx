import "./user.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import ChangeEmail from "../../components/ChangeEmail/ChangeEmail";
import ConfirmModal from "../../components/confirmationBox/ConfirmationBox";
import axios from "axios";
import { apiUrlUser } from "../../apiUrl";
const UserSettings = () => {
 const [cpass,setCpass]=useState(false);
 const [showBack,setShowBack]=useState(false);
 const [showConfirmationModal,setShowConfirmationModal]=useState(false);
 const navigate = useNavigate();
  const handlecPassword=()=>{
    setCpass(true);
    setShowBack(true);
  }

  const handlecEmail=()=>{
    setCpass(false);
    setShowBack(true);
  }

  const handledelete=()=>{
    const id=localStorage.getItem("_id");
    axios.delete(apiUrlUser+"delete",{data:{condition_obj:{"_id":id}}}).then(()=>{
    localStorage.clear();
    navigate("/");
    }).catch((error)=>{
    })

  }

  const handleBack = () => {
    setShowBack(false);
    // navigate(-1);
  }
  return (
    <div className="admin-page">

      <h1>Settings</h1>

      {!showBack && <div className="settings-grid">

        <div className="settings-card">
          <h2>Password Settings</h2>
          <br/>
          <button className="add-btn" onClick={handlecPassword} >
            <big>Change Password</big>
          </button>
        </div>

        <div className="settings-card">
          <h2>Email Settings</h2>
          <br/>
          <button className="add-btn" onClick={handlecEmail}>
            <big>Change Email Id</big>
          </button>
        </div>

        <div className="settings-card">
          <h2>Delete Account</h2>
          <br/>
          <button className="add-btn" onClick={()=>setShowConfirmationModal(true)}>
            <big>Delete Account</big>
          </button>
        </div>

      </div>}

       <ConfirmModal
        isOpen={showConfirmationModal}
        title="Confirm Delete"
        message="Are you sure you want to delete your account?"
        onConfirm={handledelete}
        onCancel={() => setShowConfirmationModal(false)}
      />
      
      {showBack ? (
        <>
          <button className="add-btn" onClick={handleBack}>
            Back
          </button>
          <br />
          <br />
        </>
      ):(<></>)}
      {showBack && (cpass ? <ChangePassword /> : <ChangeEmail />)}
      </div>)
};

export default UserSettings;
import { Outlet, useNavigate } from "react-router-dom";
import ConfirmModal from "../../components/confirmationBox/ConfirmationBox";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import PartnerMenu from "../../config/PartnerMenu";
import DashboardNavbar from "../../components/Dashboard/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrlPartnerProfile } from "../../apiUrl";

const PartnerLayout=()=>{
      const navigate=useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [complete,setComplete]=useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);


  const fetchProfile = async ()=>{
    try{
    const id =localStorage.getItem("_id")
    const response=await axios.get(apiUrlPartnerProfile + "fetch/" +id);
if(response.data.profile[0]){
setComplete(true);
}}
catch{
  setComplete(false);
}

}

useEffect(()=>{
  setTimeout(() => {
    
    fetchProfile();
  }, 1000);
},[]);

useEffect(()=>{
     if (window.innerWidth <= 1024) {
    setSidebarOpen(false);
  }
  },[])
  const handleMenuClick = () => {
  if (window.innerWidth <= 1024) {
    setSidebarOpen(false);
  }
};

const menu=PartnerMenu(complete);
    const handleConfirmation = () => {
    localStorage.clear();

    setShowConfirmationModal(false);

    navigate("/login");
  };
    return(
    <div  className={`dashboard-layout ${
    sidebarOpen ? "" : "sidebar-closed"
  }`}>

      <Sidebar

title="Movers & Packers"
 isOpen={sidebarOpen}

menu={menu}
onClickMenu={handleMenuClick}

onLogoutClick={() =>
        setShowConfirmationModal(true)
    }

/>

      <div className="dashboard-main">

        <DashboardNavbar
    title="Transport Partner Panel"
    onToggleSidebar={() =>
    setSidebarOpen(prev => !prev)
  }
/>

        <div className="dashboard-content">
          <Outlet />
        </div>

        <ConfirmModal
        isOpen={showConfirmationModal}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onConfirm={handleConfirmation}
        onCancel={() => setShowConfirmationModal(false)}
      />

      </div>

    </div>);
}

export default PartnerLayout;
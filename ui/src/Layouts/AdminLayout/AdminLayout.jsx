import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmModal from "../../components/confirmationBox/ConfirmationBox";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import AdminMenu from "../../config/AdminMenu";
import DashboardNavbar from "../../components/Dashboard/Navbar/Navbar";
import '../dashboard.css';

const AdminLayout = () => {
  const navigate=useNavigate()
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleConfirmation = () => {
      setShowConfirmationModal(false);
    localStorage.clear();


    navigate("/login",{
      replace:true,
    });
  };

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

 
  return (
    <div className="layout">

    
<div
  className={`dashboard-layout ${
    sidebarOpen ? "" : "sidebar-closed"
  }`}
>

    <Sidebar
    title="Movers & Packers"
    menu={AdminMenu}
    isOpen={sidebarOpen}
    onClickMenu={handleMenuClick}
    onLogoutClick={() => setShowConfirmationModal(true)}
/>

    <div className="dashboard-main">

        <DashboardNavbar
  title="Admin Panel"
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

</div>
        </div>
  );
};

export default AdminLayout;
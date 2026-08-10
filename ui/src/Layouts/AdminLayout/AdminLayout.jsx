import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../../components/confirmationBox/ConfirmationBox";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import AdminMenu from "../../config/AdminMenu";
import DashboardNavbar from "../../components/Dashboard/Navbar/Navbar";

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
  return (
    
<div
  className={`dashboard-layout ${
    sidebarOpen ? "" : "sidebar-closed"
  }`}
>

    <Sidebar
    title="Movers & Packers"
    menu={AdminMenu}
    isOpen={sidebarOpen}
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
  );
};

export default AdminLayout;
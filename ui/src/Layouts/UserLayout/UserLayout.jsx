import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../../components/confirmationBox/ConfirmationBox";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import UserMenu from "../../config/UserMenu";
import DashboardNavbar from "../../components/Dashboard/Navbar/Navbar";

const UserLayout = () => {
  const navigate=useNavigate()
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleConfirmation = () => {
    localStorage.clear();

    setShowConfirmationModal(false);

    navigate("/login",{
      replace:true,
    });
  };

  return (
    <div className={`dashboard-layout ${
    sidebarOpen ? "" : "sidebar-closed"
  }`} >

      <Sidebar

title="Movers & Packers"

menu={UserMenu}
 isOpen={sidebarOpen}

onLogoutClick={() =>
        setShowConfirmationModal(true)
    }

/>

      <div className="dashboard-main">

        <DashboardNavbar
    title="User Panel"
    onToggleSidebar={() =>
    setSidebarOpen(prev => !prev)
  }
/>

        <div className="dashboard-content">
          <Outlet />
        </div>
        {/* <StatusTimeline currentStep={2} /> */}

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

export default UserLayout;
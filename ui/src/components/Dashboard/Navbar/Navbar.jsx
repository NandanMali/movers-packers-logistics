import { useState } from "react";
import { FaBell, FaBars } from "react-icons/fa";
import "../dashboard.css";

const DashboardNavbar = ({
  title = "Dashboard",
  onToggleSidebar,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const user =
{name:localStorage.getItem("name"),
    role:localStorage.getItem("role")
};


  return (
    <header className="navbar">

      <div className="navbar-left">

        <button
          className="sidebar-toggle"
          onClick={onToggleSidebar}
        >
          <FaBars />
        </button>

        <h2>{title}</h2>

    

      </div>

      <div className="navbar-right">

        {/* <input
          type="text"
          placeholder="Search..."
        /> */}

        <div className="notification-bell">
          <FaBell />
          <span>3</span>
        </div>

        <div
          className="profile"
          onClick={() =>
            setShowMenu(!showMenu)
          }
        >
          <div className="avatar">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div className="profile-info">

            <h4>
              {user?.name || "Guest"}
            </h4>

            <p>
              {user?.role || "User"}
            </p>

          </div>

          

        </div>

      </div>

    </header>
  );
};

export default DashboardNavbar;
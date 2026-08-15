import { NavLink } from "react-router-dom";
import "../dashboard.css";

const Sidebar = ({ title = "Dashboard", menu = [] ,onClickMenu , onLogoutClick }) => {
  const normalMenus = menu.filter(
    (item) => item.title !== "Logout"
  );

  const logoutMenu = menu.find(
    (item) => item.title === "Logout"
  );

  const user =
  {
    name:localStorage.getItem("name"),
    role:localStorage.getItem("role") 
  };

const LogoutIcon = logoutMenu?.icon;

  return (
    <aside className="sidebar">

      <div className="dashboardlogo">
        {title}
      </div>

      <nav>

        {normalMenus.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClickMenu}
            >
              <Icon />

              <span>{item.title}</span>

            </NavLink>
          );

        })}

      </nav>

{logoutMenu && (

<div className="sidebar-footer">

    <div className="sidebar-user">

        <div className="sidebar-avatar">

            {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}

        </div>

        <div className="sidebar-user-info">

            <h4>

                {user?.name || "Guest"}

            </h4>

            <p>

                {user?.role || "User"}

            </p>

        </div>

    </div>


    <button
        className="logout-link"
        onClick={onLogoutClick}
    >

        <LogoutIcon />

        <span>Logout</span>

    </button>



</div>

)}

    </aside>
  );
};

export default Sidebar;
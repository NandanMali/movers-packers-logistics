import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, menuItems }) => {
  return (
    <aside
      className={`sidebar ${isOpen ? "open" : "close"}`}
    >
      <div className="logo">
        MoveEasy
      </div>

      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink to={item.path}>
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
import { FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="navbar">
      <button onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className="right-section">
        <input
          type="text"
          placeholder="Search..."
        />

        <img
          src="https://i.pravatar.cc/40"
          alt=""
        />
      </div>
    </header>
  );
};

export default Navbar;
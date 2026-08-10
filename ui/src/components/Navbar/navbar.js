import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar() {

    const closeNavbar = () => {
    const navbarCollapse = document.getElementById("navbarCollapse");

    if (navbarCollapse?.classList.contains("show")) {
        const bsCollapse = window.bootstrap.Collapse.getInstance(navbarCollapse);

        if (bsCollapse) {
            bsCollapse.hide();
        }
    }
};
  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow fixed-top p-0">
      {/* Logo */}
      <Link
        to="/"
        className="navbar-brand d-flex align-items-center px-4 px-lg-5"
      >
        <h2 className="m-0 text-primary">
          <i className="fa-solid fa-truck-fast me-3"></i>
          Movers & Packers
        </h2>
      </Link>

      {/* Mobile Toggle */}
      <button
        type="button"
        className="navbar-toggler me-4"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Menu */}
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item nav-link active" : "nav-item nav-link"
            } onClick={closeNavbar}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-item nav-link active" : "nav-item nav-link"
            } onClick={closeNavbar}
          >
            About
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? "nav-item nav-link active" : "nav-item nav-link"
            } onClick={closeNavbar}
          >
            Service
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "nav-item nav-link active" : "nav-item nav-link"
            } onClick={closeNavbar}
          >
            Register
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-item nav-link active" : "nav-item nav-link"
            } onClick={closeNavbar}
          >
            Login
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-item nav-link active" : "nav-item nav-link"
            } onClick={closeNavbar}
          >
            Contact
          </NavLink>
        </div>

        {/* Desktop Quote Button */}
        {/* <Link to="/" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">
          Get A Quote
          <i className="fa fa-arrow-right ms-3"></i>
        </Link> */}
      </div>
    </nav>
  );
}

export default Navbar;

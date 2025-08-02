import React from "react";
import { NavLink } from "react-router-dom";
import { authApi } from "../../Service/api";

const NavBar = () => {
  const handleLogout = () => {
    authApi.logout();
  };
  const role = authApi.getRole();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <img
        className="me-3"
        src="/images/appicon.png"
        alt="App Icon"
        width="60px"
      />
      {/* Toggle button for mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="nav nav-pills me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link" end>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            {role === "admin" ? (
              <NavLink to="/dashboard/admincontacts" className="nav-link">
                Contact
              </NavLink>
            ) : (
              <NavLink to="/dashboard/contact" className="nav-link">
                Contact
              </NavLink>
            )}
          </li>
          <li className="nav-item">
            {role === "admin" ? (
              <NavLink to="/dashboard/servicemanagement" className="nav-link">
                Service
              </NavLink>
            ) : (
              <NavLink to="/dashboard/service" className="nav-link">
                Service
              </NavLink>
            )}
          </li>
          <li>
            {role === "admin" ? (
              <NavLink to="/dashboard/quotemanagement" className="nav-link">
                Quote
              </NavLink>
            ) : (
              <NavLink to="/dashboard/quote" className="nav-link">
                Quote
              </NavLink>
            )}
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard/price" className="nav-link">
              Price
            </NavLink>
          </li>
        </ul>
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

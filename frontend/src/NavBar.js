import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">CRY</div>
      <div className="navbar-right">
        <FontAwesomeIcon icon={faBell} className="navbar-icon" />
        <span className="navbar-user-name">User Name</span>
        <FontAwesomeIcon
          icon={faUserCircle}
          className="navbar-icon user-icon"
        />
      </div>
    </nav>
  );
}

export default Navbar;

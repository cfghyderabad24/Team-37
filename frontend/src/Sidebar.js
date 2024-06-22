import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "200px",
        background: "#c0c0c0",
        padding: "10px",
        height: "100vh",
        marginRight: "970px",
        marginTop: "100px",
      }}
    >
      <h2>Menu</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li>
          <Link
            to="./UploadForm"
            style={{ textDecoration: "none", color: "black" }}
          >
            Files Upload
          </Link>
        </li>
        <li>
          <Link
            to="./Progress"
            style={{ textDecoration: "none", color: "black" }}
          >
            Progress Report
          </Link>
        </li>
        <li>
          <Link
            to="./Analysis"
            style={{ textDecoration: "none", color: "black" }}
          >
            Data Visualization
          </Link>
        </li>
        <li>
          <Link
            to="./ApproveDocument"
            style={{ textDecoration: "none", color: "black" }}
          >
            Approve Document
          </Link>
        </li>
        <li>
          <Link to="/logout" style={{ textDecoration: "none", color: "black" }}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

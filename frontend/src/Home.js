import React from "react";
import UploadForm from "./UploadForm";
// index.js or App.js
import "bootstrap/dist/css/bootstrap.min.css";
import Progress from "./progress";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
function Home() {
  return (
    <div>
      <Navbar />

      <Sidebar />
      {/* <div className="home">
        <h1>Welcome</h1>
      </div> */}
    </div>
  );
}

export default Home;

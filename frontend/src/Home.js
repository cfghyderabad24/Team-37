import React from "react";
import UploadForm from "./UploadForm";
// index.js or App.js
import "bootstrap/dist/css/bootstrap.min.css";
import Progress from "./progress";
function Home() {
  return (
    <div className="home">
      <Progress />
      <div>
        <UploadForm />
      </div>
    </div>
  );
}

export default Home;

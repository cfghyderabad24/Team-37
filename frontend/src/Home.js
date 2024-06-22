import React from "react";

// index.js or App.js
import "bootstrap/dist/css/bootstrap.min.css";
import Progress from "./progress";
function Home() {
  return (
    <div className="home">
      <Progress />
      <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="profileImage" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Home;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./Login";
import Analysis from "./Analysis";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/stats" element={<Analysis />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Home/UploadForm" element={<UploadForm />} />
        <Route path="/Home/Progress" element={<Progress />} />
        <Route path="/Home/Analysis" element={<Analysis />} />
        <Route path="/Home/ApproveDocument" element={<ApproveDocument />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

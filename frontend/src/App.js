import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./Login";
import Analysis from "./components/analysis";
import PageNotFound from "./components/PageNotFound";
import UploadForm from "./components/uploadForm";
import DocumentStatus from "./components/DocumentStatus";
import ApproveDocument from "./components/ApproveDocument";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/stats" element={<Analysis />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/uploadform" element={<UploadForm />} />
        <Route path="/documentstatus" element={<DocumentStatus />} />
        <Route path="/approve" element={<ApproveDocument />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

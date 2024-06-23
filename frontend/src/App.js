import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Analysis from "./Analysis";
import PageNotFound from "./components/PageNotFound";
// index.js or App.js
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import UploadForm from "./UploadForm";
import Progress from "./progress";
import ApproveDocument from "./ApproveDocument";

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

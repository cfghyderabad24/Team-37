import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Analysis from "./components/analysis";
import PageNotFound from "./components/PageNotFound";
// index.js or App.js
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/stats" element={<Analysis />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

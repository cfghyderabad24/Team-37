import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Analysis from "./components/analysis";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/stats" element={<Analysis />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

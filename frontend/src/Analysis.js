import React from "react";
import DelayPieChart from "./delayPieChart";
import Bargraph from "./Bargraph";
import "./analysis.css";
const Analysis = () => {
  return (
    <>
      <div className="card ">
        <DelayPieChart />
      </div>
      <div>
        <h1>
          <Bargraph />
        </h1>
      </div>
    </>
  );
};

export default Analysis;

import React from "react";
import DelayPieChart from "./../components/delayPieChart";
import Bargraph from "./Bargraph";

const analysis = () => {
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

export default analysis;

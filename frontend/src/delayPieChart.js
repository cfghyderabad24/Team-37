import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const delayPieChart = () => {
  // Static data for testing
  const data = [
    { name: "On-Time", value: 60 },
    { name: "Delay", value: 40 },
  ];

  const COLORS = ["#0088FE", "#00C49F"]; // Colors for different sections of the pie chart

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Registration and Project Creation Stats</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default delayPieChart;

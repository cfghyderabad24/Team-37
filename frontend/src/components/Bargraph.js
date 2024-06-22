import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const Bargraph = () => {
  // Static data for testing
  const data = [
    { name: "Jan", Utilization: 85 },
    { name: "Feb", Utilization: 90 },
    { name: "Mar", Utilization: 75 },
    { name: "Apr", Utilization: 80 },
    { name: "May", Utilization: 95 },
    { name: "June", Utilization: 70 },
  ];

  return (
    <div className="card">
      <h2>Utilization Report</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Utilization" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Bargraph;

import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Progress() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Mapping data for options and corresponding percentages
  const options = [
    { name: "NGO 1", percentage: 25 },
    { name: "NGO 2", percentage: 0 },
    { name: "NGO 3", percentage: 50 },
    { name: "NGO 4", percentage: 100 },
    { name: "NGO 5", percentage: 75 },
  ];

  return (
    <div
      style={{
        backgroundColor: "#90EE90",
        width: "300PX",
        height: "200px",
        borderRadius: "4%",
        padding: "10px",
      }}
    >
      <label htmlFor="ngoDropdown">Select an Option:</label>
      <select
        id="ngoDropdown"
        value={selectedOption}
        onChange={handleSelectChange}
        style={{ marginLeft: "10px" }}
      >
        <option value="">Select an Option</option>
        {options.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>

      {selectedOption && (
        <div
          style={{
            marginTop: "20px",
            width: "100px",
            height: "100px",
          }}
        >
          <CircularProgressbar
            value={
              options.find((opt) => opt.name === selectedOption).percentage
            }
            text={`${
              options.find((opt) => opt.name === selectedOption).percentage
            }%`}
          />
        </div>
      )}
    </div>
  );
}

export default Progress;

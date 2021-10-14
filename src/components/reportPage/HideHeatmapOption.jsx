import React, { useState } from "react";
import "./hide-heatmap-option.css";
const HideHeatmapOption = ({ handleToggle }) => {
  // copied from https://www.w3schools.com/howto/howto_css_switch.asp

  const [checkAttribute, setCheckAttribute] = useState(true);
  const checkboxStyle = {
    width: "1.1rem",
    height: "1.1rem",
  };

  const handleClick = () => {
    setCheckAttribute(!checkAttribute);
    handleToggle();
  };

  return (
    <div className="hide-heatmap-ctn results">
      <input type="checkbox" style={checkboxStyle} onClick={handleClick} checked={checkAttribute} />
      <label> Click on image to toggle heatmap on/off</label>
      <label className="switch">
        <input type="checkbox" onClick={handleClick} checked={checkAttribute} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};
export default HideHeatmapOption;

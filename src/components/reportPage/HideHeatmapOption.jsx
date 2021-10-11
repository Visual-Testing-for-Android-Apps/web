import React from "react";
import "./hide-heatmap-option.css";
const HideHeatmapOption = ({ handleToggle }) => {
  // copied from https://www.w3schools.com/howto/howto_css_switch.asp
  return (
    <div className="hide-heatmap-ctn">
      <label>Hide heatmaps</label>
      <label className="switch">
        <input type="checkbox" onClick={handleToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};
export default HideHeatmapOption;

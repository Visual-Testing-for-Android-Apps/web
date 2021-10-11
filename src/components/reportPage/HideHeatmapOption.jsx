import React from "react";
import "./hide-heatmap-option.css";
const HideHeatmapOption = (props) => {
  const { handleToggle } = props;

  // copied from //src https://www.w3schools.com/howto/howto_css_switch.asp
  return (
    <div className="hide-heatmap-ctn">
      <label>Hide heatmaps</label>
      <label class="switch">
        <input type="checkbox" onClick={handleToggle} />
        <span class="slider round"></span>
      </label>
    </div>
  );
};
export default HideHeatmapOption;

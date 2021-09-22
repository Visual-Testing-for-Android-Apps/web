import React, { useState } from "react";
import "./batch-job.css";
import helpIcon from "../images/helpIcon.png";

const VideoInstructions = () => {
  const [openHelp, setOpenHelp] = useState(false);

  const handlePanelToggle = (e) => {
    setOpenHelp(!openHelp);
  };

  return (
    // <div type="button" className="help-container">
    //     <div onClick={handlePanelToggle} className="help-header">
    //     Video Upload Instructions</div>
    //     {open ? (
    //     <div className="content">
    //     <p>Hello</p>
    //     </div>
    //     ) : null}
    <div>
      <div className="help-button" onClick={handlePanelToggle}>
        <img src={helpIcon} width="25" height="25" />
      </div>
      {openHelp && (
        <div className="loading-style">
          <div className="help-content">
            <button className="exit-help-content" onClick={handlePanelToggle}>
              {" "}
              x{" "}
            </button>
            Video Upload Instructions
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoInstructions;

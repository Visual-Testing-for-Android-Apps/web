import React, { useState } from "react";
import "./batch-job.css";
import helpIcon from "../images/helpIcon.png";
import closeIcon from "../images/closeIcon.png";
import uploadInstructions from "../images/uploadInstructions.png";

const VideoInstructions = () => {
  const [openHelp, setOpenHelp] = useState(false);

  const handlePanelToggle = (e) => {
    setOpenHelp(!openHelp);
  };

  return (
    <div>
      <div className="help-button" onClick={handlePanelToggle}>
        <img className="help-icon" src={helpIcon} width="25" height="25" />
        &nbsp;Video Upload Instructions
      </div>
      {openHelp && (
        <div className="loading-style">
          <div className="help-content">
            <h3 style={{ textAlign: "center" }}>Video Upload Instructions</h3>
            <div className="exit-help-button" onClick={handlePanelToggle}>
              <img src={closeIcon} width="25" height="25" />
            </div>
            Your uploaded videos should each show a single GUI animation in your app. Videos are
            processed by splitting them into 8 frames. For best results, make your videos are short
            as possible. <br />
            <img className="video-example" src={uploadInstructions} />
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoInstructions;

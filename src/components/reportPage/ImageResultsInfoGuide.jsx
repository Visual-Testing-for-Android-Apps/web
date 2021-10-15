import React, { useState } from "react";
import "./image-result-info-guide.css";
import closeIcon from "../images/closeIcon.png";
import infoIcon from "../images/blue-info-icon.png";

const ImageResultsInfoGuide = () => {
  const [openInfoGuide, setOpenInfoGuide] = useState(false);

  const handleOpenResultGuide = () => {
    setOpenInfoGuide(true);
  };

  const handleCloseResultGuide = () => {
    setOpenInfoGuide(false);
  };

  const PopUpGuide = () => {
    return (
      <div className="loading-style">
        <div className="help-content info-content">
          <h3 style={{ textAlign: "center" }}>How to interpret your results?</h3>
          <div className="exit-help-button" onClick={handleCloseResultGuide}>
            <img src={closeIcon} width="25" height="25" />
          </div>

          <h4>Image Result Analysis</h4>
          <p>Find the issue type(s) identified, listed beneath each image.</p>
          <p>Examine highlighted heatmap areas to identify the issue location(s).</p>
          <p>
            Compare the result to the original image by clicking the image to toggle the heatmap
            on/off.
          </p>
          <h5>Component Occlusion</h5>
          <p>
            Overlapping UI components detected from the image may be causing component visibility
            issues.
          </p>
          <h5>Missing Image</h5>
          <p>There is a broken or missing image where an image is expected.</p>
          <h5>Null Value</h5>
          <p>Unexpected NULL values are visible in the UI.</p>
          <h5>No Defect</h5>
          <p>Image has no detected UI issues.</p>
          <br />
          <div></div>
        </div>
      </div>
    );
  };
  const InterpretResults = () => {
    return (
      <div className="image-res-guide results">
        <button className="btn-img-res-info" onClick={handleOpenResultGuide}>
          <img src={infoIcon} width="20" height="20" />
          How to interpret results
        </button>
      </div>
    );
  };

  return (
    <>
      <InterpretResults />
      {openInfoGuide && <PopUpGuide />}
    </>
  );
};
export default ImageResultsInfoGuide;

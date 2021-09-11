import React from "react";

import "./mainpage.css";
import "./example-video-result-section.css";
import VideoExample from "../images/videoExample.jpg";
import VideoResultExplanation from "../common/VideoResultExplanation";

const VideoResultExampleSection = () => {
  const IMAGE_WIDTH = (576 / 2) * 1.65;
  return (
    <div className="section  example-video-section" id="exampleVideoSection">
      <div className="example-section">
        <div className="video-result-example-header-container"></div>
        <div className="video-example-body">
          <div className="video-defects-list-container">
            <h3>Find design violations</h3>
            <p>An AI model will scan for Material Design Guidlines violations.</p>
            <ul className="video-defects-list">
              <li>
                <h4>Violations</h4>
              </li>
              <li>
                <span className="checkmark">✓</span>&nbsp;&nbsp;&nbsp;Passing through other material
              </li>
              <li>
                <span className="checkmark">✓</span>&nbsp;&nbsp;&nbsp;Missing background scrim
              </li>
              <li>
                <span className="checkmark">✓</span>&nbsp;&nbsp;&nbsp;Snackbar blocking bottom
                navigation
              </li>
              <li>
                <span className="checkmark">✓</span>&nbsp;&nbsp;&nbsp;Stacking multiple banners
              </li>
              <li>
                <span className="checkmark">✓</span>&nbsp;&nbsp;&nbsp;Flipping cards
              </li>
              <li>
                <span className="checkmark">✓</span>&nbsp;&nbsp;&nbsp;Card occlusion
              </li>
              <li>
                <span className="checkmark">✓</span>&nbsp;&nbsp;&nbsp;Stacking multiple snackbars
              </li>
              <li>
                <span className="checkmark">✓</span>&nbsp;&nbsp;&nbsp;Missing shadows
              </li>
              <li>
                <span className="checkmark">✓</span>&nbsp;&nbsp;&nbsp;Modal missing scrim
              </li>
            </ul>
          </div>
          <div className="video-result-example-container">
            <img src={VideoExample} />
            <div className="video-explanation-container">
              <VideoResultExplanation issueClassification={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoResultExampleSection;

import React from "react";

import "./mainpage.css";
import "./example-section.css";
import ExampleResultImage from "../images/example-result.png";

const ExampleSection = () => {
  const IMAGE_WIDTH = (576 / 2) * 1.2;
  const IMAGE_HEIGHT = (1024 / 2) * 1.2;
  return (
    <div className="section example-section" id="exampleSection">
      <div>
        <h2 className="example-title">Analyse Android app screenshots for issues</h2>
        <p className="example-text">
          An AI model will scan your screenshots and identify UI defects.
          <br /> A heatmap will show the locations of the detected defects.
        </p>
      </div>
      <img
        className="example-image-result"
        src={ExampleResultImage}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
      />
    </div>
  );
};

export default ExampleSection;

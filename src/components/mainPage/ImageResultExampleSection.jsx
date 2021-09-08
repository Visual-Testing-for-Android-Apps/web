import React from "react";

import "./mainpage.css";
import "./example-section.css";
import "./image-example-section.css";
import ExampleResultImage from "../images/example-result.png";

const ImageResultExampleSection = () => {
  const IMAGE_WIDTH = (576 / 2) * 1;
  const IMAGE_HEIGHT = (1024 / 2) * 1;
  return (
    <div className="section example-image-section" id="exampleImageSection">
      <div className="example-section">
        <div>
          <h2>Analyse Android app screenshots for issues</h2>
          <p>
            An AI model will scan your screenshots and identify UI defects.
            <br /> A heatmap will show the locations of the detected defects.
          </p>
        </div>
        <div className="example-image-results-container">
          <img
            className="example-image-result"
            src={ExampleResultImage}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
          />
          <img
            className="example-image-result"
            src={ExampleResultImage}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
          />
          <img
            className="example-image-result"
            src={ExampleResultImage}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageResultExampleSection;

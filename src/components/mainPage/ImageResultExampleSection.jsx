import React from "react";

import "./mainpage.css";
import "./example-section.css";
import "./image-example-section.css";
import OcclussionExampleImage from "../images/occlusionExample.png";
import MissingImageExampleImage from "../images/missingImageExample.png";
import NullValueExampleImage from "../images/nullValueExample.png";

const ImageResultExampleSection = () => {
  const IMAGE_WIDTH = (576 / 2) * 1;
  const IMAGE_HEIGHT = (1024 / 2) * 1;
  const ExampleImageResult = (props) => {
    return (
      <div className="example-image-result-cell">
        <img
          className="example-image-result"
          src={props.exampleResultImage}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
        />
        <label className="example-image-result-label">{props.label}</label>
      </div>
    );
  };
  return (
    <div className="section example-image-section" id="exampleImageSection">
      <div className="example-section">
        <div className="example-section-header">
          <h2>Analyse Android app screenshots for issues</h2>
          <p>
            An AI model will scan your screenshots and identify UI defects.
            <br /> A heatmap will show the locations of the detected defects.
          </p>
        </div>
        <div className="example-image-results-container">
          <ExampleImageResult
            exampleResultImage={OcclussionExampleImage}
            label="Component Occlusion"
          />
          <ExampleImageResult exampleResultImage={MissingImageExampleImage} label="Missing Image" />
          <ExampleImageResult exampleResultImage={NullValueExampleImage} label="Null Value" />
        </div>
      </div>
    </div>
  );
};

export default ImageResultExampleSection;

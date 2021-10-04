import React from "react";

import "./mainpage.css";
import "./report-example-section.css";

const WhySection = () => {
  return (
    <div className="section" id="exampleWhySection">
      <div className="example-section">
        <h2>Why VISION?</h2>
        <div className="why-header-body-space" />
        <h3>Improve your design</h3>
        <p>
          Catch issues before they reach your users. Based on common GUI defects and Material Design
          violations.
        </p>
        <h3>Automate testing</h3>
        <p>
          Integrate VISION into your CI/CD pipeline. Submit batch jobs through our web interface
          with up to 100 images and videos, or host it yourself. Source code is freely available on
          Github.
        </p>
        <h3>Stream results in real-time</h3>
        <p>See your results as soon as they are ready by submitting a live job.</p>
      </div>
    </div>
  );
};

export default WhySection;

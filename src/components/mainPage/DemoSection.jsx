import React from "react";

import "./mainpage.css";
import "./demo-section.css";
import DemoVideo from "./DemoVideo";

const DemoSection = (props) => {
  const scrollToJobSelectionSection = () => {
    props.jobSectionRef.current.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <div className="section demo-section" id="DemoSection">
      <div className="demo-body-container ">
        <div className="item-a">
          <h1 className="demo-title">VISUAL TESTING PLATFORM</h1>
          <p>
            Improve your user experience today! With the VISION reliable testing platform we'll
            curate accurate design decisions for your Android application.
          </p>
          <button onClick={scrollToJobSelectionSection}>Get Started</button>
        </div>
        <div className="item-b">
          <DemoVideo embedId="Fr4C4O5rD-8" />
        </div>
      </div>
    </div>
  );
};

export default DemoSection;

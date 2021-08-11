import React, { forwardRef, useRef } from "react";

import "./mainpage.css";
import "./demo-section.css";

const DemoSection = (props) => {
  const scrollToJobSelectionSection = () => {
    props.jobSectionRef.current.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <div className="section demo-section" id="DemoSection">
      <div className="container">
        <div className="item a">
          <h1 className="demo-title">VISUAL TESTING PLATFORM</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.{" "}
          </p>
          <button onClick={scrollToJobSelectionSection}>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default DemoSection;

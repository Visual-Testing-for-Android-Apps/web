import React from "react";

import "./mainpage.css";
import "./job-section.css";
// import DemoSection from "./DemoSection";
import JobSelectionSection from "./JobSelectionSection";
import AboutSection from "./AboutSection";

const MainPage = () => {
  return (
    <div className="section__container">
      <JobSelectionSection />
      <AboutSection />
    </div>
  );
};

export default MainPage;

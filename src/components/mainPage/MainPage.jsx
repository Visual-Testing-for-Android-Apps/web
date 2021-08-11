import React from "react";

import "./mainpage.css";
import DemoSection from "./DemoSection";
import JobSelectionSection from "./JobSelectionSection";
import AboutSection from "./AboutSection";

const MainPage = () => {
  return (
    <div className="section__container">
      <DemoSection />
      <JobSelectionSection />
      <AboutSection />
    </div>
  );
};

export default MainPage;

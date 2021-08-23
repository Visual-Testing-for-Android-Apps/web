import React, { useRef } from "react";

import "./mainpage.css";
import "./job-section.css";
import JobSelectionSection from "./JobSelectionSection";
import AboutSection from "./AboutSection";
import DemoSection from "./DemoSection";

const MainPage = () => {
  const jobSectionRef = useRef();
  return (
    <div className="main_section__container">
      <DemoSection jobSectionRef={jobSectionRef} />
      <JobSelectionSection ref={jobSectionRef} />
      <AboutSection />
    </div>
  );
};

export default MainPage;

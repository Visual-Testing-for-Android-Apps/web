import React, { useRef } from "react";

import "./mainpage.css";
import "./job-section.css";
import JobSelectionSection from "./JobSelectionSection";
import AboutSection from "./AboutSection";
import DemoSection from "./DemoSection";
import ImageResultExampleSection from "./ImageResultExampleSection";
import VideoResultExampleSection from "./ExampleVideoResultsSection";
import ReportExampleSection from "./ReportExampleSection";
import WhySection from "./WhySection";

const MainPage = () => {
  const jobSectionRef = useRef();
  return (
    <div className="main_section__container">
      <DemoSection jobSectionRef={jobSectionRef} />
      <ImageResultExampleSection />
      <VideoResultExampleSection />
      <ReportExampleSection />
      <WhySection />
      <JobSelectionSection ref={jobSectionRef} />
      <AboutSection />
    </div>
  );
};

export default MainPage;

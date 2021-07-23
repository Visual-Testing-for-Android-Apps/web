import React from "react";

import UploadSection from "./UploadPage";
import "./mainpage.css";
import ExampleSection from "./ExampleSection";
import AboutSection from "./AboutSection";

const MainPage = () => {
  return (
    <div className="section__container">
      <UploadSection />
      <ExampleSection />
      <AboutSection />
    </div>
  );
};

export default MainPage;
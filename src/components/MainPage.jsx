import React from "react";

import UploadSection from "./UploadPage";
import "./mainpage.css";
import ExampleSection from "./ExampleSection";

const MainPage = () => {
    return (
        <div className="section__container">
            <UploadSection />
            <ExampleSection />
        </div>
    )
}

export default MainPage;

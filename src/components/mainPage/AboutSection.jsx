
import React from "react";

import "./mainpage.css";
import "./about-section.css";
import AboutPageImage from "../images/About-page.png";


const AboutSection = () => {
    const IMAGE_WIDTH = 400 / 2 * 1.2;
    const IMAGE_HEIGHT = 275 / 2 * 1.2;
    return (
    <div className="section about-section" id="AboutSection">
        <div>
            <h2 className="about-title">ABOUT</h2>
            <p className="about-text">
            The visual testing platform is a testing application that will provide Android app  <br /> 
            developers, who aim to improve usability in their application, single-point access to  <br />
            feedback reports on areas that require enhancement in their mobile application.<br />
                                                                                           <br />
            Specifically, it will be able to determine various issues with the User Interface (UI) <br />
            such as incorrect rendering and animation errors when given a screenshot or video  <br />
            of their application.<br />
                                                                                            <br />
            The uploaded images and videos are processed by specific AI algorithms, <br />
            OwlEyes and Seenomaly respectively, the first of which returning<br /> 
            a heatmap indicating the likely location of design violations, <br />
            and the latter returning the type of animation issue present.

            </p>
        </div><img className="about-image" src={AboutPageImage} width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
    </div>
    )
}

export default AboutSection;

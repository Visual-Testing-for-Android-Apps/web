import React from "react";
import "./mainpage.css";
import "./report-example-section.css";
import ReportExampleVideoMp4 from "../images/report-example.mp4";
import ReportExampleVideoWebm from "../images/report-example.webm";

const ReportExampleSection = () => {
  return (
    <div className="section example-section report-example-section">
      <h2>Detailed issues report</h2>
      <div className="report-example-container">
        <video className="report-example-video" autoPlay loop muted>
          <source src={ReportExampleVideoMp4} />
          <source src={ReportExampleVideoWebm} />
        </video>
        <div className="report-description-container">
          <ul className="video-defects-list">
            <li>
              <span className="checkmark">✓</span>&nbsp;&nbsp;&nbsp;Receive your results as an
              interactive report
            </li>
            <li>
              <span className="checkmark">✓</span>&nbsp;&nbsp;&nbsp;Filter your results by issue
              type
            </li>
            <li>
              <span className="checkmark">✓</span>&nbsp;&nbsp;&nbsp;Download your results for
              reporting
            </li>
            <li>
              <span className="checkmark">✓</span>&nbsp;&nbsp;&nbsp;Watch your report stream live
              with live job
            </li>
            <li>
              <span className="checkmark">✓</span>&nbsp;&nbsp;&nbsp;Save waiting and get notified
              via email with batch job
            </li>
            <li>
              <span className="checkmark">✓</span>&nbsp;&nbsp;&nbsp;Select between four heatmap
              colour schemes
            </li>
            <li>
              <span className="checkmark">✓</span>&nbsp;&nbsp;&nbsp;Search for files
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportExampleSection;

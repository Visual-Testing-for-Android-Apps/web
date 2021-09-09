import React from "react";
import "./mainpage.css";
import "./report-example-section.css";
import ReportExampleVideo from "../images/example-report.mp4";

const ReportExampleSection = () => {
  return (
    <div className="section example-section report-example-section">
      <h2>Detailed issues report</h2>
      <div className="report-example-container">
        <video className="report-example-video" src={ReportExampleVideo} autoPlay loop controls />
        <div className="report-description-container">
          <p>
            Interactive report <br />
            <br />
            Filter by issue type
            <br />
            <br />
            Download results for reporting
            <br />
            <br />
            In real time or delivered to your email
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportExampleSection;

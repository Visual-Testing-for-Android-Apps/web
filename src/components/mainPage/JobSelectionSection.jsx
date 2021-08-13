import React, { forwardRef } from "react";
import "./mainpage.css";
import BatchIcon from "../images/batchIcon2.png";
import LiveIcon from "../images/liveJobIcon.png";

const JobSelectionSection = forwardRef((props, ref) => {
  function renderButton(icon, jobType, description) {
    return (
      <button className="jobBtn">
        <div className="icon-container">
          <img className="img-size" src={icon} />
        </div>

        <h1 className="jobType">{jobType}</h1>
        <p className="jobDescription">{description}</p>
      </button>
    );
  }

  function Card(icon, jobType, desc, buttonName) {
    return (
      <div className="Card">
        <div>
          <div className="image-container">
            <img src={icon} height="95px" width="84px"></img>
          </div>
        </div>
       <div className="lower-container">
          <h2>{jobType}</h2>
          <p>{desc}</p>
          <button>{buttonName}</button>
        </div> 
      </div>
    );
  }

  return (
    <div className="mainSection" ref={ref}>
      <div className="selection-heading">
        <h1 className="title">What do you want to do?</h1>
      </div>
      <div className="btnContainer">
        {renderButton(LiveIcon, "LIVE JOB", "See results in real time. Up to 10 images and videos")}
        <span className="btn-space"></span>
        {renderButton(
          BatchIcon,
          "BATCH JOB",
          "Submit up to 100 images and videos. Get an email report"
        )}
      </div>
    </div>
  );
});

export default JobSelectionSection;

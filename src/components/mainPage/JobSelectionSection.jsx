import React, { forwardRef } from "react";
import "./mainpage.css";
import BatchIcon from "../images/batchIcon2.png";
import LiveIcon from "../images/liveJobIcon.png";
import { useHistory } from "react-router-dom";

const JobSelectionSection = forwardRef((props, ref) => {
  const history = useHistory();
  const handleLiveJob = () => {
    console.log('pls');
    history.push("/livejob");
  };

  const handleBatchJob = () => {
    history.push("/batchjob");
  } 

  function renderButton(icon, jobType, description, someFunction) {
    return (
      <button className="jobBtn" onClick={someFunction}>
        <div className="icon-container">
          <img className="img-size" src={icon} />
        </div>

        <h1 className="jobType">{jobType}</h1>
        <p className="jobDescription">{description}</p>
      </button>
    );
  }

  return (
    <div className="mainSection" ref={ref}>
      <div className="selection-heading">
        <h1 className="title">What do you want to do?</h1>
      </div>
      <div className="btnContainer">
        {renderButton(
          LiveIcon,
          "LIVE JOB",
          "See results in real time. Up to 10 images and videos",
         () => handleLiveJob()
        )}
        <span className="btn-space"></span>
        {renderButton(
          BatchIcon,
          "BATCH JOB",
          "Submit up to 100 images and videos. Get an email report",
          () => handleBatchJob()
        )}
      </div>
    </div>
  );
});

export default JobSelectionSection;

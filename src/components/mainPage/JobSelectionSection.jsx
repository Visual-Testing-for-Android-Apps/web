import React, { forwardRef } from "react";
import "./mainpage.css";
import BatchIcon from "../images/batchIcon2.png";
import LiveIcon from "../images/liveJobIcon.png";
import { useHistory } from "react-router-dom";

const JobSelectionSection = forwardRef((props, ref) => {
  const history = useHistory();
  const handleLiveJob = () => {
    history.push("/livejob");
  };

  const handleBatchJob = () => {
    history.push("/batchjob");
  };

  function JobButton(props) {
    return (
      <button className="jobBtn" onClick={props.clickHandler}>
        <div className="icon-container">
          <img className="img-size" src={props.icon} />
        </div>

        <h1 className="jobType">{props.jobType}</h1>
        <p className="jobDescription">{props.description}</p>
      </button>
    );
  }

  return (
    <div className="mainSection" ref={ref}>
      <div className="selection-heading">
        <h1 className="title">What do you want to do?</h1>
      </div>
      <div className="btnContainer">
        <JobButton
          icon={LiveIcon}
          jobType="LIVE JOB"
          description="See results in real time. Up to 10 images and videos"
          clickHandler={() => handleLiveJob()}
        />
        <span className="btn-space"></span>
        <JobButton
          icon={BatchIcon}
          jobType="BATCH JOB"
          description="Submit up to 100 images and videos. Get an email report"
          clickHandler={() => handleBatchJob()}
        />
      </div>
    </div>
  );
});

export default JobSelectionSection;

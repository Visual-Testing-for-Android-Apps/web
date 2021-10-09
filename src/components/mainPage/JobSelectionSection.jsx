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
        <div className="description">
          <p className="jobDescription">{props.description}</p>
        </div>
      </button>
    );
  }

  return (
    <div className="mainSection" ref={ref}>
      <div className="example-section">
        <div className="selection-heading">
          <h1 className="title">What do you want to do?</h1>
        </div>
        <div className="btnContainer">
          <JobButton
            icon={LiveIcon}
            jobType="LIVE JOB"
            description="Submit up to 10 images and videos and watch the results appear in real time"
            clickHandler={() => handleLiveJob()}
          />
          <JobButton
            icon={BatchIcon}
            jobType="BATCH JOB"
            description="Submit up to 100 images and videos and receive the results via email"
            clickHandler={() => handleBatchJob()}
          />
        </div>
      </div>
    </div>
  );
});

export default JobSelectionSection;

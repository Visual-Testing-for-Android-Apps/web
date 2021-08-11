import React from "react";
import "./mainpage.css";
import BatchIcon from "../images/batchIcon.png";
import LiveIcon from "../images/liveJobIcon.png";

const JobSelectionSection = () => {
  function renderButton(icon, jobType, description) {
    return (
      <button className="jobBtn">
        {" "}
        <img src={icon} />
        <h1>{jobType}</h1>
        <p>{description}</p>
      </button>
    );
  }

  return (
    <div className="mainSection">
      <div className="selection-heading">
        <h1 className="title">What do you want to do?</h1>
      </div>
      <div>
        {renderButton(LiveIcon, "Live Job", "Description 1")}
        {renderButton(BatchIcon, "Batch Icon", "Something")}
      </div>

      {/* <div className="btnContainer">
                <button className="liveBtn">
                    
                    <h1>Live Job</h1>
                    <p>explanation</p>
                </button>
                
                <button className="batchBtn">
                    <h1>Batch Job</h1>
                    <p>somethign</p>
                </button> */}
      {/* </div> */}
    </div>
  );
};

export default JobSelectionSection;

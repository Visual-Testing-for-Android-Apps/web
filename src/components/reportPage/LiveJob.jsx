import React from "react";
import UploadSection from "./UploadSection";
import { useHistory } from "react-router-dom";
import VideoInstructions from "./VideoInstructions";

const LiveJob = () => {
  const FILE_LIMIT = 10;
  const history = useHistory();
  const handleJob = (files) => {
    history.push("/reportpage", { files: files });
  };

  return (
    <div className="section__container">
      <h1 style={{ textAlign: "center" }}>
        <b>Live Job Request</b>
      </h1>
      <br />
      <VideoInstructions />
      <UploadSection fileLimit={FILE_LIMIT} handleJob={handleJob} />
    </div>
  );
};

export default LiveJob;

import React from "react";
import UploadSection from "./UploadSection";
import { useHistory } from "react-router-dom";
import VideoInstructions from "./VideoInstructions";

const LiveJob = () => {
  const FILE_LIMIT = 10;
  const MAX_FILE_SIZE_MB = 6;
  const history = useHistory();
  const handleJob = (files) => {
    history.push("/reportpage", { files: files });
  };

  return (
    <div className="section__container">
      <h1 style={{ textAlign: "center" }}>
        <b>Live Job Request</b>
      </h1>
      <p style={{ textAlign: "center" }}>
        Submit up to 10 images and videos and view the results in real time.
      </p>
      <br />
      <VideoInstructions />
      <UploadSection fileLimit={FILE_LIMIT} handleJob={handleJob} maxFileSize={MAX_FILE_SIZE_MB} />
    </div>
  );
};

export default LiveJob;

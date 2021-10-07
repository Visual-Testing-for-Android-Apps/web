import React from "react";
import UploadSection from "./UploadSection";
import { useHistory } from "react-router-dom";

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
      <UploadSection fileLimit={FILE_LIMIT} handleJob={handleJob} maxFileSize={MAX_FILE_SIZE_MB} />
    </div>
  );
};

export default LiveJob;

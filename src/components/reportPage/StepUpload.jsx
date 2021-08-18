import React from "react";
import UploadSection from "./UploadSection";
import "./batch-job.css";

const StepUpload = (props) => {
  const { next } = props;
  return (
    <div className="form-container">
      <form className="batch-form">
        <h2>Step 1: Upload files</h2>
        <button className="sbtn" onClick={next}>
          Next
        </button>
        <UploadSection fileLimit={props.fileLimit} />
      </form>
    </div>
  );
};
export default StepUpload;

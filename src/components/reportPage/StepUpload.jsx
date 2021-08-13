import React from "react";
import UploadSection from "./UploadSection";
import "./batch-job.css";

const StepUpload = (props) => {
  const { next } = props;
  return (
    <form className="batch-form">
      <h2>Step 1: Upload files</h2>
      <button className="btn" onClick={next}>
        Next
      </button>
      <UploadSection />
    </form>
  );
};
export default StepUpload;

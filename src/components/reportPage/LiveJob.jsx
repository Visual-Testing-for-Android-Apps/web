import React from "react";
import UploadSection from "./UploadSection";
import ReportPage from "./ReportPage";

const LiveJob = () => {
  const FILE_LIMIT = 10;
  return (
    <div className="section__container">
      <UploadSection fileLimit={FILE_LIMIT} />
      {/* <ReportPage/> */}
    </div>
  );
};

export default LiveJob;

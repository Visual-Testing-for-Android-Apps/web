import React, { useState } from "react";
import UploadSection from "./UploadSection";
import "./batch-job.css";

const BatchJob = () => {
  const FILE_LIMIT = 100;
  const [email, setEmail] = useState();
  const formId = "batchForm";

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleBatchJob = (files) => {
    // Do something
  };

  return (
    <div className="section_container">
      <h1 style={{ textAlign: "center" }}>
        <b>Batch Job Request</b>
      </h1>
      <div className="form-container">
        <label>Email: </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email..."
          required
          defaultValue={email}
          form={formId}
          onChange={handleChange}
        />
      </div>
      <UploadSection
        fileLimit={FILE_LIMIT}
        handleJob={handleBatchJob}
        formId={formId}
        btnLabel="Submit Job"
      />
      ;
    </div>
  );
};

export default BatchJob;

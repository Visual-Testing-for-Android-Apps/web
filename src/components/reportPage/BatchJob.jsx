import React, { useState, useRef } from "react";
import UploadSection from "./UploadSection";
import "./batch-job.css";
import { useHistory } from "react-router-dom";
import Repository from "../../data/Repository";
import VideoInstructions from "./VideoInstructions";

const BatchJob = () => {
  const FILE_LIMIT = 100;
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formId = "batchForm";
  const history = useHistory();

  const emailRef = useRef();
  emailRef.current = email;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleBatchJob = async (files) => {
    setIsLoading(true);
    await new Repository().uploadBatchJob(emailRef.current, files);
    setIsLoading(false);
    history.push("/batchsubmitpage", { email: emailRef.current });
  };

  return (
    <div className="section_container">
      <VideoInstructions />
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
          form={formId}
          onChange={handleEmailChange}
        />
      </div>
      <UploadSection
        fileLimit={FILE_LIMIT}
        handleJob={handleBatchJob}
        formId={formId}
        btnLabel="Submit Job"
        emailRef={emailRef}
      />

      {isLoading && (
        <div className="loading style">
          <div className="loading-wheel"></div>
          <h2>Uploading files...</h2>
        </div>
      )}
    </div>
  );
};

export default BatchJob;

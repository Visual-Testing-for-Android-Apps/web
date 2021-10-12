import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import UploadSection from "./UploadSection";
import Repository from "../../data/Repository";
import VideoInstructions from "./VideoInstructions";
import "./batch-job.css";

const BatchJob = () => {
  const FILE_LIMIT = 100;
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const formId = "batchForm";
  const history = useHistory();

  const emailRef = useRef();
  emailRef.current = email;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleBatchJob = async (files) => {
    setIsLoading(true);
    try {
      await new Repository().uploadBatchJob(emailRef.current, files);
      history.push("/batchsubmitpage", { email: emailRef.current });
    } catch (error) {
      console.error(error);
      setError(error);
      // Reset captcha so the user can submit again.
      grecaptcha.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section_container">
      <h1 style={{ textAlign: "center" }}>
        <b>Batch Job Request</b>
      </h1>
      <p style={{ textAlign: "center" }}>
        Submit up to 100 images and videos and receive the results via email.
      </p>
      <div className="form-container">
        <span>Email: </span>
        <input
          type="email"
          id="email"
          placeholder="Enter your email..."
          required
          form={formId}
          onChange={handleEmailChange}
        />
      </div>
      <VideoInstructions />
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
      <Modal show={error !== null} centered onHide={() => setError(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Something went wrong, please try again</Modal.Body>
      </Modal>
    </div>
  );
};

export default BatchJob;

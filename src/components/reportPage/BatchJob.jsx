import React, { useState, useEffect } from "react";
import UploadSection from "./UploadSection";
import "./batch-job.css";

const BatchJob = () => {
  const FILE_LIMIT = 100;
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [status, setStatus] = useState("Submit");

  const handleEmail = async (e) => {
    const { email } = e.target.elements;
    setEmail(email.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status != "Submit") {
      setStatus("Submit");
      setEmailVerified(false);
      setDisableSubmit(true);
    } else {
      handleEmail(e);
      setStatus("Change");
    }
  };

  useEffect(() => {
    if (emailVerified) {
      setStatus("Change");
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [emailVerified]);

  return (
    <div className="section_container">
      <h1 style={{ textAlign: "center" }}>
        <b>Upload Files</b>
      </h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Enter your email..."
          disabled={!disableSubmit}
          required
          defaultValue={email}
        />
        <button type="submit">{status}</button>
      </form>
      <UploadSection fileLimit={FILE_LIMIT} setFiles={setFiles} files={files} />;
    </div>
  );
};
export default BatchJob;

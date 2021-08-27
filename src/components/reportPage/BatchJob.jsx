import React, { useState } from "react";
import UploadSection from "./UploadSection";
import "./batch-job.css";

const BatchJob = () => {
  const FILE_LIMIT = 100;
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState();
  const [disableSubmit, setDisableSubmit] = useState(true);

  const handleEmail = async (e) => {
    const { email } = e.target.elements;
    setEmail(email.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleEmail(e);
    console.log(email)
  };

  return (
    <div className="section_container">
      <h1 style={{ textAlign: "center" }}>
        <b>Upload Files</b>
      </h1>
      <form className="form-container">
        <input type="email" id="email" placeholder="Enter your email..." />
        <button onClick={() => handleEmail}>Submit</button>
      </form>
      <UploadSection fileLimit={FILE_LIMIT} setFiles={setFiles} files={files} />;
    </div>
  );
};
export default BatchJob;

import React, { useState } from "react";
import UploadSection from "./UploadSection";
import "./batch-job.css";

const BatchJob = () => {
  const FILE_LIMIT = 100;
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState();
  const [emailVerified, setEmailVerified] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    emailVerified: false,
  });

  const handleEmail = async (e) => {
    const { email } = e.target.elements;

    // Do some email verification

    // Set email
    setEmail(email.value);
    setEmailVerified(true);
  };

  return (
    <div className="section_container">
      <h1 style={{ textAlign: "center" }}>
        <b>Upload Files</b>
      </h1>
      <div className="email_container">
      <input type="email" id="email" placeholder="Enter your email..." />
      </div>
      
      <UploadSection fileLimit={FILE_LIMIT} setFiles={setFiles} files={files} />;
    </div>
  );

};
export default BatchJob;

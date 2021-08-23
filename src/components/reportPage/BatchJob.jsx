import React, { useState, useCallback, useEffect } from "react";
import StepUpload from "./StepUpload";
import StepEmail from "./StepEmail";
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
  const handleChange = (event) => {
    // setFormData({
    //   ...formData,
    //   [event.target.name]: event.target.value,
    // });
  };

  const handleEmail = async (e) => {
    const { email } = e.target.elements;

    // Do some email verification

    // Set email
    setEmail(email.value);
    setEmailVerified(true);
  };

  const next = () => {
    setCurrentStep(currentStep + 1);
  };
  const back = () => {
    setCurrentStep(currentStep - 1);
  };

  switch (currentStep) {
    case 1:
      return <StepUpload next={next} fileLimit={FILE_LIMIT} setFiles={setFiles} files={files} />;
    case 2:
      return (
        <StepEmail
          emailVerified={emailVerified}
          email={email}
          setEmailVerified={setEmailVerified}
          handleEmail={handleEmail}
          next={next}
          back={back}
        />
      );
    default:
      return (
        <Submit
        // data={formData}
        // back={back}
        />
      );
  }
};

const Submit = () => {
  return (
    <div className="form-container">
      <h1>Batch Job submitted succesfully!</h1>
    </div>
  );
};

export default BatchJob;

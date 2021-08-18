import React, { useState } from "react";
import StepUpload from "./StepUpload";
import StepEmail from "./StepEmail";
import "./batch-job.css";

const BatchJob = () => {
  const FILE_LIMIT = null;
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
  });
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const next = () => {
    setCurrentStep(currentStep + 1);
  };
  const back = () => {
    setCurrentStep(currentStep - 1);
  };
  switch (currentStep) {
    case 1:
      return (
        <StepUpload
          data={formData}
          handleChange={handleChange}
          next={next}
          fileLimit={FILE_LIMIT}
        />
      );
    case 2:
      return <StepEmail data={formData} handleChange={handleChange} next={next} back={back} />;
    default:
      return <Submit data={formData} back={back} />;
  }
};

const Submit = () => {
  return (
    <div>
      <h1>done</h1>
    </div>
  );
};

/* const BatchJob = () => {
  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { email } = e.target.elements;
    setStatus("Submit");
    console.log(email.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
        </div>
        <button type="submit">{status}</button>
      </form>
      <UploadSection />
    </div>
  );
}; */

export default BatchJob;

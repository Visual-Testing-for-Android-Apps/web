import React, { useState } from "react";
import "./batch-job.css";

const StepEmail = (props) => {
  const { data, handleChange, next, back } = props;
  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { email } = e.target.elements;
    setStatus("Submit");
    console.log(email.value);
  };

  return (
    <div className="form-container">
      <form className="batch-form" onSubmit={handleSubmit}>
        <div className="btn-container">
          <button className="sbtn" onClick={back}>
            Back
          </button>
          <h2>Step 2: Enter email</h2>
          <button className="sbtn" onClick={next}>
            Next
          </button>
        </div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" onChange={handleChange} required />
        <button className="submit-btn" type="submit">
          {status}
        </button>
      </form>
    </div>
  );
};
export default StepEmail;

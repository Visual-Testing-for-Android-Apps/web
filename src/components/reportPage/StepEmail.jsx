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
        <h2>Step 2: Enter email</h2>
        <div className="field-btns">
          <button className="stepbtn" onClick={back}>
            Back
          </button>
          <button className="stepbtn" onClick={next}>
            Next
          </button>
        </div>
        <input
          type="email"
          id="email"
          placeholder="Enter your email..."
          onChange={handleChange}
          required
        />
        <button className="submit-btn" type="submit">
          {status}
        </button>
      </form>
    </div>
  );
};
export default StepEmail;


import React, { useState, useRef, useEffect} from "react";
import { useLocation } from "react-router";
import "./batch-job.css";

const BatchSubmitPage = () => {
  const { email } = useLocation().state ?? {};
  const [newEmail, setNewEmail] = useState();
  const [emailConfirm, setConfirm] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [status, setStatus] = useState("Change");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status != "Confirm") {
      console.log("ran if statement")
      setStatus("Confirm");
      setConfirm(false);
    } else {
      handleEmailChange(e);
      setConfirm(true);
      setStatus("Change");
    }
  };

  useEffect(() => {
    if (emailConfirm) {
      setStatus("Change");
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [emailConfirm]);

  const emailRef = useRef();
  emailRef.current = email;

  const handleEmailChange = async (e) => {
    const { email } = e.target.elements;
    setNewEmail(email.value);
    setConfirm(true);
  };

  return (
    <div className="section_container">
      <h1 style={{ textAlign: "center" }}>Batch Job Submitted Successfully!</h1>
      <p style={{ textAlign: "center", fontSize: 18 }}>Your results will be sent to following email address:</p>
      <form className="email-form-container" onSubmit={handleSubmit}>
      <input
          type="email"
          id="email"
          placeholder="Enter your email..."
          required
          defaultValue={email}
          disabled={!disableSubmit}
        />
        <button type="submit">{status}</button>
      </form>
      
    </div>
  );
};

export default BatchSubmitPage;

import React, { useCallback, useEffect, useState } from "react";
import "./batch-job.css";
import Captcha from "./Captcha";

const StepEmail = (props) => {
  const { emailVerified, email, setEmailVerified, handleEmail, next, back } = props;
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [status, setStatus] = useState("Verify");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status != "Verify") {
      setStatus("Verify");
      setEmailVerified(false);
      setDisableSubmit(true);
    } else {
      handleEmail(e);
      setStatus("Change Email");
    }
  };

  const [nextBtnOpacity, setNextBtnOpacity] = useState(LOW_OPACITY);
  const LOW_OPACITY = 0.4;
  const FULL_OPACITY = 1;

  useEffect(() => {
    if (emailVerified) {
      setStatus("Change Email");
      setDisableSubmit(false);
      setNextBtnOpacity(FULL_OPACITY);
    } else {
      setNextBtnOpacity(LOW_OPACITY);
      setDisableSubmit(true);
    }
  }, [emailVerified]);

  const handleSubmitJob = (event) => {
    event.preventDefault();
    // Run captcha check
    grecaptcha.execute();
    // next();
  };

  // useCallback allows removing the event listener
  // https://dev.to/marcostreng/how-to-really-remove-eventlisteners-in-react-3och
  const captchaListener = useCallback((event) => {
    // If CAPTCHA success
    if (event.detail["success"]) {
      console.log("CAPTCHA Success");
      // do something
      next(); // next page
      //history.push("/reportpage", { files: filesRef.current, email: email });

      // If CAPTCHA failure
      // At the moment, this should never fire as reCAPTCHA does not trigger the callback function unless there is a success,
      // otherwise it keeps telling the user to try again. I have it here just in case.
    } else {
      console.log("CAPTCHA Failure");
    }
  }, []);

  useEffect(() => {
    // Listener for CAPTCHA
    document
      .getElementById("handleCallbackScript")
      .addEventListener("captchaEvent", captchaListener);

    // Cleanup on unmount, prevent duplicate listeners on back navigation
    return () =>
      document
        .getElementById("handleCallbackScript")
        .removeEventListener("captchaEvent", captchaListener);
  }, []);

  return (
    <div className="form-container">
      <form className="batch-form" onSubmit={handleSubmit}>
        <h2>Step 2: Enter email</h2>
        <div className="field-btns">
          <button className="stepbtn" onClick={back}>
            Back
          </button>
          <button
            className="stepbtn"
            onClick={handleSubmitJob}
            disabled={disableSubmit}
            style={{ opacity: nextbtnopacity }}
          >
            Submit Job
          </button>
        </div>
        <Captcha />
        {/* <EmailInput/>  */}
        <input
          type="email"
          id="email"
          placeholder="Enter your email..."
          disabled={!disableSubmit}
          required
          defaultValue={email}
        />
        <button className="submit-btn" type="submit">
          {status}
        </button>
        <p>{email}</p>
      </form>
    </div>
  );
};
export default StepEmail;

import React, { useState, useEffect } from "react";

import UploadBox from "./UploadBox";
import Repository from "../data/Repository";
import Captcha from './Captcha'
import "./mainpage.css";

const UploadSection = () => {
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    // Save the submit event. Use this variable to reference onSubmit event within listener
    let handleSubmitEvent = event
    event.preventDefault(event);

    // Run captcha check
    grecaptcha.execute()

    // Listener for CAPTCHA
    document.getElementById("handleCallbackScript").addEventListener("captchaEvent", (event) => {
      // If CAPTCHA success
      if (event.detail["success"]) {
        console.log("CAPTCHA Success");
        // TODO: Move repository into context
        (new Repository()).uploadFiles(files).then(res => console.log(res));

      // If CAPTCHA failure 
      // At the moment, this should never fire as reCAPTCHA does not trigger the callback function unless there is a success, 
      // otherwise it keeps telling the user to try again. I have it here just in case.
      } else {
        console.log("CAPTCHA Failure");
      }
    });
  };

  return (
    <div className="section" id="uploadSection">
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <Captcha />
        <input
          style={inputItemStyle}
          type="email"
          value={email}
          onChange={handleChange}
          placeholder={"Email"}
        />
        <UploadBox setFiles={setFiles} />
        <div>{files.map((f) => f.path)}</div>
        <button
          style={inputItemStyle}>
          Submit
          </button>
      </form>
    </div>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
};

const formStyle = {
  margin: "2rem 1rem",
  width: "clamp(5rem, 30rem, 50rem)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const inputItemStyle = {
  marginTop: "1rem",
  height: "2rem",
  fontSize: "1rem",
};

export default UploadSection;

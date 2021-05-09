import React, { useState, useEffect } from "react";

import UploadBox from "./UploadBox";
import Repository from "../data/Repository";
import Captcha from './Captcha'

const UploadPage = () => {
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const runCaptchaCheck = (event) => {
    grecaptcha.execute()
  }

  const handleSubmit = (event) => {
    event.preventDefault(event);
    // Run captcha check
    runCaptchaCheck(event);
    // TODO: Move repository into context
    // (new Repository()).uploadFiles(files).then(res => console.log(res));

  };

  return (
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

export default UploadPage;

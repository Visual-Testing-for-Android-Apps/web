import React, { useCallback, useEffect, useRef, useState } from "react";

import UploadBox from "./UploadBox";
import Captcha from "./Captcha";
import "./mainpage.css";
import "./upload.css";
import { useHistory } from "react-router-dom";

const UploadSection = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);
  // Use this ref to access files in a callback. Otherewise files may not be up to date.
  const filesRef = useRef();
  filesRef.current = files;

  /* const removeFile = (file) => {
    const newFile = [...files];
    newFile.splice(file, 1);
    setFiles(newFile);
  }; */

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    // Save the submit event. Use this variable to reference onSubmit event within listener
    const handleSubmitEvent = event;
    event.preventDefault(event);

    // Run captcha check
    grecaptcha.execute();
  };

  // useCallback allows removing the event listener
  // https://dev.to/marcostreng/how-to-really-remove-eventlisteners-in-react-3och
  const captchaListener = useCallback((event) => {
    // If CAPTCHA success
    if (event.detail["success"]) {
      console.log("CAPTCHA Success");
      history.push("/reportpage", { files: filesRef.current, email: email });

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

/*   // Display uploaded files, plus 'Remove' button to delete file
  const displayFiles = files.map((file, i) => (
    <li key={file.path}>
      {file.name}
      <button className="remove-btn" onClick={() => removeFile(i)}>
        Remove
      </button>
    </li>
  )); */

  return (
    <div className="section" id="uploadSection">
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <Captcha />
          <UploadBox setFiles={setFiles} />
          {/* <div>{displayFiles}</div> */}
          <button className="upload-btn">Upload files</button>
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

export default UploadSection;

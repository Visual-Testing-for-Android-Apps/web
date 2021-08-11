import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import UploadBox from "./UploadBox";
import Captcha from "./Captcha";
import "./mainpage.css";
import "./upload.css";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const UploadSection = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);
  const [btnOpacity, setBtnOpacity] = useState(0.4);
  const [uploadAlertState, setUploadAlertState] = useState("hidden");
  // Use this ref to access files in a callback. Otherewise files may not be up to date.
  const filesRef = useRef();
  filesRef.current = files;

  const removeFile = (file) => {
    const newFile = [...files];
    newFile.splice(file, 1);
    setFiles(newFile);
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    // Save the submit event. Use this variable to reference onSubmit event within listener
    const handleSubmitEvent = event;
    event.preventDefault();

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

  // changes the visibility of the button depending on the state of files
  useEffect(() => {
    if (files.length == 0) {
      setBtnOpacity(0.4);
    } else {
      setBtnOpacity(1);
      setUploadAlertState("hidden");
    }
  }, [files.length]);

  // prevent button from working if no files are uploaded
  const handleOnClick = (event) => {
    if (files.length == 0) {
      event.preventDefault();
      setUploadAlertState("visible");
    } else {
      setUploadAlertState("hidden");
    }
  };
  
  // Display uploaded files, plus 'Remove' button to delete file
  const displayFiles = files.map((file, i) => (
    <Container className="file-container" key={file.path}>
      <Row>
        <Col className="file-column">{file.name}</Col>
        <Col className="button-column">
          <button className="remove-btn" onClick={() => removeFile(i)}>
            Remove
          </button>
        </Col>
      </Row>
    </Container>
  ));

  return (
    <div className="section" id="uploadSection">
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <Captcha />
          <UploadBox setFiles={setFiles} />
          <button className="upload-btn" style={{ opacity: btnOpacity }} onClick={handleOnClick}>
            Submit files
          </button>
          <Alert
            variant="warning"
            className="upload-alert"
            style={{ visibility: uploadAlertState }}
          >
            Please upload a file
          </Alert>
          <div className="margin-space" >{displayFiles}</div>
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

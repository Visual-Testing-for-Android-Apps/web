import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import UploadBox from "./UploadBox";
import Captcha from "./Captcha";
import "../mainPage/mainpage.css";
import "./upload.css";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const UploadSection = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);
  const [btnOpacity, setBtnOpacity] = useState(LOW_OPACITY);

  // const [uploadAlertState, setUploadAlertState] = useState("hidden");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();

  // File Upload Alert Messages
  const FILE_LIMIT_WARNING =
    "You have exceeded the maximum limit of " + props.fileLimit + " files.";
  const FILE_MIN_WARNING = "Please upload a file";

  // submit button opacity values
  const LOW_OPACITY = 0.4;
  const FULL_OPACITY = 1;

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

    // merged code from handleOnClick
    if (files.length == 0) {
      // prevent submit button from working if no files are uploaded
      setShowAlert(true);
      setAlertMessage(FILE_MIN_WARNING);
    } else if (files.length > props.fileLimit) {
      // prevent submit if exceed file limit
      setShowAlert(true);
      setAlertMessage(FILE_LIMIT_WARNING);
    } else {
      // Run captcha check
      grecaptcha.execute();
    }
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
      setBtnOpacity(LOW_OPACITY);
    } else if (props.fileLimit != null && files.length > props.fileLimit) {
      setShowAlert(true);
      setBtnOpacity(LOW_OPACITY);
      setAlertMessage(FILE_LIMIT_WARNING);
    } else {
      setBtnOpacity(FULL_OPACITY);
      // setUploadAlertState("hidden");
      setShowAlert(false);
    }
  }, [files.length]);

  // prevent button from working if no files are uploaded / exceed file limit
  // const handleOnClick = (event) => {
  //   if (files.length == 0) {
  //     event.preventDefault();
  //     // setUploadAlertState("visible");
  //     setShowAlert(true);
  //     setAlertMessage(FILE_MIN_WARNING);
  //   } else if (files.length > props.fileLimit) {

  //       event.preventDefault();
  //       setShowAlert(true);
  //       setAlertMessage(FILE_LIMIT_WARNING);
  //   }

  // };

  // renders Alert
  const UploadAlert = () =>
    // if showAlert = true, return Alert component
    showAlert ? (
      <Alert variant="warning" className="upload-alert">
        {alertMessage}
      </Alert>
    ) : null;

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
          <UploadBox setFiles={setFiles} fileLimit={props.fileLimit} />
          <input
            className="upload-btn"
            type="submit"
            value="Submit files"
            style={{ opacity: btnOpacity }}
          />
          <UploadAlert />
          <div className="margin-space">{displayFiles}</div>
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
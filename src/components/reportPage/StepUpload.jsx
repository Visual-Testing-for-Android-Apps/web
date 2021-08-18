import React, { useEffect, useRef, useState } from "react";
import "./batch-job.css";
import { Container, Row, Col } from "react-bootstrap";

import UploadBox from "./UploadBox";
import "../mainPage/mainpage.css";
import "./upload.css";
import Alert from "react-bootstrap/Alert";

const StepUpload = (props) => {
  const files = props.files;

  // File Upload Alert Messages
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const FILE_LIMIT_WARNING =
    "You have exceeded the maximum limit of " + props.fileLimit + " files.";
  const FILE_MIN_WARNING = "Please upload a file";

  // submit button opacity values
  const [btnOpacity, setBtnOpacity] = useState(LOW_OPACITY);
  const LOW_OPACITY = 0.4;
  const FULL_OPACITY = 1;

  const { next } = props;

  const setFiles = (newFiles) => props.setFiles(newFiles);

  const removeFile = (file) => {
    const newFile = [...files];
    newFile.splice(file, 1);
    setFiles(newFile);
  };

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
      setShowAlert(false);
    }
  }, [files.length]);

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

  const handleOnClick = (event) => {
    if (files.length > 0) {
      return props.next();
    } else {
      setShowAlert(true);
      setAlertMessage(FILE_MIN_WARNING);
    }
  };

  // const showFileAlertMin = () => {
  //   setShowAlert(true);
  //   setAlertMessage(FILE_MIN_WARNING);
  // }

  return (
    <div className="form-container">
      <form className="batch-form">
        <h2>Step 1: Upload files</h2>
        <button
          className="sbtn"
          onClick={files.length > 0 ? next : null}
          style={{ opacity: btnOpacity }}
        >
          Next
        </button>
        <UploadAlert />
        <div className="section" id="uploadSection">
          <div style={containerStyle}>
            <div style={formStyle}>
              <UploadBox setFiles={setFiles} fileLimit={props.fileLimit} />

              <div className="margin-space">{displayFiles}</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default StepUpload;

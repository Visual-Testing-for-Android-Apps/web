import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Paginate from "react-paginate";

import UploadBox from "./UploadBox";
import Captcha from "./Captcha";
import "../mainPage/mainpage.css";
import "./upload.css";
import Alert from "react-bootstrap/Alert";

const UploadSection = (props) => {
  const [files, setFiles] = useState([]);
  const [btnOpacity, setBtnOpacity] = useState(LOW_OPACITY);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();

  // File Upload Alert Messages
  const FILE_LIMIT_WARNING = `You have exceeded the maximum limit of ${fileLimit} files.`;
  const FILE_MIN_WARNING = "Please upload a file";

  // submit button opacity values
  const LOW_OPACITY = 0.4;
  const FULL_OPACITY = 1;

  // Use this ref to access files in a callback. Otherewise files may not be up to date.
  const filesRef = useRef();
  filesRef.current = files;
  const { fileLimit, formId, btnLabel, handleJob, emailRef } = props;

  // Pagination variables
  const [pageNumber, setPageNumber] = useState(0);
  const FILES_PER_PAGE = 24;
  const pagesVisited = pageNumber * FILES_PER_PAGE;
  const pageCount = Math.ceil(files.length / FILES_PER_PAGE); //determines how many pages from each pagination.

  // Search files
  const [searchTerm, setSearchString] = useState("");

  const removeFile = (file) => {
    const newFile = [...files];
    newFile.splice(file, 1);
    setFiles(newFile);
  };

  const handleSubmit = (event) => {
    // Save the submit event. Use this variable to reference onSubmit event within listener
    const handleSubmitEvent = event;
    event.preventDefault();

    // merged code from handleOnClick
    if (files.length == 0) {
      // prevent submit button from working if no files are uploaded
      setAlert(FILE_MIN_WARNING);
    } else if (files.length > fileLimit) {
      // prevent submit if exceed file limit
      setAlert(FILE_LIMIT_WARNING);
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
      handleJob(filesRef.current);

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

  // Changes the visibility of the button depending on the state of files
  useEffect(() => {
    if (files.length == 0) {
      setBtnOpacity(LOW_OPACITY);
    } else if (fileLimit != null && files.length > fileLimit) {
      setAlert(FILE_LIMIT_WARNING);
      setBtnOpacity(LOW_OPACITY);
    } else {
      setBtnOpacity(FULL_OPACITY);
      setShowAlert(false);
    }
  }, [files.length]);

  const UploadAlert = () =>
    showAlert && (
      <Alert variant="warning" className="upload-alert">
        {alertMessage}
      </Alert>
    );

  // Display uploaded files, plus 'Remove' button to delete file
  const displayFiles = files.map((file, i) => (
    <Container className="file-container" key={file.path}>
      <Row>
        <Col className="file-column">{file.name}</Col>
        <Col className="button-column">
          <button className="remove-btn" onClick={() => removeFile(i)}>
            X
          </button>
        </Col>
      </Row>
    </Container>
  ));

  const setAlert = (alertMessage) => {
    setShowAlert(true);
    setAlertMessage(alertMessage);
  };

  const filePreviews = files.map((file, i) => (
    <div className="preview-column" key={file.path}>
      {file.type == "video/mp4" && (
        <video
          className="image-preview"
          src={URL.createObjectURL(file)}
          autoPlay
          loop
          controls
          muted
        />
      )}
      {(file.type == "image/jpeg" || file.type == "image/png") && (
        <img className="image-preview" src={URL.createObjectURL(file)}></img>
      )}
      <p>{file.name}</p>
      <button className="cross-button" onClick={() => removeFile(i)}>
        X
      </button>
    </div>
  ));

  const displayFilePreviews = files
    .slice(pagesVisited, pagesVisited + FILES_PER_PAGE)
    .map((file, i) => {
      if (searchTerm.length === 0 || file.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return (
          <div className="preview-column" key={file.path}>
            {file.type == "video/mp4" && (
              <video className="image-preview" src={URL.createObjectURL(file)} loop muted />
            )}
            {(file.type == "image/jpeg" || file.type == "image/png") && (
              <img className="image-preview" src={URL.createObjectURL(file)}></img>
            )}
            <p>{file.name}</p>
            <button className="cross-button" onClick={() => removeFile(i)}>
              X
            </button>
          </div>
        );
      }
    });

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleSubmit} id={formId}>
          <Captcha />
          <UploadBox
            setFiles={setFiles}
            fileLimit={fileLimit}
            setAlert={setAlert}
            currFiles={files}
          />
          <input
            className="upload-btn"
            type="submit"
            value={btnLabel}
            style={{ opacity: btnOpacity }}
          />
          <UploadAlert />
          <input
            type="text"
            name="search"
            placeholder="Search for files..."
            className="file-search"
            value={searchTerm}
            onChange={(event) => {
              setSearchString(event.target.value);
            }}
          />
        </form>
      </div>
      <div className="pagination-section">
        <Paginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
        <div className="margin-space">{displayFilePreviews}</div>
      </div>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
};

const formStyle = {
  margin: "1rem 1rem",
  width: "clamp(5rem, 30rem, 50rem)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

UploadSection.defaultProps = {
  formId: "upload",
  btnLabel: "Submit Files",
};

export default UploadSection;

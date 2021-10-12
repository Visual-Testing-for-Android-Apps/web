import React, { useCallback, useEffect, useRef, useState } from "react";
import Paginate from "react-paginate";

import UploadBox from "./UploadBox";
import Captcha from "./Captcha";
import "../mainPage/mainpage.css";
import "./upload.css";
import Alert from "react-bootstrap/Alert";
import closeIcon from "../images/closeIcon.png";

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
  const { fileLimit, formId, btnLabel, handleJob, maxFileSize } = props;

  // Pagination variables
  const [pageNumber, setPageNumber] = useState(0);
  const FILES_PER_PAGE = 24;
  const pagesVisited = pageNumber * FILES_PER_PAGE;
  const pageCount = Math.ceil(files.length / FILES_PER_PAGE); //determines how many pages from each pagination.

  // Search files
  const [searchTerm, setSearchString] = useState("");

  // Modal popup
  const [modal, setModal] = useState(false);
  const [fileSrc, setFileSrc] = useState();

  const removeFile = (file) => {
    var file_index = file;
    if (pageNumber > 0) {
      file_index = pageNumber * FILES_PER_PAGE + file;
    }
    const newFile = [...files];
    newFile.splice(file_index, 1);
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

  const setAlert = (alertMessage) => {
    setShowAlert(true);
    setAlertMessage(alertMessage);
  };

  const toggleModal = (file) => {
    setFileSrc(file);
    setModal(!modal);
  };

  const displayFilePreviews = files
    .slice(pagesVisited, pagesVisited + FILES_PER_PAGE)
    .map((file, i) => {
      if (searchTerm.length === 0 || file.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return (
          <div className="preview-column" key={file.path}>
            <div className="image-holder" onClick={() => toggleModal(file)}>
              {file.type == "video/mp4" && (
                <video className="image-preview" src={URL.createObjectURL(file)} loop muted />
              )}
              {(file.type == "image/jpeg" || file.type == "image/png") && (
                <img className="image-preview" src={URL.createObjectURL(file)}></img>
              )}
            </div>
            <p className="file-name">{file.name}</p>
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

  const removeAll = () => {
    setFiles([]);
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
            maxFileSize={maxFileSize}
          />
          <input
            className="upload-btn"
            type="submit"
            value={btnLabel}
            style={{ opacity: btnOpacity }}
          />
          <UploadAlert />
        </form>
      </div>
      <div style={containerStyle}>
        <div className="search-remove">
          {files.length > 0 && (
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
          )}
          {files.length > 0 && (
            <button className="remove-btn" onClick={removeAll}>
              Remove All
            </button>
          )}
        </div>
      </div>
      <div style={containerStyle}>
        <div className="pagination-section">
          {files.length > 20 && (
            <div className="pagination-margin">
              <Paginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination-bttns"}
                activeClassName={"pagination-active"}
              />
            </div>
          )}
          {modal && (
            <div onClick={toggleModal} className="modal-background">
              <div className="modal-content">
                <h4>{fileSrc.name}</h4>
                {fileSrc.type == "video/mp4" && (
                  <video
                    className="modal-preview"
                    src={URL.createObjectURL(fileSrc)}
                    autoplay
                    controls
                    loop
                    muted
                  />
                )}
                {(fileSrc.type == "image/jpeg" || fileSrc.type == "image/png") && (
                  <img className="modal-preview" src={URL.createObjectURL(fileSrc)}></img>
                )}
                <div className="close-modal">
                  <img src={closeIcon} width="25" height="25" />
                </div>
              </div>
            </div>
          )}
          <div className="margin-space">{displayFilePreviews}</div>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  background: "white",
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

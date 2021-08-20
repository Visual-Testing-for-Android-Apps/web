import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./upload.css";
import CloudIcon from "./cloudIcon";
const UploadBox = (props) => {
  const onDrop = useCallback((files) => {
    props.setFiles((existingFiles) => [...existingFiles, ...files]);
  }, []);
  const { setAlert, fileLimit } = props;
  const MAX_FILE_ALERT = "Please upload only up to " + fileLimit + " valid files.";
  const INVALID_FILETYPE = "You are trying to upload invalid file types.";
  const onDropRejected = (fileRejections) => {
    const rejectFiles = fileRejections.length;
    if (rejectFiles) {
      if (rejectFiles > fileLimit) {
        setAlert(MAX_FILE_ALERT);
      } else {
        setAlert(INVALID_FILETYPE);
        console.log("invalid");
      }
    }
  };
  const accept = [".jpg", ".mp4", ".gif"];
  const maxFiles = props.fileLimit == Infinity ? 0 : props.fileLimit;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    onDropRejected,
  });
  const IMAGE_WIDTH = 110;
  const IMAGE_HEIGHT = 90;

  return (
    <div className="box" {...getRootProps()}>
      {isDragActive ? <CloudIcon fill={"green"} /> : <CloudIcon fill={"#045198"} />}
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>
          Drag 'n' drop images &amp; videos here, or <b>click</b> to select files
          <br></br>
          {maxFiles != 0 ? <em> (Maximum number of files: {maxFiles}) </em> : null}
        </p>
      )}
    </div>
  );
};

export default UploadBox;

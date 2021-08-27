import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./upload.css";
import CloudIcon from "./cloudIcon";
const UploadBox = (props) => {
  const onDrop = useCallback((files) => {
    props.setFiles((existingFiles) => [...existingFiles, ...files]);
  }, []);

  const { setAlert, fileLimit, currFiles } = props;
  const MAX_FILE_ALERT = `Please upload only up to ${fileLimit} valid files.`;
  const INVALID_FILETYPE = "You are trying to upload invalid file types.";

  const onDropRejected = (fileRejections) => {
    const rejectFiles = fileRejections.length;
    if (rejectFiles) {
      console.log(rejectFiles);
      if (rejectFiles > fileLimit) {
        setAlert(MAX_FILE_ALERT);
      } else if (rejectFiles < fileLimit) {
        // To display the duplicated files uploaded
        const DUPLICATE_FILE_ALERT = fileRejections.map((f) => ' ' + f.file.name )
        setAlert('You have already uploaded:' + DUPLICATE_FILE_ALERT);
      } else {
        setAlert(INVALID_FILETYPE);
      }
    }
  };

  // Checks if the new uploaded file is duplicate
  const checkDuplicate = (file) => {
    var i;
    for (i = 0; i < props.currFiles.length; i++) {
      if (props.currFiles[i].name === file.name) return true;
    }
  };

  // Cusomter file validation function
  const validateFiles = (file) => {
    if (props.currFiles.length) {
      console.log("dropFiles exist");
      if (checkDuplicate(file)) {
        console.log("Duplicate file exists");
        // Returning other than 'null' means files are rejected. 
        return {};
      }
    }
    // Returns null if files should be accepeted
    return null;
  };
  const acceptedFileTypes = ["image/jpeg", "image/png", "video/mp4"];
  const maxFiles = props.fileLimit == Infinity ? 0 : props.fileLimit;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles,
    onDropRejected,
    validator: validateFiles,
  });

  return (
    <div className="box" {...getRootProps()}>
      {isDragActive ? <CloudIcon fill={"green"} /> : <CloudIcon fill={"#045198"} />}
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <>
          <p>
            Drag 'n' drop images &amp; videos here, or <b>click</b> to select files
            <br></br>
            {maxFiles != 0 ? <em> (Maximum number of files: {maxFiles}) </em> : null}
          </p>
          <p className="accepted-file-formats-text">
            Accepted file formats:{" "}
            {acceptedFileTypes.map((format) => format.split("/")[1]).join(", ")}
          </p>
        </>
      )}
    </div>
  );
};

export default UploadBox;

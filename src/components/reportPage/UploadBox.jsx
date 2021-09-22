import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./upload.css";
import CloudIcon from "./cloudIcon";
const UploadBox = (props) => {
  const onDrop = useCallback((files, fileLimit, currFiles) => {
    // props.setFiles((existingFiles) => [...existingFiles, ...files]);
    console.log(files.length, currFiles.length);
    if (files.length + currFiles.length <= fileLimit || !currFiles) {
      props.setFiles((existingFiles) => [...existingFiles, ...files]);
    } else {
      setAlert(MAX_FILE_ALERT);
    }
  }, []);

  // (files) => {
  //   console.log(files.length, currFiles.length, files.length + currFiles.length <= fileLimit);
  //   if (files.length + currFiles.length <= fileLimit){

  //       props.setFiles((existingFiles) => [...existingFiles, ...files]);
  //     useCallback((files) => {
  //       props.setFiles((existingFiles) => [...existingFiles, ...files]);

  //     }, []);

  //   }
  //   else{
  //     setAlert(MAX_FILE_ALERT);
  //   }
  // }

  const { setAlert, fileLimit, currFiles } = props;
  const MAX_FILE_ALERT = `Please upload only up to ${fileLimit} valid files.`;
  const INVALID_FILETYPE = "You are trying to upload invalid file types.";

  const onDropRejected = (fileRejections) => {
    const rejectFiles = fileRejections.length;
    if (rejectFiles) {
      if (rejectFiles > fileLimit) {
        setAlert(MAX_FILE_ALERT);
      }
      // else if (rejectFiles < fileLimit) {
      //   // To display the duplicate files uploaded
      //   const duplicateFileAlert = fileRejections.map((f) => " " + f.file.name);
      //   setAlert("You have already uploaded:" + duplicateFileAlert);
      // } else {
      //   setAlert(INVALID_FILETYPE);
      // }
    }
  };

  // Cusomter file validation function
  const validateFiles = (file) => {
    if (!props.currFiles.every((currFile) => currFile.name != file.name)) {
      return {};
    }
    // Returns null if files should be accepeted
    return null;
  };
  const acceptedFileTypes = ["image/jpeg", "image/png", "video/mp4"];
  const maxFiles = props.fileLimit == Infinity ? 0 : props.fileLimit;
  const maxSize = 6291456;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles,
    maxSize,
    onDropRejected,
    validator: validateFiles,
  });

  return (
    <div className="box" {...getRootProps()}>
      <h3>Upload Files</h3>
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
          <sub className="accepted-file-formats-text">
            Max file size: {maxSize}
            Accepted file formats:{" "}
            {acceptedFileTypes.map((format) => format.split("/")[1]).join(", ")}
          </sub>
        </>
      )}
    </div>
  );
};

export default UploadBox;

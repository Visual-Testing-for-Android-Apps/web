import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./upload.css";
import CloudIcon from "./cloudIcon";
import e from "cors";
// import { file } from "@babel/types";

const UploadBox = (props) => {
  const onDrop = (files) => {
    if (files.length) {
      // Restricts files displayed to fileLimit only
      if (files.length + currFiles.length > fileLimit) {
        let updatedFiles = files.slice(0, fileLimit - currFiles.length);
        setAlert(MAX_FILE_ALERT); //bug: shows up but I don't know why it disappears later
        props.setFiles((existingFiles) => [...existingFiles, ...updatedFiles]);
      } else {
        props.setFiles((existingFiles) => [...existingFiles, ...files]);
      }
    }
  };
  // didn't use useCallback because the currFiles.length always returned 0 for some reason
  // const onDrop = useCallback((files) => {
  //   if (files.length + currFiles.length > fileLimit) {
  //     let updatedFiles = files.slice(0,fileLimit-currFiles.length);
  //     props.setFiles((existingFiles) => [...existingFiles, ...updatedFiles]);
  //     setAlert(MAX_FILE_ALERT);
  //   }
  //   else{
  //     props.setFiles((existingFiles) => [...existingFiles, ...files]);
  //   }

  // }, []);

  const { setAlert, fileLimit, currFiles, maxFileSize } = props;
  const MAX_FILE_ALERT = `Please upload only up to ${props.fileLimit} valid files.`;
  const INVALID_FILETYPE = `The following file(s) are not of acceptable formats (jpeg, png, mp4):`;

  const onDropRejected = (fileRejections) => {
    if (currFiles.length == fileLimit || fileRejections.length > fileLimit) {
      setAlert(MAX_FILE_ALERT);
    } else {
      let errorList = {
        errorFiles: {
          overMaxSize: [],
          duplicateFiles: [],
          invalidType: [],
        },
        errorMsgs: {
          overMaxSize: `The following file(s) are larger than ${maxFileSize} MB: `,
          duplicateFiles: "The following file(s) have already been uploaded:",
          invalidType: INVALID_FILETYPE,
        },
      };
      let errorFiles = errorList.errorFiles;
      for (let f in fileRejections) {
        const { errors, file } = fileRejections[f];
        let errorType = errors[0].code;
        if (errorType === "file-invalid-type") {
          errorFiles.invalidType = [...errorFiles.invalidType, file.name];
        } else if (errorType === "duplicate-file") {
          errorFiles.duplicateFiles = [...errorFiles.duplicateFiles, file.name];
        } else if (errorType === "file-too-large") {
          errorFiles.overMaxSize = [...errorFiles.overMaxSize, file.name];
        }
      }

      let msg = createErrorMsg(errorList);
      setAlert(msg);
    }
  };

  // @param: errorObj should object composed of two objs: errorFiles, errorMsgs, both have identical property names
  const createErrorMsg = (errorObj) => {
    let { errorFiles, errorMsgs } = errorObj;
    let errorTypes = Object.keys(errorFiles);
    const errors = errorTypes.map((type) =>
      errorFiles[type].length ? (
        <>
          <p style={{ marginBottom: "0.2rem" }}>{errorMsgs[type]}</p>{" "}
          <ul>
            {" "}
            {errorFiles[type].map((file) => (
              <li key={file}>{file}</li>
            ))}
          </ul>{" "}
        </>
      ) : null
    );
    const errorStyle = { marginLeft: "1rem", marginRight: "1.5rem", overflowWrap: "break-word" };
    const errorHeadingStyle = { marginBottom: "0.5rem" };
    let msg = (
      <>
        <p style={errorHeadingStyle}>
          {" "}
          <b> Rejected Files: </b>{" "}
        </p>
        <div style={errorStyle}>{errors}</div>
      </>
    );
    return msg;
  };

  // Customer file validation function
  const validateFiles = (file) => {
    // Tests if can accept more files
    if (currFiles.length == fileLimit) {
      return { code: "over-max-filelimit" };
    }

    // Tests duplicate files
    else if (!props.currFiles.every((currFile) => currFile.name != file.name)) {
      return { code: "duplicate-file" };
    }

    // Returns null if files should be accepeted
    return null;
  };

  const acceptedFileTypes = ["image/jpeg", "image/png", "video/mp4"];
  const maxFiles = fileLimit ? fileLimit : 0; // 0 unlimited files
  const maxSize = maxFileSize ? maxFileSize * 1024 * 1024 : 0; // 0 is unlimited file size, in bin bytes
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
            Max file size: {maxFileSize} MB | Accepted file formats:{" "}
            {acceptedFileTypes.map((format) => format.split("/")[1]).join(", ")}
          </sub>
        </>
      )}
    </div>
  );
};

export default UploadBox;

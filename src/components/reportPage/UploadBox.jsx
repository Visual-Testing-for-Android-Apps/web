import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./upload.css";
import CloudIcon from "./cloudIcon";
const UploadBox = (props) => {
  const [droppedFiles, setDropFiles] = useState([]);
  const [duplicate, setDuplicate] = useState(false);
  const onDrop = useCallback((files) => {
    props.setFiles((existingFiles) => [...existingFiles, ...files]);
    setDropFiles((existingFiles) => [...existingFiles, ...files]);
  }, []);
  const { setAlert, fileLimit } = props;
  const MAX_FILE_ALERT = `Please upload only up to ${fileLimit} valid files.`;
  const INVALID_FILETYPE = "You are trying to upload invalid file types.";
  const DUPLICATE_FILE_ALERT = 'You cannot upload uplicate files';
  const onDropRejected = (fileRejections) => {
    const rejectFiles = fileRejections.length;
    if (rejectFiles) {
      if (rejectFiles > fileLimit) {
        setAlert(MAX_FILE_ALERT);
      } 
      else if(duplicate){
        setAlert(DUPLICATE_FILE_ALERT)
      }
      else {
        setAlert(INVALID_FILETYPE);
      }
    }
  };

  const checkDuplicate = (file) => {
    var i;
    for (i = 0; i < droppedFiles.length; i++) {
      if (droppedFiles[i].name === file.name) return true;
    }
  };

  const validateFiles = (file) => {
    if (droppedFiles.length) {
      console.log("dropFiles exist");
      if (checkDuplicate(file)) {
        console.log("dup file");
        setDuplicate(true);
      }
      return {
        code: "duplicate file"
      }
    }
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

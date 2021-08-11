import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./upload.css";
import CloudIcon from "./cloudIcon";

const UploadBox = (props) => {
  const onDrop = useCallback((files) => {
    props.setFiles((existingFiles) => [...existingFiles, ...files]);
  }, []);

  const accept = [".jpg", ".mp4"];
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept });
  const IMAGE_WIDTH = 110;
  const IMAGE_HEIGHT = 90;

  return (
    <div className="box" {...getRootProps()}>
      {isDragActive ? <CloudIcon fill={"green"} /> : <CloudIcon fill={"blue"} />}
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>
          Drag 'n' drop images here, or <b>click</b> to select files
        </p>
      )}
    </div>
  );
};

export default UploadBox;

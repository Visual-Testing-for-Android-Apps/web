import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./upload.css";
import cloudImg from "../images/cloud.png";

const UploadBox = (props) => {
  const onDrop = useCallback((files) => {
    props.setFiles((existingFiles) => [...existingFiles, ...files]);
  }, []);

  const [files, setFiles] = useState([]);

  const accept = [".jpg", ".mp4"];
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      setFiles(files.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })));
    },
    accept,
  });
  const IMAGE_WIDTH = 110;
  const IMAGE_HEIGHT = 90;

  const removeFile = (file) => {
    const newFile = [...files];
    newFile.splice(file, 1);
    setFiles(newFile);
  };

  const thumbs = files.map((file) => (
    <div key={file.name}>
        <img src={file.preview}/>
      </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const displayFiles = files.map((file, i) => (
    <li key={file.path}>
      {file.name}
      <button className="remove-btn" onClick={() => removeFile(i)}>
        Remove
      </button>
    </li>
  ));

  return (
    <div className="box" {...getRootProps()}>
      <img className="cloud-img" src={cloudImg} width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
      <input {...getInputProps()} />
      
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop images here, or click to select files</p>
      )}
     {thumbs}
     {displayFiles}
    </div>
  );
};

export default UploadBox;

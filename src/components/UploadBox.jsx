import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadBox = (props) => {

    const onDrop = useCallback(files => {
        props.setFiles(existingFiles => [...existingFiles, ...files]);
      }, []);

      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

      return (
        <div style={boxStyle} {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop images/videos here, or click to select files</p>
          }
        </div>
      )
}

const boxStyle = {
    border: ".0625rem dotted black",
    borderRadius: ".2rem",
    background: "lightgrey",
    marginTop: "1rem",
    padding: "2rem",
}

export default UploadBox;

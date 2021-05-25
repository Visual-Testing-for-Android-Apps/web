import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import "./upload.css"

const UploadBox = (props) => {

    const onDrop = useCallback(files => {
        props.setFiles(existingFiles => [...existingFiles, ...files]);
      }, []);

      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

      return (
        <div className= "box" {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop images/videos here, or click to select files</p>
          }
        </div>
      )
}

export default UploadBox;

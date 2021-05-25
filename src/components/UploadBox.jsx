import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import "./upload.css"
import cloudImg from "./images/cloud.png";


const UploadBox = (props) => {

    const onDrop = useCallback(files => {
        props.setFiles(existingFiles => [...existingFiles, ...files]);
      }, []);

      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
      const IMAGE_WIDTH = 110;
      const IMAGE_HEIGHT = 80;

      return (
        <div className= "box" {...getRootProps()}>
          <img className="cloud-img" src={cloudImg} width={IMAGE_WIDTH} height={IMAGE_HEIGHT}/>
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

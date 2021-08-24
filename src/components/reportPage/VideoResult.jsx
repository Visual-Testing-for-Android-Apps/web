import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { encodeFileAsBase64DataUrl } from "../../util/FileUtil";
import "./results-page.css";

/**
 * A video result consists of the original video and an explanation of the detected design violation.
 * @param {File} videoFile
 * @param {{ classification: String, explanation: String }}
 * @returns
 */
const VideoResult = ({ videoFile, videoResult }) => {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(async () => {
    setDataUrl(await encodeFileAsBase64DataUrl(videoFile));
  }, []);

  const downloadFile = () => {
    saveAs(dataUrl, videoFile.name); // Put your image url here.
  };

  return (
    <div className="result-container">
      <p className="filename">{videoFile.name}</p>
      <video className="result" src={dataUrl} autoPlay loop controls />
      <p className="result-explanation">{"Defect: ".concat(videoResult.explanation)}</p>
      <button className="download-btn" onClick={downloadFile}>
        Download
      </button>
    </div>
  );
};

export default VideoResult;

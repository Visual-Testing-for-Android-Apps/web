import React, { useEffect, useState } from "react";
import { encodeFileAsBase64DataUrl } from "../../util/FileUtil";
import "./results-page.css";
import VideoResultExplanation from "../common/VideoResultExplanation";

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

  return (
    <div className="video-result-container">
      <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
        <video className="result" src={dataUrl} autoPlay loop controls />
        <p className="result-filename">{videoFile.name}</p>
      </div>
      <VideoResultExplanation issueClassification={videoResult?.classification} />
    </div>
  );
};

export default VideoResult;

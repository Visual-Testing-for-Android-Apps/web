import React, { useEffect, useState } from "react";

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

  return (
    <div>
      <video className="result" src={dataUrl} autoPlay loop controls />
      <p className="video-result-explanation">{videoResult.explanation}</p>
    </div>
  );
};

export default VideoResult;

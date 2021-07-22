import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useLocation } from "react-router";

import "./results-page.css";
import Repository from "../../data/Repository";

const ReportPage = () => {
  const { files, email } = useLocation().state ?? {};
  const RESULTS_CONTAINER_ID = "resultsContainer";

  const [progressValue, setProgressValue] = useState(0);

  const IMAGE_HEIGHT = 1024 / 2;
  const IMAGE_WIDTH = 576 / 2;

  useEffect(() => {
    const fetch = async () => {
      const heatmaps = new Repository().uploadFiles(files);

      heatmaps.forEach(async (imagePromise) => {
        const image = await imagePromise;
        image.className = "image-result";
        image.height = IMAGE_HEIGHT;
        image.width = IMAGE_WIDTH;
        document.getElementById(RESULTS_CONTAINER_ID).appendChild(image);
        setProgressValue((oldValue) => oldValue + 1);
      });
    };
    if (files) fetch();
  }, []);

  return (
    <>
      <div className="progress-indicator-container">
        <p>
          {progressValue} / {files?.length ?? 0} files processed
        </p>
        <ProgressBar
          animated
          className="progress"
          now={files ? (progressValue / files.length) * 100 + 1 : 0}
        />
      </div>
      <div id={RESULTS_CONTAINER_ID} className="results-container" />
    </>
  );
};

export default ReportPage;

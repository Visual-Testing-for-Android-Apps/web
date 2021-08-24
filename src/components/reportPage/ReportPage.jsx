import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useLocation } from "react-router";
import { useHistory } from "react-router";

import "./results-page.css";
import Repository from "../../data/Repository";
import VideoResult from "./VideoResult";
import ImageResult from "./ImageResult";
import { inferno256 } from "./gradients256";
import ColourSchemeSelector from "./ColourSchemeSelector";

const ReportPage = (props) => {
  const { files, email } = useLocation().state ?? {};
  const videos = files?.filter((file) => file.type === "video/mp4");
  const images = files?.filter((file) => file.type === "image/jpeg");

  const [progressValue, setProgressValue] = useState(0);

  const [videoResults, setVideoResults] = useState([]);
  const [imageResults, setImageResults] = useState([]);

  const [colourScheme, setColourScheme] = useState(inferno256);
  const [searchTerm, setSearchString] = useState("");

  const history = useHistory();
  useEffect(() => {
    const fetch = async () => {
      const repository = new Repository();

      const heatmaps = repository.uploadImages(images);

      heatmaps.forEach(async (imagePromise) => {
        const imageResult = await imagePromise;
        setImageResults((oldResults) => [...oldResults, imageResult]);
        setProgressValue((oldValue) => oldValue + 1);
      });

      const videoResults = repository.uploadVideos(videos);
      videoResults.forEach(async (videoResultPromise, index) => {
        const videoResult = await videoResultPromise;
        setVideoResults((oldResults) => [...oldResults, videoResult]);
        setProgressValue((oldValue) => oldValue + 1);
      });
    };
    if (files) fetch();
  }, []);

  const handleSearching = (e) => {
    setSearchString(e.target.value);
  };

  return (
    <>
      <div className="results">
        <button className="back-btn" onClick={() => history.goBack()}>
          &laquo; Go Back
        </button>
        <div className="search-area">
          <input
            type="text"
            name="search"
            placeholder="Type name of file here"
            className="file-search"
            value={searchTerm}
            onChange={handleSearching}
          />
          <button type="submit">Useless button</button>
        </div>
        <div className="progress-indicator-container">
          <p>
            {progressValue} / {files?.length ?? 0} files processed
          </p>
          <ProgressBar
            animated={progressValue != files.length}
            className="progress"
            now={files ? (progressValue / files.length) * 100 + 1 : 0}
          />
        </div>
        {imageResults.length > 0 && <ColourSchemeSelector setColourScheme={setColourScheme} />}
        <div className="results-container">
          {videoResults
            .map((result, index) => (
              <VideoResult key={`video-${index}`} videoFile={videos[index]} videoResult={result} />
            ))
            .filter((_, index) => {
              return searchTerm.length > 0
                ? videos[index].name.substring(0, searchTerm.length) === searchTerm
                : () => true;
            })}
          {imageResults
            .map((result, index) => (
              <ImageResult
                key={`image-${index}`}
                imageFile={images[index]}
                imageResult={result}
                colourScheme={colourScheme}
              />
            ))
            .filter((_, index) => {
              return searchTerm.length > 0
                ? images[index].name.substring(0, searchTerm.length) === searchTerm
                : () => true;
            })}
        </div>
      </div>
    </>
  );
};

export default ReportPage;

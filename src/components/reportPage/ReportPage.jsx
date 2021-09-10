import React, { useEffect, useState, useRef } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useLocation } from "react-router";
import { useHistory } from "react-router";

import "./results-page.css";
import Repository from "../../data/Repository";
import VideoResult from "./VideoResult";
import ImageResult from "./ImageResult";
import { inferno256 } from "./gradients256";
import ColourSchemeSelector from "./ColourSchemeSelector";
import { alignPropType } from "react-bootstrap/esm/DropdownMenu";

const ReportPage = (props) => {
  const { files, email } = useLocation().state ?? {};

  const videos = files?.filter((file) => file.type === "video/mp4");
  const images = files?.filter((file) => ["image/jpeg", "image/png"].includes(file.type));

  const [progressValue, setProgressValue] = useState(0);

  const [videoResults, setVideoResults] = useState([]);
  const [imageResults, setImageResults] = useState([]);

  const [colourScheme, setColourScheme] = useState(inferno256);
  const [searchTerm, setSearchString] = useState("");

  const [filterType, setFilterType] = useState("All");
  const [videoFilterType, setVideoFilterType] = useState("0");

  const filterRef = useRef();
  filterRef.current = filterType;

  const vidFilterRef = useRef();
  vidFilterRef.current = videoFilterType;

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

  const checkImageFilterType = (imageResult) => {
    const bugTypes = imageResult["bug_type"].filter((bugType) => bugType === filterType);
    if (
      filterType === "All" ||
      (filterType === "No defect found" && imageResult["bug_type"].length === 0) ||
      bugTypes[0] === filterType
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkVideoFilterType = (videoResult) => {
    if (videoFilterType === "0" || videoResult["classification"] === videoFilterType) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="results">
        <div className="progress-indicator-container">
          <p>
            {progressValue} / {files?.length ?? 0} files processed
          </p>
          <ProgressBar
            animated={progressValue != files?.length}
            className="progress"
            now={files ? (progressValue / files.length) * 100 + 1 : 0}
          />
        </div>
        <div className="search-area">
          <input
            type="text"
            name="search"
            placeholder="Search for files..."
            className="file-search"
            value={searchTerm}
            onChange={handleSearching}
          />{" "}
        </div>
        <div></div>
      </div>
      {imageResults.length > 0 && <h1 className="results-title">Image Results</h1>}
      {imageResults.length > 0 && <ColourSchemeSelector setColourScheme={setColourScheme} />}
      {imageResults.length > 0 && (
        <div className="image-filter">
          <select
            id="image-results"
            name="image-results"
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            <option value="All">Show All Results</option>
            <option value="Null value">Null value</option>
            <option value="Component occlusion">Component occlusion</option>
            <option value="Missing image">Missing image</option>
            <option value="No defect found">No defect found</option>
          </select>
        </div>
      )}
      <div className="results">
        <div className="results-container">
          {imageResults.reduce((previousResult, currentResult, index) => {
            /* searchTerm.length === 0 ||
            images[index].name.toLowerCase().includes(searchTerm.toLowerCase()) */
            if (checkImageFilterType(currentResult) === true) {
              return [
                ...previousResult,
                <ImageResult
                  key={`image-${index}`}
                  imageFile={images[index]}
                  imageResult={currentResult}
                  colourScheme={colourScheme}
                />,
              ];
            } else {
              return [...previousResult];
            }
          }, [])}
        </div>
        {videoResults.length > 0 && <h1 className="results-title">Video Results</h1>}
        {videoResults.length > 0 && (
            <select
              id="video-results"
              name="video-results"
              onChange={(e) => {
                setVideoFilterType(e.target.value);
              }}
            >
              <option value="0">Show All Results</option>
              <option value="1">No defect</option>
              <option value="2">Missing scrim</option>
              <option value="3">Snackbar blocking bottom navigation</option>
              <option value="4">Stacking multiple banners</option>
              <option value="5">Card flipping</option>
              <option value="6">Moving cards behind other cards</option>
              <option value="7">Stacking multiple snackbars</option>
              <option value="8">Missing elevation</option>
              <option value="9">Modal sheet missing scrim</option>
            </select>
        )}

        <div className="results-container">
          {videoResults.reduce((previousResult, currentResult, index) => {
            console.log(videoFilterType);
            if (checkVideoFilterType(currentResult) === true) {
              return [
                ...previousResult,
                <VideoResult
                  key={`video-${index}`}
                  videoFile={videos[index]}
                  videoResult={currentResult}
                />,
              ];
            } else {
              return [...previousResult];
            }
          }, [])}
        </div>
      </div>
    </>
  );
};

export default ReportPage;

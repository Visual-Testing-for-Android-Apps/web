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

  const filterRef = useRef();
  filterRef.current = filterType;

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

  // const filterImages = (currFilterType) => {
  //   console.log(currFilterType)
  //   return imageResults.filter((imageResult) => {
  //     console.log(imageResult["bug_type"][0])
  //     if (imageResult["bug_type"][0] === currFilterType){
  //       console.log("Inside the if statement")
  //       console.log(imageResult["bug_type"])
  //       return (
  //         <ImageResult
  //                 imageResult={imageResult}
  //         />
  //       )
  //     }
  //   })
  // }

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
          <select
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
            className="custom-select"
            aria-label="Filter Countries By Region"
          >
            <option value="All">Show All Results</option>
            <option value="Null value">Null value</option>
            <option value="Component occlusion">Component occlusion</option>
            <option value="Missing image">Missing image</option>
            <option value="No defect found">No defect found</option>
          </select>
        </div>
        <div></div>
      </div>
      {imageResults.length > 0 && <h1 className="results-title">Image Results</h1>}
      {imageResults.length > 0 && <ColourSchemeSelector setColourScheme={setColourScheme} />}
      <div className="results">
        <div className="results-container">
          {imageResults.reduce((previousResult, currentResult, index) => {
            const bugTypes = currentResult["bug_type"].filter((bugType) => bugType === filterType);
            if (
              filterType === "All" ||
              (filterType === "No defect found" && currentResult["bug_type"].length === 0) ||
              bugTypes[0] === filterType
            ) {
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
        <div className="results-container">
          {videoResults.reduce((previousResult, currentResult, index) => {
            if (
              searchTerm.length === 0 ||
              videos[index].name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
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

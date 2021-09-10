import React, { useEffect, useState, useRef } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import Select from "react-select";
import makeAnimated from "react-select/animated";

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

  // State for the selected defect types in the filter menu
  const [displayValue, getValue] = useState([]);
  const animatedComponents = makeAnimated();

  // All the possible defect types for images & videos
  const options = [
    { value: "5", label: "Card flipping" },
    { value: "Component occlusion", label: "Component Occlusion" },
    { value: "Missing image", label: "Missing Image" },
    { value: "8", label: "Missing elevation" },
    { value: "2", label: "Missing scrim" },
    { value: "9", label: "Modal sheet missing scrim" },
    { value: "6", label: "Moving cards behind other cards" },
    { value: "1", label: "No defect" },
    { value: "Null value", label: "Null Value" },
    { value: "3", label: "Snackbar blocking bottom navigation" },
    { value: "4", label: "Stacking multiple banners" },
    { value: "7", label: "Stacking multiple snackbars" },
  ];

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

  const handleMenuChange = (e) => {
    // Store the selected values in the "displayValue" array
    getValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const checkImageFilterType = (imageResult) => {
    //  SOME: tests whether at least one element in the array passes the includes test
    const found = displayValue.some((value) => imageResult["bug_type"].includes(value));

    if (
      displayValue.length === 0 ||
      (displayValue.includes("1") && imageResult["bug_type"].length === 0) ||
      found
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkVideoFilterType = (videoResult) => {
    const found = displayValue.includes(videoResult["classification"]);
    if (displayValue.length === 0 || found) {
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
        </div>{" "}
      </div>
      {imageResults.length > 0 && <h1 className="results-title">Image Results</h1>}
      {imageResults.length > 0 && <ColourSchemeSelector setColourScheme={setColourScheme} />}
      {imageResults.length > 0 && (
        <div>
          <Select
            className="image-filter"
            isMulti
            closeMenuOnSelect={false}
            components={animatedComponents}
            options={options}
            onChange={handleMenuChange}
          ></Select>
        </div>
      )}

      <div className="results">
        <div className="results-container">
          {imageResults.reduce((previousResult, currentResult, index) => {
            if (
              (searchTerm.length === 0 ||
                images[index].name.toLowerCase().includes(searchTerm.toLowerCase())) &&
              checkImageFilterType(currentResult) === true
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
              (searchTerm.length === 0 ||
                videos[index].name.toLowerCase().includes(searchTerm.toLowerCase())) &&
              checkVideoFilterType(currentResult) === true
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

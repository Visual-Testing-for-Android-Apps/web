import React, { useEffect, useState, useRef } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import "./results-page.css";
import BatchJobRepository from "../../data/BatchJobRepository";
import VideoResult from "./VideoResult";
import ImageResult from "./ImageResult";
import { inferno256 } from "./gradients256";
import ColourSchemeSelector from "./ColourSchemeSelector";

const ReportPage = (props) => {
  // const JobEndpointBase = "https://develop-srcbucket-1uiwrmfelfgyd.s3.ap-southeast-2.amazonaws.com/";
  // const url = useLocation().pathname;
  // const jobID = url.split("/").slice(3,4);
  // const JobEndpoint = JobEndpointBase.concat(jobID)
  const files = [];

  // const videos = files?.filter((file) => file.type === "video/mp4");
  // const images = files?.filter((file) => ["image/jpeg", "image/png"].includes(file.type));

  const [progressValue, setProgressValue] = useState(0);

  const [videoResults, setVideoResults] = useState([]);
  const [imageResults, setImageResults] = useState([]);

  const [colourScheme, setColourScheme] = useState(inferno256);
  const [searchTerm, setSearchString] = useState("");

  const [selectedImageDefects, setImageDefects] = useState([]);
  const [selectedVideoDefects, setVideoDefects] = useState([]);
  const animatedComponents = makeAnimated();

  const imageOptions = [
    { value: "Component occlusion", label: "Component Occlusion" },
    { value: "Missing image", label: "Missing Image" },
    { value: "Null value", label: "Null Value" },
    { value: "No defect", label: "No defect" },
  ];

  const videoOptions = [
    { value: "0", label: "No defect" },
    { value: "1", label: "Pass through other material" },
    { value: "2", label: "Missing scrim" },
    { value: "3", label: "Snackbar blocking bottom navigation" },
    { value: "4", label: "Stacking multiple banners" },
    { value: "5", label: "Card flipping" },
    { value: "6", label: "Moving cards behind other cards" },
    { value: "7", label: "Stacking multiple snackbars" },
    { value: "8", label: "Missing elevation" },
    { value: "9", label: "Modal sheet missing scrim" },
    { value: "No defect", label: "No defect" },
  ];

  const location = useLocation();
  useEffect(() => {
    const fetch = async () => {
      const repository = new BatchJobRepository();

      const publicKey = location.pathname.split("/").at(-1);
      const password = location.search.split("=").at(-1);

      const content = await repository.getBatchJobReportData(publicKey, password);
      console.log(content);

      content.images.forEach(async (image) => {
        setImageResults((oldResults) => [...oldResults, image]);
        setProgressValue((oldValue) => oldValue + 1);
      });

      content.videos.forEach(async (video) => {
        video.classification = video.desc;
        setVideoResults((oldResults) => [...oldResults, video]);
        setProgressValue((oldValue) => oldValue + 1);
      });
    };
    if (files) fetch();
  }, []);

  const handleSearching = (e) => {
    setSearchString(e.target.value);
  };

  const handleImageFilterChange = (e) => {
    setImageDefects(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const handleVideoFilterChange = (e) => {
    setVideoDefects(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const checkImageFilterType = (imageResult) => {
    const found = selectedImageDefects.some((value) => imageResult?.["bug_type"].includes(value));
    return (
      selectedImageDefects.length === 0 ||
      (selectedImageDefects.includes("No defect") && imageResult?.["bug_type"]?.length === 0) ||
      found
    );
  };

  const checkVideoFilterType = (videoResult) => {
    const found = selectedVideoDefects.includes(videoResult["classification"]);
    return selectedVideoDefects.length === 0 || found;
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
        <div className="results ">
          <Select
            isMulti
            placeholder="Filter by defect type..."
            closeMenuOnSelect={false}
            components={animatedComponents}
            options={imageOptions}
            onChange={handleImageFilterChange}
          ></Select>
        </div>
      )}

      <div className="results">
        <div className="results-container">
          {imageResults.reduce((previousResult, currentResult, index) => {
            if (
              (searchTerm.length === 0 ||
                imageResults[index].name.toLowerCase().includes(searchTerm.toLowerCase())) &&
              checkImageFilterType(currentResult) === true
            ) {
              return [
                ...previousResult,
                <ImageResult
                  key={`image-${index}`}
                  imageFile={currentResult.orig_image}
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
          <div className="results">
            <Select
              isMulti
              placeholder="Filter by defect type..."
              closeMenuOnSelect={false}
              components={animatedComponents}
              options={videoOptions}
              onChange={handleVideoFilterChange}
            ></Select>
          </div>
        )}

        <div className="results-container">
          {videoResults.reduce((previousResult, currentResult, index) => {
            if (
              (searchTerm.length === 0 ||
                videoResults[index].name.toLowerCase().includes(searchTerm.toLowerCase())) &&
              checkVideoFilterType(currentResult) === true
            ) {
              return [
                ...previousResult,
                <VideoResult
                  key={`video-${index}`}
                  videoFile={currentResult.video}
                  videoResult={currentResult}
                />,
                ,
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

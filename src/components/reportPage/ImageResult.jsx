import React, { useEffect, useState, useRef } from "react";
import mergeImages from "merge-images";
import { saveAs } from "file-saver";

import { createImageDataUrlFromBase64, encodeFileAsBase64DataUrl } from "../../util/FileUtil";
import "./results-page.css";
import DownloadIcon from "./downloadIcon";

/**
 * An image result consists of the original image, a heatmap, and a description of the bug type. There may be no bug type.
 * @param {{ original_img: String, res_img: String, bug_type: Array<String> }} imageResult
 * @returns
 */
const ImageResult = ({ imageFile, imageResult, colourScheme }) => {
  const HEATMAP_ALPHA = 130;

  const [originalImageDataUrl, setOriginalImageDataUrl] = useState(null);
  const [resultImageDataUrl, setResultImageDataUrl] = useState(null);
  const [heatmapOpacity, setHeatmapOpacity] = useState("100");

  const imageName = imageFile.name ?? imageResult.name;

  // Decode results.
  useEffect(async () => {
    setOriginalImageDataUrl(await encodeFileAsBase64DataUrl(imageFile));
    if (imageResult != null) {
      if (imageResult["heatmap_image"] != null) {
        setResultImageDataUrl(await encodeFileAsBase64DataUrl(imageResult["heatmap_image"]));
      } else if (imageResult["res_img"]) {
        setResultImageDataUrl(createImageDataUrlFromBase64(imageResult["res_img"]));
      }
    }
  }, []);

  const originalImageCanvasRef = useRef(null);
  const resultImageCanvasRef = useRef(null);

  // Draw the original image.
  useEffect(() => {
    if (originalImageDataUrl == null) return;
    const originalImageCanvas = originalImageCanvasRef.current;
    const originalImageContext = originalImageCanvas.getContext("2d");

    const originalImage = new Image();
    originalImage.onload = function () {
      originalImageCanvas.width = this.naturalWidth;
      originalImageCanvas.height = this.naturalHeight;
      originalImageContext.drawImage(
        originalImage,
        0,
        0,
        originalImageCanvas.width,
        originalImageCanvas.height
      );
    };
    originalImage.src = originalImageDataUrl;
  }, [originalImageDataUrl]);

  // Draw the heatmap overlayed on the original image.
  useEffect(() => {
    if (resultImageDataUrl == null) return;
    const resultImageCanvas = resultImageCanvasRef.current;
    const resultImageCanvasContext = resultImageCanvas.getContext("2d");

    const resultImage = new Image();
    resultImage.onload = function () {
      // setting the images to their natural size to maintain their quality
      resultImageCanvas.width = this.naturalWidth;
      resultImageCanvas.height = this.naturalHeight;
      // Draw the image and then read it from the canvas so we can edit the pixel data.
      resultImageCanvasContext.drawImage(
        resultImage,
        0,
        0,
        resultImageCanvas.width,
        resultImageCanvas.height
      );
      const data = resultImageCanvasContext.getImageData(
        0,
        0,
        resultImageCanvas.width,
        resultImageCanvas.height
      );
      // Raw heatmap is black and white, colour the pixels by using the value as an index for a colour scheme array.
      const numPixels = data.width * data.height;
      for (let i = 0; i < numPixels * 4; i += 4) {
        const [red, green, blue] = colourScheme[data.data[i]];
        data.data[i] = red;
        data.data[i + 1] = green;
        data.data[i + 2] = blue;
        data.data[i + 3] = HEATMAP_ALPHA;
      }
      // Draw the coloured heatmap to the canvas.
      resultImageCanvasContext.putImageData(data, 0, 0);
    };
    resultImage.src = resultImageDataUrl;
  }, [resultImageDataUrl, colourScheme]);

  const downloadFile = () => {
    const height = originalImageCanvasRef.current.height;
    const width = originalImageCanvasRef.current.width;
    const tempCanvas = document.createElement("canvas");
    const ctx = tempCanvas.getContext("2d");
    tempCanvas.width = width;
    tempCanvas.height = height;

    // Draw heatmap to new canvas with dimensions matching the original image. Then merge and save.
    const image = new Image();
    image.onload = function () {
      ctx.drawImage(image, 0, 0, width, height);

      mergeImages(
        [
          { src: originalImageCanvasRef.current.toDataURL() },
          { src: tempCanvas.toDataURL(), opacity: 1.0 },
        ],
        {
          height: height,
          width: width,
        }
      ).then((heatmapedImageDataUrl) =>
        saveAs(
          heatmapedImageDataUrl,
          `heatmap_${
            imageResult?.["bug_type"]?.length > 0
              ? imageResult?.["bug_type"]?.join("-")?.replace(" ", "")
              : "no-defect"
          }_${imageName}`
        )
      );
    };
    image.src = resultImageCanvasRef.current.toDataURL();
  };

  const handleHideHeatmap = () => {
    heatmapOpacity === "0" ? setHeatmapOpacity("100") : setHeatmapOpacity("0");
  };

  const imageHeatmapStyle = {
    opacity: heatmapOpacity,
  };

  return (
    <div className="image-result-container">
      <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
        <div className="result">
          <canvas ref={originalImageCanvasRef} className="original-image" />
          <canvas
            ref={resultImageCanvasRef}
            className="image-heatmap"
            style={imageHeatmapStyle}
            onClick={handleHideHeatmap}
          />
        </div>
        <a className="result-filename image-download-btn" onClick={downloadFile}>
          {imageName} <DownloadIcon />
        </a>
      </div>
      <p className="result-explanation">
        {imageResult != null ? (
          imageResult?.["bug_type"]?.length == 0 ? (
            "No defect found"
          ) : (
            imageResult?.["bug_type"]?.join(", ")
          )
        ) : (
          <span style={{ color: "red" }}>Error analysing image</span>
        )}
      </p>
    </div>
  );
};

export default ImageResult;

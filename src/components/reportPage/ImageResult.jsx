import React, { useEffect, useState, useRef } from "react";

import { createImageDataUrlFromBase64 } from "../../util/FileUtil";
import "./results-page.css";

/**
 * An image result consists of the orignal image, a heatmap, and a description of the bug type. There may be no bug type.
 * @param {{ original_img: String, res_img: String, bug_type: Array<String> }} imageResult
 * @returns
 */
const ImageResult = ({ imageResult, colourScheme }) => {
  const HEATMAP_ALPHA = 130;

  const [originalImageDataUrl, setOriginalImageDataUrl] = useState(null);
  const [resultImageDataUrl, setResultImageDataUrl] = useState(null);

  // Decode results.
  useEffect(async () => {
    setOriginalImageDataUrl(await createImageDataUrlFromBase64(imageResult["original_img"]));
    setResultImageDataUrl(await createImageDataUrlFromBase64(imageResult["res_img"]));
  }, []);

  const originalImageCanvasRef = useRef(null);
  const resultImageCanvasRef = useRef(null);

  // Draw the original image.
  useEffect(() => {
    const originalImageCanvas = originalImageCanvasRef.current;
    const originalImageContext = originalImageCanvas.getContext("2d");

    const originalImage = new Image();
    originalImage.onload = function () {
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
    const resultImageCanvas = resultImageCanvasRef.current;
    const resultImageCanvasContext = resultImageCanvas.getContext("2d");

    const resultImage = new Image();
    resultImage.onload = function () {
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

  return (
    <div>
      <div className="result">
        <canvas ref={originalImageCanvasRef} className="original-image" />
        <canvas ref={resultImageCanvasRef} className="image-heatmap" />
      </div>
      <p className="result-explanation">
        {imageResult["bug_type"].length == 0
          ? "No defect found"
          : imageResult["bug_type"].join(", ")}
      </p>
    </div>
  );
};

export default ImageResult;

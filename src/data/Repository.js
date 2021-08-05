import { encodeFileAsBase64DataUrl } from "../util/FileUtil";

/**
 * Responsible for communication with the backend
 */
class Repository {
  /**
   * Uploads screenshots to OwlEyes and returns heatmaps showing potential defects.
   * @param {Array<File>} files
   * @returns {Array<Promise<Image>>}
   */
  uploadImages(images) {
    return images.map((image) => {
      return encodeFileAsBase64DataUrl(image)
        .then((encodedImage) =>
          fetch("https://8uxam9kkod.execute-api.ap-southeast-2.amazonaws.com/Prod/owleye/", {
            method: "POST",
            body: this._getBase64FromDataUrl(encodedImage),
          })
        )
        .then((response) => response.json())
        .then((json) => this._createImageDataUrlFromBase64(json["res_img"]))
        .catch((error) => console.error(error));
    });
  }

  /**
   * Uploads files to Seenomaly and returns an object describing the preceived.
   * Results correspond to the following table.
   * ┌────────────────┬───────────────────────────────────────┐
   * │ Classification │               Explanation             │
   * ├────────────────┼───────────────────────────────────────┤
   * │              0 │ Cannot place image in space           │
   * │              1 │ Pass through other material           │
   * │              2 │ Lack of scrimmed background           │
   * │              3 │ Snackbar blocks bottom app bar        │
   * │              4 │ Stack multiple banners                │
   * │              5 │ Flip card to reveal information       │
   * │              6 │ Move one card behind other card       │
   * │              7 │ Stack multiple snackbars              │
   * │              8 │ Lack of shadow                        │
   * │              9 │ Invisible scrim of modal bottom sheet │
   * └────────────────┴───────────────────────────────────────┘
   * @param {Array<File>} videos
   * @returns {Array<Promise<{ classification: String, explanation: String }>>}
   */
  uploadVideos(videos) {
    return videos.map((video) => {
      return encodeFileAsBase64DataUrl(video)
        .then((encodedVideo) =>
          fetch("https://wom3x88xak.execute-api.ap-southeast-2.amazonaws.com/Prod/Seenomaly/", {
            method: "POST",
            body: this._getBase64FromDataUrl(encodedVideo),
          })
        )
        .then((response) => response.json())
        .catch((error) => console.error(error));
    });
  }

  /**
   * Creates an image from a base64 encoded string.
   * @param {String} imageAsBase64String
   * @returns {Image}
   */
  _createImageDataUrlFromBase64(imageAsBase64String) {
    // Create a Data URL for the base64 image.
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    // https://www.w3docs.com/snippets/html/how-to-display-base64-images-in-html.html
    return `data:image/png;base64,${imageAsBase64String}`;
  }

  /**
   * Extracts the base64 portion of a data url.
   * @param {String} dataUrl
   * @returns {String} The base64 portion of the data url
   */
  _getBase64FromDataUrl(dataUrl) {
    return dataUrl.split(",")[1];
  }
}

export default Repository;

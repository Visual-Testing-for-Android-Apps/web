import { encodeFileAsBase64DataUrl } from "../util/FileUtil";

/**
 * Responsible for communication with the backend
 */
class Repository {
  /**
   * Uploads screenshots to OwlEyes and returns heatmaps showing potential defects.
   * @param {Array<File>} files
   * @returns {Array<Promise<{ { original_img: String, res_img: String, bug_type: Array<String> } }>>}
   */
  uploadImages(images) {
    return images.map((image) => {
      return encodeFileAsBase64DataUrl(image)
        .then((encodedImage) =>
          fetch("https://ekh9wzayy6.execute-api.ap-southeast-2.amazonaws.com/Prod/owleye/", {
            method: "POST",
            body: this._getBase64FromDataUrl(encodedImage),
          })
        )
        .then((response) => response.json())
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
   * Extracts the base64 portion of a data url.
   * @param {String} dataUrl
   * @returns {String} The base64 portion of the data url
   */
  _getBase64FromDataUrl(dataUrl) {
    return dataUrl.split(",")[1];
  }
}

export default Repository;

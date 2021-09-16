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
          fetch(__OWLEYES_ENDPOINT__, {
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
          fetch(__SEENOMALY_ENDPOINT__, {
            method: "POST",
            body: this._getBase64FromDataUrl(encodedVideo),
          })
        )
        .then((response) => response.json())
        .catch((error) => console.error(error));
    });
  }

  /**
   * Submits a batch job.
   * @param {String} email
   * @param {Array<File>} files
   */
  async uploadBatchJob(email, files) {
    try {
      // Get upload urls.
      const { jobID, uploadUrls } = await (
        await fetch(__BATCH_JOB_ENDPOINT__, {
          method: "POST",
          body: JSON.stringify({ email, fileNames: files.map((file) => file.name) }),
        })
      ).json();

      // Upload files.
      for (const [fileName, uploadUrl] of Object.entries(uploadUrls)) {
        const file = files.find((file) => file.name === fileName);
        const fileDataUrl = await encodeFileAsBase64DataUrl(file);

        const binary = atob(this._getBase64FromDataUrl(fileDataUrl));
        const array = [];
        for (var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        const blobData = new Blob([new Uint8Array(array)], { type: file.type });
        await fetch(uploadUrl, {
          method: "PUT",
          body: blobData,
        });
      }

      // Send done signal.
      await fetch(__BATCH_JOB_ENDPOINT__, {
        method: "POST",
        body: JSON.stringify({
          uploadDone: "true",
          jobID,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  }

  async requestBatchJob(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
        body: url,
      });
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
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

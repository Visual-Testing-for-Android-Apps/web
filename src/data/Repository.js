import routes from "./API";

/**
 * Responsible for communication with the backend
 */
class Repository {
  /**
   * Uploads screenshots to OwlEyes and returns heatmaps showing potential defects.
   * @param {Array<File>} files
   * @returns {Array<Promise<Image>>}
   */
  uploadFiles(files) {
    return files.map((file) => {
      return this._encodeImageAsBase64DataUrl(file)
        .then((encodedImage) =>
          fetch("https://8uxam9kkod.execute-api.ap-southeast-2.amazonaws.com/Prod/owleye/", {
            method: "POST",
            body: this._getBase64FromDataUrl(encodedImage),
          })
        )
        .then((response) => response.json())
        .then((json) => this._createImageFromBase64(json["res_img"]))
        .catch((error) => console.error(error));
    });
  }

  /**
   * Encodes the image as a base 64 Data URL.
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
   * @param {File} image
   * @returns {Promise<String>}
   */
  _encodeImageAsBase64DataUrl(image) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(image);
    });
  }

  /**
   * Creates an image from a base64 encoded string.
   * @param {String} imageAsBase64String
   * @returns {Image}
   */
  _createImageFromBase64(imageAsBase64String) {
    const image = new Image();
    // Create a Data URL for the base64 image.
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    // https://www.w3docs.com/snippets/html/how-to-display-base64-images-in-html.html
    image.src = `data:image/png;base64,${imageAsBase64String}`;
    return image;
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

/**
 * Encodes the file as a base 64 Data URL.
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 * @param {File} file
 * @returns {Promise<String>}
 */
const encodeFileAsBase64DataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Creates an image from a base64 encoded string.
 * @param {String} imageAsBase64String
 * @returns {Image}
 */
const createImageDataUrlFromBase64 = (imageAsBase64String) => {
  // Create a Data URL for the base64 image.
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
  // https://www.w3docs.com/snippets/html/how-to-display-base64-images-in-html.html
  return `data:image/png;base64,${imageAsBase64String}`;
};

export { encodeFileAsBase64DataUrl, createImageDataUrlFromBase64 };

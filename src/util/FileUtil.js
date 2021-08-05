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

export { encodeFileAsBase64DataUrl };

import { encodeFileAsBase64DataUrl, getBase64FromDataUrl } from "../util/FileUtil";

/**
 * Responsible for communication with the backend
 */
class BatchJobRepository {
  /**
   * Submits a batch job.
   * @param {String} email
   * @param {Array<File>} files
   */
  async uploadBatchJob(email, files) {
    // Get upload urls.
    const { jobID, uploadUrls } = await (
      await fetch(`${__BATCH_JOB_ENDPOINT__}/job/upload-request`, {
        method: "POST",
        body: JSON.stringify({ email, fileNames: files.map((file) => file.name) }),
      })
    ).json();

    // Upload files.
    for (const [fileName, uploadUrl] of Object.entries(uploadUrls)) {
      const file = files.find((file) => file.name === fileName);
      const fileDataUrl = await encodeFileAsBase64DataUrl(file);

      const binary = atob(getBase64FromDataUrl(fileDataUrl));
      const array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      const blobData = new Blob([new Uint8Array(array)], { type: file.type });
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: blobData,
      });
      if (uploadResponse.status != 200) throw `Failed to upload file: ${fileName}`;
    }

    // Verify email.
    const verificationResponse = await fetch(`${__BATCH_JOB_ENDPOINT__}/job/verify-code`, {
      method: "POST",
      body: JSON.stringify({
        verificationCode: "123456",
        jobID,
      }),
    });

    if (verificationResponse.status != 200) throw "Email verification failed";

    // Send done signal.
    const doneResponse = await fetch(`${__BATCH_JOB_ENDPOINT__}/job/upload-done`, {
      method: "POST",
      body: JSON.stringify({
        uploadDone: "true",
        jobID,
      }),
    });
    if (doneResponse.status != 200) throw "Failed to submit";
  }

  async requestBatchJob(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

  async getFileFromUrl(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      return response.url;
    } catch (error) {
      return console.log(error);
    }
  }

  async getBatchJobReportData(publicKey, password) {
    const dataFolderResponse = await fetch(`${__BATCH_JOB_REPORT_ENDPOINT__}/jobdata`, {
      method: "POST",
      body: JSON.stringify({
        publicKey: publicKey,
        pwd: password,
      }),
    });
    if (dataFolderResponse.status != 200) throw "Failed to fetch job data folder url";
    const dataFolderUrl = await dataFolderResponse.json().then((r) => r.url);

    const resultReferencesResponse = await fetch(dataFolderUrl);
    if (resultReferencesResponse.status != 200) throw "Failed to fetch job data folder contents";

    const resultReferences = await resultReferencesResponse.json();

    // TODO: error handling

    resultReferences.images = resultReferences.images.map(async (imageResult) => {
      imageResult.name = imageResult.orig_image.split("/")[1];
      imageResult.bug_type = imageResult.titles;
      imageResult.orig_image = await fetch(`${__BATCH_JOB_REPORT_ENDPOINT__}/job/file`, {
        method: "POST",
        body: JSON.stringify({
          filePath: imageResult.orig_image,
        }),
      });
      // .then((imageURL) => fetch(imageURL.json().url))
      // .catch((err) => {
      //   throw err;
      // });
      // imageResult.orig_image = await imageResult.orig_image.json();
      // console.log(imageResult.orig_image);
      imageResult.orig_image = await (
        await fetch((await imageResult.orig_image.json()).url)
      ).blob();

      imageResult.heatmap_image = await fetch(`${__BATCH_JOB_REPORT_ENDPOINT__}/job/file`, {
        method: "POST",
        body: JSON.stringify({
          filePath: imageResult.heatmap_image,
        }),
      });
      // .then(async (imageURL) => await fetch(imageURL.json().url))
      // .catch((err) => {
      //   throw err;
      // });
      imageResult.heatmap_image = await imageResult.heatmap_image.json();
      imageResult.heatmap_image = await (await fetch(imageResult.heatmap_image.url)).blob();
      return imageResult;
    });
    resultReferences.videos = resultReferences.videos.map(async (videoResult) => {
      videoResult.name = videoResult.video.split("/")[1];
      videoResult.video = await fetch(`${__BATCH_JOB_REPORT_ENDPOINT__}/job/file`, {
        method: "POST",
        body: JSON.stringify({
          filePath: videoResult.video,
        }),
      });
      // .then(async (videoURL) => await fetch(videoURL.json().url))
      // .catch((err) => {
      //   throw err;
      // });
      videoResult.video = await videoResult.video.json();
      videoResult.video = await (await fetch(videoResult.video.url)).blob();
      return videoResult;
    });

    return resultReferences;
  }
}

export default BatchJobRepository;

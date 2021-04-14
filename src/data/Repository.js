import routes from './API';

/**
 * Responsible for communication with the backend
 */
class Repository {
    constructor() {
        self.FILE_UPLOAD_URL = `${routes.hostUrl}${routes.upload}`;
    }

    sumbitForAnalysis(files) {
        const file = files[0];
        const formData = new FormData();
        formData.append("file", file);
        return fetch(FILE_UPLOAD_URL, { method: "POST", body: formData });
    }
}

export default Repository;

import routes from './API';

/**
 * Responsible for communication with the backend
 */
 class Repository {

    uploadFiles(files) {
        const formData = new FormData();
        files.forEach(file => {
            formData.append("userFile", file);
        })
        return fetch(routes.upload, { method: "POST", body: formData });
    }
}

export default Repository;

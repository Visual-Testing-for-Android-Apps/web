import routes from './API';

/**
 * Responsible for communication with the backend
 */
 class Repository {

    uploadFiles(files) {
        return this._encodeImage(files[0])
        .then(encodedImage => fetch('https://8uxam9kkod.execute-api.ap-southeast-2.amazonaws.com/Prod/owleye/', { method: "POST", body: encodedImage.split(',')[1] }))
        .then(response => response.json())
        .then(json => this._decodeImage(json["res_img"]))
    }

    _encodeImage(image) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(image);
        })
    }

    _decodeImage(imageAsString) {
        const image = new Image();
        image.src = `data:image/png;base64,${imageAsString}`;
        return image;
    }
}

export default Repository;

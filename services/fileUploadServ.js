import {backendApi} from "../constants/apiSetting";

export async function uploadImageAsync(uri) {
    // let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';
    let apiUrl = backendApi + 'upload';

    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    });

    let options = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    };

    return fetch(apiUrl, options);
}


export async function uploadDocumentAsync(uri, name) {
    let apiUrl = backendApi + 'file_upload';

    let uriParts = name.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('document', {
        uri,
        name: name,
        type: `application/${fileType}`,
    });

    let options = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    };

    return fetch(apiUrl, options);
}
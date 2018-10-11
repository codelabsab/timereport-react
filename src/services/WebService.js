import * as StorageService from '../services/StorageService';

export function getAccessToken(url) {
    return fetch(url).then(res => res.json()).then(handleErrors);
}

export function getUsers() {
    let urlSegemntAccessToken = '?access_token=' + StorageService.getAccessToken();
    console.log(urlSegemntAccessToken);
    return fetch(API_ROOT + '/api/users' + urlSegemntAccessToken)
        .then(res => res.json())
        .then(handleErrors2);
}

export function getTimeReport(query) {
    let urlSegemntAccessToken = '?access_token=' + StorageService.getAccessToken();
    return fetch(API_ROOT + '/api/timereport' + urlSegemntAccessToken, {
        method: 'POST',
        body: JSON.stringify(query),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(handleErrors2);
}
function handleErrors(response) {
    console.log('slack api', response);
    if (!response.ok) {
        throw Error(response.error);
    }
    return response;
}
function handleErrors2(response) {
    console.log('backend api',response);
    if (response.error) {
        throw Error(response.error);
    }
    return response;
}



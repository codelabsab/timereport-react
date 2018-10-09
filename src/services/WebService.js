import * as StorageService from '../services/StorageService';

export function getAccessToken(url) {
    return fetch(url).then(res => res.json()).then(handleErrors);
}

export function getUsers() {
    let urlSegemntAccessToken = '?access_token=' + StorageService.getAccessToken();
    return fetch(API_ROOT + '/api/users' + urlSegemntAccessToken)
        .then(res => res.json())
        .then(handleErrors);
}

export function getTimeReport(query) {
    let urlSegemntAccessToken = '?access_token=' + StorageService.getAccessToken();
    return fetch(API_ROOT + '/api/timereport' + urlSegemntAccessToken, {
        method: 'POST',
        body: JSON.stringify(query),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(handleErrors);
}
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.error);
    }
    return response;
}



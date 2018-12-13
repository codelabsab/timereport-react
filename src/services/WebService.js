import * as StorageService from '../services/StorageService';
const SLACK_USER_LIST_URL = 'https://slack.com/api/users.list';

export function getAccessToken(url) {
    return fetch(url).then(res => res.json()).then(handleErrors);
}

export function getSlackUsers() {
    let url = SLACK_USER_LIST_URL + '?token=' + SLACK_ACCESS_TOKEN;
    return fetch(url)
        .then(res => res.json())
        .then(handleErrors);
}

export function getUsers() {
    let urlSegemntAccessToken = '?access_token=' + StorageService.getAccessToken();
    return fetch(API_ROOT + '/api/users' + urlSegemntAccessToken)
        .then(res => res.json())
        .then(handleErrors2);
}

export function getUsersV2() {
    let urlSegemntAccessToken = '?access_token=' + StorageService.getAccessToken();
    return fetch(API_ROOT + '/api/v2/users' + urlSegemntAccessToken)
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

export function getTimeReportV2(query) {
    let urlSegemntAccessToken = '?access_token=' + StorageService.getAccessToken();
    let urlSegmentApi = '/api/v2/timereport/' + query.userName + '/' + urlSegemntAccessToken + '&startDate=' + query.startDate + '&endDate=' + query.endDate;
    return fetch(API_ROOT + urlSegmentApi, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(handleErrors2);
}

export function createTimeReport(query) {
    let urlSegemntAccessToken = '?access_token=' + StorageService.getAccessToken();
    return fetch(API_ROOT + '/api/timereport2' + urlSegemntAccessToken, {
        method: 'POST',
        body: JSON.stringify(query),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(handleErrors2);
}

export function createTimeReportV2(query) {
    let urlSegemntAccessToken = '?access_token=' + StorageService.getAccessToken();
    return fetch(API_ROOT + '/api/v2/timereport' + urlSegemntAccessToken, {
        method: 'POST',
        body: JSON.stringify(query),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(handleErrors2);
}

export function updateTimeReport(query) {
    let urlSegemntAccessToken = '?access_token=' + StorageService.getAccessToken();
    return fetch(API_ROOT + '/api/timereport2/' + query.id + urlSegemntAccessToken, {
        method: 'PUT',
        body: JSON.stringify(query),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(handleErrors2);
}

export function updateTimeReportV2(query) {
    let urlSegemntAccessToken = '?access_token=' + StorageService.getAccessToken();
    return fetch(API_ROOT + '/api/v2/timereport/' + query.id + urlSegemntAccessToken, {
        method: 'PUT',
        body: JSON.stringify(query),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(handleErrors2);
}

export function deleteTimeReport(query) {
    let urlSegemntAccessToken = '?access_token=' + StorageService.getAccessToken();
    return fetch(API_ROOT + '/api/timereport2/' + query.id + urlSegemntAccessToken, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(handleErrors2);
}

export function deleteTimeReportV2(query) {
    let urlSegemntAccessToken = '?access_token=' + StorageService.getAccessToken();
    return fetch(API_ROOT + '/api/v2/timereport/' + query.id + urlSegemntAccessToken, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(handleErrors2);
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.error);
    }
    return response;
}
function handleErrors2(response) {
    if (response.error) {
        throw Error(response.error);
    }
    return response;
}

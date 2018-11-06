import * as StorageService from '../services/StorageService';

export function getAccessToken(url) {
    return fetch(url).then(res => res.json()).then(handleErrors);
}

export function userlookupbyemail(email) {
    let url = 'https://slack.com/api/users.list?token=' + SLACK_ACCESS_TOKEN;
    return fetch(url)
        .then(res => res.json())
        .then(handleErrors)
        .then((data) => {
            return findUserByEmail(data.members,email);
        });
}

function findUserByEmail(users,email){
    let userFound = users.find(function (u) {
        return u.profile.email == email;
    });
    let slackuser = null;
    if (userFound)
    slackuser = { id: userFound.id, email: email, team_id: userFound.team_id, name: userFound.name };
    return slackuser;
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

export function deleteTimeReport(query) {
    let urlSegemntAccessToken = '?access_token=' + StorageService.getAccessToken();
    return fetch(API_ROOT + '/api/timereport2/' + query.id + urlSegemntAccessToken, {
        method: 'DELETE'
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
    console.log('backend api', response);
    if (response.error) {
        throw Error(response.error);
    }
    return response;
}
//import { WebClient } from '@slack/client';
//const web = new WebClient(SLACK_ACCESS_TOKEN);
    //https://slack.com/api/users.list?token=xoxp-83549292471-395029342704-453103920096-d2ae6e7055090e94c1a0626480c9c680
    //return web.apps.permissions.resources.list();
    // let url = 'https://slack.com/api/users.lookupByEmail?email='+email+'&token='+SLACK_ACCESS_TOKEN;
    // return fetch(url).then(res => res.json()).then(handleErrors);


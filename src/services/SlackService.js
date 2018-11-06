import * as StorageService from '../services/StorageService';
import * as WebService from '../services/WebService';

export function userLookupByEmail(email) {
    return WebService.getSlackUsers()
        .then((data) => findUserByEmail(data.members,email));
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
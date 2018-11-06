export function setAccessToken(access_token){
    sessionStorage.setItem('access_token', access_token);
}
export function getAccessToken(){
    return sessionStorage.getItem('access_token');
}
export function resetAccessToken(){
    sessionStorage.removeItem('access_token');
}
export function getSlackUser(){
    return sessionStorage.getItem('slack_user');
}
export function setSlackUser(slack_user){
    return sessionStorage.setItem('slack_user', slack_user);
}
export function resetSlackUser(){
    sessionStorage.removeItem('slack_user');
}

export function setAccessToken(access_token){
    sessionStorage.setItem('access_token', access_token);
}
export function getAccessToken(){
    return sessionStorage.getItem('access_token');
}
export function resetAccessToken(){
    sessionStorage.removeItem('access_token');
}


export function getAccessTokenUrl(code) {
    return 'https://slack.com/api/oauth.access?client_id=' + SLACK_CLIENT_ID + '&code=' + code + '&client_secret=' + SLACK_CLIENT_SECRET;
}

export function validateAccessToken(response) {
    if (!response.ok || response.error){
        console.error(response.error);
        return false;
    }
    return true;
    //console.log('access_token', response.access_token);
    //sessionStorage.setItem('access_token', response.access_token);
}

export function getVerificationCode(searchString) {
    let isSearchStringEmpty = !searchString ;
    let isSearchStringContainsNoCode = !searchString.includes("?code=");
    if (isSearchStringEmpty || isSearchStringContainsNoCode){
        console.error('Invalid Verification Code');
        return null;
    }
    return searchString.replace("?", "")
        .split("&")
        .find((item) => item.includes("code="))
        .replace("code=", "");

}
import React, { Component } from 'react';
import LoaderComponent from '../components/LoaderComponent';

export default class Login extends Component {
    state = {
        redirect: false
    };
    constructor(props) {
        super(props);
        let code = this.getCode(props.location.search);
        this.getAccessToken(code).then((response)=>this.validateAccessToken(response));
    }
    getAccessToken = (code) => fetch('https://slack.com/api/oauth.access?client_id=' +SLACK_CLIENT_ID+ '&code='+code+ '&client_secret='+SLACK_CLIENT_SECRET).then(res => res.json())
    
    validateAccessToken = (response)=> {
        if(!response.ok || response.error)
            return;
        console.log('access_token', response.access_token);
        //sessionStorage.setItem('access_token', response.access_token);
    }
    getCode = (searchString) => {
        if (searchString.count == 0)
            return null;
        return searchString.replace("?", "")
            .split("&")
            .find((item) => item.includes("code="))
            .replace("code=", "");

    }
    render() {
        return <LoaderComponent />;
    }
}

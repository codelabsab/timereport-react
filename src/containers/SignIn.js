import React, { Component } from 'react';
import { CognitoUserService } from '../services/CognitoUserService';
import { Redirect } from "react-router-dom";
import { NotifyContainer, NotifyService } from '../services/NotifyService';
import * as SlackService from '../services/SlackService';
import * as StorageService from '../services/StorageService';
import ReactLoading from "react-loading";

export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: false };
    }

    doSignIn = (event) => {
        this.setState({ isLoading: true });
        event.preventDefault();
        CognitoUserService.authenticateUser({
            username: this.username.value,
            password: this.password.value
        }, this.signInCallback);
    }

    signInCallback = (error, email) => {
        let emailFound = !!email;
        if (!emailFound)
            this.handleError(error);
        else
            SlackService.userLookupByEmail(email)
                .then(slack_user => {
                    if (slack_user == null) {
                        this.storeUserDataIntoSession(this.getNonSlackUser())
                        return;
                    }
                    this.storeUserDataIntoSession(slack_user);
                    this.props.onSignIn(emailFound);
                });
        this.setState({ isLoading: false });
    }
    getNonSlackUser = () => {
        let payload = CognitoUserService
            .getUser()
            .signInUserSession.idToken.payload;
        let email = payload['email'];
        let domain = email.replace(/.*@/, "");
        return {
            email: email,
            id: null,
            name: payload['cognito:username'],
            team_id: domain
        };
    }
    storeUserDataIntoSession = (user) => {
        StorageService.setSlackUser(user);
        StorageService.setAccessToken(user.team_id);
    }

    handleError = (e) => {
        let errorMessage = 'Error : ' + (e.message || 'Error Occured');
        NotifyService.notify(errorMessage);
    }

    render() {
        if (this.props.isSignIn) {
            return <Redirect to='/dashboard' />;
        }
        return (
            <div>
                <div className="form-group row">
                    <div className="col-12 col-sm-8 offset-sm-2">
                        <h4>Sign In</h4>
                    </div>
                </div>
                <form>
                    <div className="form-group row">
                        <div className="col-12 col-sm-8 offset-sm-2">
                            <input placeholder="User Name" type="text" className="form-control" ref={(imput) => this.username = imput} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-12 col-sm-8 offset-sm-2">
                            <input placeholder="Password" type="password" className="form-control" ref={(imput) => this.password = imput} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-12 col-sm-8 offset-sm-2">
                            <a className="btn-outline" href="/" style={{ marginRight: '.5rem', color: '#343a40' }}>
                                <span className="oi oi-chevron-left"></span>
                            </a>
                            <button type="submit" className="btn btn-dark" onClick={(e) => this.doSignIn(e)}>Submit</button>
                            <a className="btn btn-link" href="#/forgotpassword" style={{ color: '#343a40' }}>Forgot Password</a>
                            {this.state.isLoading && (<ReactLoading type="bars" color="#343a40" />)}
                        </div>
                    </div>
                </form>
                <NotifyContainer />
            </div>
        );
    }
}

import React, { Component } from 'react';
import { CognitoUserService } from '../services/CognitoUserService';
export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    doSignOut = () => {
        CognitoUserService.signOut(
            (error, isSignedOut) => {
                if (error)
                    this.handleError(error);
                else
                    this.props.onSignOut(isSignedOut)
            });
    }
    render() {
        return (
            <nav className="navbar navbar-light bg-dark">
                <a className="navbar-brand" href="/">
                    <img src="https://codelabs.se/images/codelabs_white_code.svg" width="50" height="50" className="d-inline-block align-top"
                        alt="" /> TimeReport
                </a>
                {
                    this.props.isSignIn &&
                    <button className="btn btn-outline-light btn-lg" onClick={() => this.doSignOut()}><span className="oi oi-account-logout"></span>&nbsp;SignOut</button>
                }
                {
                    !this.props.isSignIn &&
                    <span>
                        <a className="btn btn-outline-light btn-lg" href="#/signin"><span className="oi oi-account-login"></span>&nbsp;SignIn</a>&nbsp;
                        <a className="btn btn-outline-light btn-lg" href="#/signup"><span className="oi oi-person"></span>&nbsp;SignUp</a>
                    </span>
                }
            </nav>
        );
    }
}
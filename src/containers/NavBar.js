import React, { Component } from 'react';
import { CognitoUserService } from '../services/CognitoUserService';
import { NotifyContainer, NotifyService } from '../services/NotifyService';
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
    handleError = (e) => {
        let errorMessage = 'Error : ' + (e.message || 'Error Occured');
        NotifyService.notify(errorMessage);
    }
    
    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-dark">
                    <a className="navbar-brand" href="/">
                        <img src="https://codelabs.se/images/codelabs_white_code.svg" width="50" height="50" className="d-inline-block align-top"
                            alt="" /> <span style={{ color: 'hotpink', marginTop: '50%', fontSize: 'x-large' }}>TimeReport</span>
                    </a>
                    {
                        this.props.isSignIn &&
                        <button className="btn btn-outline-light btn-md" onClick={() => this.doSignOut()}><span className="oi oi-account-logout"></span>&nbsp;SignOut</button>
                    }
                    {
                        // need to be delated later on
                        // !this.props.isSignIn &&
                        // <span>
                        //     <span className="d-sm-none">
                        //         <a className="btn btn-outline-light btn-md" href="#/signin"><span className="oi oi-account-login"></span>&nbsp;SignIn</a>&nbsp; 
                        //     </span>
                        //     <span className="d-none d-md-block">
                        //         <a className="btn btn-outline-light btn-md" href="#/signin"><span className="oi oi-account-login"></span>&nbsp;SignIn</a>&nbsp;
                        //         <a className="btn btn-outline-light btn-md" href="#/signup"><span className="oi oi-person"></span>&nbsp;SignUp</a>
                        //     </span>
                        // </span>
                    }
                </nav>
                <NotifyContainer />
            </div>

        );
    }
}
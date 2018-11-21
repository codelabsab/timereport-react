import React, { Component } from 'react';
import { CognitoUserService } from '../services/CognitoUserService';
import { Redirect } from "react-router-dom";
import { NotifyContainer, NotifyService } from '../services/NotifyService';
import * as SlackService from '../services/SlackService';
import * as StorageService from '../services/StorageService';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
    }
    doSignIn = (event) => {
        event.preventDefault();
        CognitoUserService.authenticateUser({
            username: this.username.value,
            password: this.password.value
        }, (error, email) => {
            //if (error)
            //this.handleError(error);
            //else
            let isSignIn = !!email;
            SlackService.userLookupByEmail(email)
                .then(slack_user => {
                    if(slack_user == null){
                        this.handleError(new Error('Email is not found in slack!'));
                        return;
                    }
                    StorageService.setSlackUser(slack_user);
                    StorageService.setAccessToken(slack_user.team_id);
                    this.props.onSignIn(isSignIn);
                });
        });
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
                            <a className="btn-outline" href="/" style={{marginRight:'.5rem', color:'#343a40'}}>
                                <span className="oi oi-chevron-left"></span>
                            </a>
                            <button type="submit" className="btn btn-dark" onClick={(e) => this.doSignIn(e)}>Submit</button>
                            <a className="btn btn-link" href="#/forgotpassword" style={{color:'#343a40'}}>Forgot Password</a>
                        </div>
                    </div>
                </form>

                {/* <br /> <br />
                <div className="form-group row">
                    <div className="col-12 col-sm-8 offset-sm-2">
                        <button className="btn btn-dark" onClick={() => console.log(CognitoUserService.getUser())}> Check Cognito User</button>
                    </div>
                </div> */}
                <NotifyContainer />
            </div>
        );
    }
}

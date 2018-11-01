import React, { Component } from 'react';
import { CognitoUserService } from '../services/CognitoUserService';
import { Redirect } from "react-router-dom";
import { NotifyContainer, NotifyService } from '../services/NotifyService';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
    }
    doSignIn = (event) => {
        event.preventDefault();
        CognitoUserService.authenticateUser({
            username: this.username.value,
            password: this.password.value
        }, (error, isSignIn) => {
            //if (error)
                //this.handleError(error);
            //else
                this.props.onSignIn(isSignIn);
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
                            <button type="submit" className="btn btn-dark" onClick={(e) => this.doSignIn(e)}>Submit</button>
                        </div>
                    </div>
                </form>

                <br /> <br />
                <div className="form-group row">
                    <div className="col-12 col-sm-8 offset-sm-2">
                        <button className="btn btn-dark" onClick={() => console.log(CognitoUserService.getUser())}> Check Cognito User</button>
                    </div>
                </div>
                <NotifyContainer />
            </div>
        );
    }
}

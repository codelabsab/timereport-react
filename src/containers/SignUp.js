import React, { Component } from 'react';
import { CognitoUserService } from '../services/CognitoUserService';
import { Redirect } from "react-router-dom";
import { NotifyContainer, NotifyService } from '../services/NotifyService';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
    }
    doConfirm = (event) => {
        event.preventDefault();
        CognitoUserService.confirmRegistration(this.verificationCode.value,
            (error, isSignUpVerified) => {
                if (error)
                    this.handleError(error);
                else
                    this.props.onSignUpVerified(isSignUpVerified);
            }
        );
    }

    doRegister = (event) => {
        event.preventDefault();
        CognitoUserService.signUp({
            username: this.username.value,
            email: this.email.value,
            password: this.password.value
        },
            (error, isSignUp) => {
                if (error)
                    this.handleError(error);
                else
                    this.props.onSignUp(isSignUp);
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
                {(!this.props.isSignUp) &&
                    <div>
                        <div className="form-group row">
                            <div className="col-12 col-sm-8 offset-sm-2">
                                <h4>Sign Up</h4>
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
                                    <input placeholder="Email" type="text" className="form-control" ref={(imput) => this.email = imput} />
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
                                    <button type="submit" className="btn btn-dark" onClick={(e) => this.doRegister(e)}>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                }
                <br /> <br />

                {(this.props.isSignUp && !this.props.isSignUpVerified) &&
                    <div>
                        <div className="form-group row">
                            <div className="col-12 col-sm-8 offset-sm-2">
                                <h4>Verify User</h4>
                            </div>
                        </div>
                        <form>
                            <div className="form-group row">
                                <div className="col-12 col-sm-8 offset-sm-2">
                                    <div className="alert alert-info">
                                        <strong>Please enter your confirmation code that we sent to your email address! </strong>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-12 col-sm-8 offset-sm-2">
                                    <input placeholder="Verification Code" type="text" className="form-control" ref={(imput) => this.verificationCode = imput} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-12 col-sm-8 offset-sm-2">
                                    <button type="submit" className="btn btn-dark" onClick={(e) => this.doConfirm(e)}>Confirm</button>
                                </div>
                            </div>
                        </form>
                    </div>
                }

                {(this.props.isSignUpVerified) &&
                    <div>
                        <div className="form-group row">
                            <div className="col-12 col-sm-8 offset-sm-2">
                                <div className="alert alert-success">
                                    <strong>User Verified! </strong>
                                </div>
                            </div>
                            <div className="col-12 col-sm-8 offset-sm-2">
                                <a className="btn btn-dark" href="#/signin"> SignIn</a>
                            </div>
                        </div>
                    </div>
                }



                {/* <div className="form-group row">
                    <div className="col-12 col-sm-8 offset-sm-2">
                        <button className="btn btn-dark" onClick={() => console.log(CognitoUserService.getUser())}> Check Cognito User</button>
                    </div>
                </div>
                <br /> <br /> */}
                <NotifyContainer />
            </div>
        );
    }
}

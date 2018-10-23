import React, { Component } from 'react';
import CognitoUserService from '../services/CognitoUserService';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.cognitoUser = new CognitoUserService();
    }

    doConfirm = (event) => {
        event.preventDefault();
        console.log(this.verificationCode.value);
    }

    doRegister = (event) => {
        event.preventDefault();
        this.cognitoUser.signUp({
            username: this.username.value,
            email: this.email.value,
            password: this.password.value,
            phone_number: this.phone_number.value
        });

    }

    render() {
        return (
            <div>
                <div>
                    <form>
                        <div className="form-group row">
                            {/* <label htmlFor="username" className="col-sm-2 col-form-label">User Name</label> */}
                            <div className="col-12 col-sm-8 offset-sm-2">
                                <input placeholder="User Name" type="text" className="form-control" ref={(imput) => this.username = imput} />
                            </div>
                        </div>
                        <div className="form-group row">
                            {/* <label htmlFor="email" className="col-sm-2 col-form-label">Email</label> */}
                            <div className="col-12 col-sm-8 offset-sm-2">
                                <input placeholder="Email" type="text" className="form-control" ref={(imput) => this.email = imput} />
                            </div>
                        </div>
                        <div className="form-group row">
                            {/* <label htmlFor="password" className="col-sm-2 col-form-label">Password</label> */}
                            <div className="col-12 col-sm-8 offset-sm-2">
                                <input placeholder="Password" type="password" className="form-control" ref={(imput) => this.password = imput} />
                            </div>
                        </div>
                        <div className="form-group row">
                            {/* <label htmlFor="phone_number" className="col-sm-2 col-form-label">Phone Number</label> */}
                            <div className="col-12 col-sm-8 offset-sm-2">
                                <input placeholder="Phone Number" type="text" className="form-control" ref={(imput) => this.phone_number = imput} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-12 col-sm-8 offset-sm-2">
                                <button type="submit" className="btn btn-dark" onClick={(e) => this.doRegister(e)}>Submit</button>
                            </div>
                        </div>
                    </form>
                    <br /> <br />
                    <form>
                        <div className="form-group row">
                            <div className="col-12 col-sm-8 offset-sm-2">
                                <div className="alert alert-info">
                                    <strong>Please verify! </strong> if you receive your confirmation code into your email
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

                <div className="form-group row">
                    <div className="col-12 col-sm-8 offset-sm-2">
                        <button className="btn btn-dark" onClick={() => console.log(this.cognitoUser.getUser())}> Check Cognito User</button>
                    </div>
                </div>

            </div>
        );
    }
}

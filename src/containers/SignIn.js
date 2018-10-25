import React, { Component } from 'react';
import { CognitoUserService } from '../services/CognitoUserService';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { isSignIn: false };
    }

    doSignIn = (event) => {
        event.preventDefault();
        CognitoUserService.authenticateUser({
            username: this.username.value,
            email: this.email.value,
            password: this.password.value,
            phone_number: this.phone_number.value
        }, (flag) => {
            this.setState({ isSignIn: flag });
            console.log('isSignIn', flag);
        });

    }

    render() {
        return (
            <div>
                <div className="form-group row">
                    <div className="col-12 col-sm-8 offset-sm-2">
                        <h4>Sign In</h4>
                    </div>
                </div>
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

            </div>
        );
    }
}

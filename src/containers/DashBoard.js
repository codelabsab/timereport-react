import React, { Component } from 'react';
import { CognitoUserService } from '../services/CognitoUserService';
import { Redirect } from "react-router-dom";

export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        console.log(this.state);
        this.state = { isSignedOut: false };
    }

    doSignOut = (event) => {
        event.preventDefault();
        CognitoUserService.signOut(() => {
            this.setState({ isSignedOut: true });
        });

    }

    render() {
        if (this.state.isSignedOut) {
            return <Redirect to='/signin' />;
        }
        return (
            <div>
                <form>
                    <div className="form-group row">
                        <div className="col-12 col-sm-8 offset-sm-2">
                            <button type="submit" className="btn btn-dark" onClick={(e) => this.doSignOut(e)}>SignOut</button>
                        </div>
                    </div>
                </form>
                <div className="form-group row">
                    <div className="col-12 col-sm-8 offset-sm-2">
                        <button className="btn btn-dark" onClick={() => console.log(CognitoUserService.getUser())}> Check Cognito User</button>
                    </div>
                </div>
            </div>
        );
    }
}

import React, { Component } from 'react';
import { CognitoUserService } from '../services/CognitoUserService';
import { Redirect } from "react-router-dom";
import { NotifyContainer, NotifyService } from '../services/NotifyService';

export default class DashBoard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.isSignIn) {
            return <Redirect to='/signin' />;
        }
        return (
            <div>
                <form>
                    DashBoard
                </form>
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

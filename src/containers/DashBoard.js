import React, { Component } from 'react';
import { CognitoUserService } from '../services/CognitoUserService';
import { Redirect } from "react-router-dom";
import { NotifyContainer, NotifyService } from '../services/NotifyService';
import * as WebService from '../services/WebService';
export default class DashBoard extends Component {
    constructor(props) {
        super(props);
    }
    getSlackUserName =(event) => {
        event.preventDefault();
        console.log(this.email.value);
        WebService.userlookupbyemail(this.email.value).then((response) => console.log(response));
    }
    render() {
        if (!this.props.isSignIn) {
            return <Redirect to='/signin' />;
        }
        return (
            <div>
                <form>
                    <div className="form-group row">
                        <div className="col-12 col-sm-8 offset-sm-2">
                            <input placeholder="User Email" type="text" className="form-control" ref={(imput) => this.email = imput} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-12 col-sm-8 offset-sm-2">
                            <button type="submit" className="btn btn-dark" onClick={(e) => this.getSlackUserName(e)}>Check</button>
                        </div>
                    </div>
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

import React, { Component } from 'react';
import { CognitoUserService } from '../services/CognitoUserService';
import { Redirect } from "react-router-dom";
import { NotifyContainer, NotifyService } from '../services/NotifyService';
import * as WebService from '../services/WebService';
import * as StorageService from '../services/StorageService';
export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.getSlackUser();
    }
    
    getSlackUser =() => {
        let slackUser = StorageService.getSlackUser();
        if(this.props.isSignIn && slackUser == null){
            console.error('Slack user not found!');
            return;
        }
        return slackUser;
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

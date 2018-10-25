import React, { Component } from 'react';
import { CognitoUserService } from '../services/CognitoUserService';

export default class DashBoard extends Component {
    constructor(props) {
        super(props);
    }

    doSignOut = (event) => {
        event.preventDefault();
        CognitoUserService.signOut();

    }

    render() {
        return (
            <div>
                <h6>Sign Out</h6>
                <form>
                    <div className="form-group row">
                        <div className="col-12 col-sm-8 offset-sm-2">
                            <button type="submit" className="btn btn-dark" onClick={(e) => this.doSignOut(e)}>SignOut</button>
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

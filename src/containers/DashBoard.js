import React, { Component } from 'react';
import { CognitoUserService } from '../services/CognitoUserService';
import { Redirect } from "react-router-dom";
import { NotifyContainer, NotifyService } from '../services/NotifyService';

export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = { isSignIn: true };
    }

    componentDidMount() {
        CognitoUserService.getUserSession((err, isSignIn) => {
            console.log('isSignIn', isSignIn);
            console.log('err', err);
            this.setState({ isSignIn: isSignIn });
        });
        console.log(CognitoUserService.getUser());
        console.log('GrandChild did mount.');
    }

    doSignOut = (event) => {
        event.preventDefault();
        CognitoUserService.signOut(
            (error, isSignedOut) => {
                if (error)
                    this.handleError(error);
                else
                    this.setState({ isSignIn: !isSignedOut });
            });

    }

    handleError = (e) => {
        let errorMessage = 'Error : ' + (e.message || 'Error Occured');
        NotifyService.notify(errorMessage);
    }

    render() {
        if (!this.state.isSignIn) {
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
                <NotifyContainer />
            </div>
        );
    }
}

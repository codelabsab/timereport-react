
import React, { Component } from 'react';
import { NotifyContainer, NotifyService } from '../services/NotifyService';
import { CognitoUserService } from '../services/CognitoUserService';
export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
    }
    doReset = () =>
        CognitoUserService.forgotPassword(this.username.value, (error, message) => {
            if (error)
                this.handleError(error);
            else
                NotifyService.notify(false, 'Password reset successfully!');
        });

    handleError = (e) => {
        let errorMessage = 'Error : ' + (e.message || 'Error Occured');
        NotifyService.notify(errorMessage);
    }

    render() {
        return (
            <div>
                <div className="form-group row">
                    <div className="col-12 col-sm-8 offset-sm-2">
                        <h4>Reset Password</h4>
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
                            <button type="submit" className="btn btn-dark" onClick={() => this.doReset()}>Reset Password</button>
                            <a style={{ marginLeft: '.5rem' }} className="btn btn-dark" href="#/signin">SignIn Back</a>
                        </div>
                    </div>
                </form>
                <NotifyContainer />
            </div>
        );
    }
}
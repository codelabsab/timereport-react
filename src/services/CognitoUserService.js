import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import * as StorageService from '../services/StorageService';

export class Service {
    constructor() {
        let poolData = {
            UserPoolId: UserPoolId,
            ClientId: ClientId
        };
        this.userPool = new CognitoUserPool(poolData);
        this.user = this.userPool.getCurrentUser();
        this.getUserSession();

    }
    getUserSession = (callback) => {
        if (this.user != null) {
            console.log('User not null');
            this.user.getSession(function (err, session) {
                if (err) {
                    console.log(err);
                    if (callback != null)
                        callback(err, false);
                    return;
                }
                if (callback != null)
                    callback(false, true);
                console.log(session);
                // ----- get email address ?????
                //let email = this.email.value
                //WebService.userlookupbyemail(email)
                //.then((response) => StorageService.setSlackUser(response));


                console.log('session validity: ' + session.isValid());
            });
        }
        else {
            if (callback != null)
                callback(false, false);
        }

    }
    forgotPassword = (userName, callback) => {
        this.user = new CognitoUser({
            Username : userName,
            Pool : this.userPool
        });
        var self = this;
        this.user.forgotPassword({
            onSuccess: function (result) {
                console.log('call result: ' + result);
            },
            onFailure: function(err) {
                callback(err, false);
            },
            inputVerificationCode() {
                let verificationCode = prompt('Please input verification code ' ,'');
                let newPassword = prompt('Enter new password ' ,'');
                self.user.confirmPassword(verificationCode, newPassword, {
                    onSuccess: function () {
                        callback(false, true);
                    },
                    onFailure: function(err) {
                        callback(err, false);
                    }
                });
            }
        });
    }
    getUser = () => this.user;
    signOut = (callback) => {
        console.log('signOut', this.user != null);
        let that = this;
        if (this.user != null) {
            this.user.globalSignOut({
                onSuccess: function (result) {
                    console.log('signput result', result);
                    StorageService.resetSlackUser();
                    that.user = null;
                    callback(false, true);
                },
                onFailure: function (err) {
                    console.log(err);
                    callback(err, false);
                }
            });
        }
        else
            callback(false, true);

    }
    confirmRegistration = (confirmationCode, callback) =>
        this.user.confirmRegistration(confirmationCode, true, function (err, result) {
            if (err) {
                console.log(err);
                callback(err, false);
                return;
            }
            console.log('User Confimed', result);
            callback(false, true);;
        });

    authenticateUser = (data, callback) => {
        let authenticationData = {
            Username: data.username,
            Password: data.password,
        };
        let authenticationDetails = new AuthenticationDetails(authenticationData);

        let userData = {
            Username: data.username,
            Pool: this.userPool
        };
        this.user = new CognitoUser(userData);
        this.user.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                let accessToken = result.getAccessToken().getJwtToken();
                /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
                let idToken = result.idToken.jwtToken;
                //self.storeSlackUserIdentity();
                callback(false, result.idToken.payload.email);
            },

            onFailure: function (err) {
                callback(err, false);
            },

        });

    }

    signUp = (data, callback) => {

        let attributeList = [];

        let dataEmail = {
            Name: 'email',
            Value: data.email
        };

        let attributeEmail = new CognitoUserAttribute(dataEmail);
 
        attributeList.push(attributeEmail);
        var self = this;
        this.userPool.signUp(
            data.username,
            data.password,
            attributeList,
            null,
            function (err, result) {
                console.log('error result')
                console.log(err, result)
                if (err) {
                    if (err.code && err.code == 'UnknownError')
                        return;
                    callback(new Error(err.message || JSON.stringify(err)), false);
                    return;
                }
                if (result.user != null) {
                    console.log('result.user')
                    console.log(result)
                    console.log(result.user)
                    console.log('result.user != null  ' + result.user != null)
                    self.user = result.user;
                    callback(false, true);

                }
            });
    }

    deleteUser = (callback) => this.user.deleteUser(callback);

}

export let CognitoUserService = new Service();
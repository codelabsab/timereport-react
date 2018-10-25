import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

export class Service {
    constructor() {
        let poolData = {
            UserPoolId: UserPoolId,
            ClientId: ClientId
        };
        this.userPool = new CognitoUserPool(poolData);
        this.user = this.userPool.getCurrentUser();
        if (this.user != null) {
            console.log('User not null');
            this.user.getSession(function (err, session) {
                if (err) {
                    alert(err);
                    return;
                }
                console.log('session validity: ' + session.isValid());
            });
        }

    }

    getUser = () => this.user;
    signOut = () => {
        console.log('signOut',this.user != null )
        if (this.user != null)
            this.user.globalSignOut();
    }
    confirmRegistration = (confirmationCode, callback) =>
        this.user.confirmRegistration(confirmationCode, true, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('User Confimed', result);
            callback(true);
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
                console.log(accessToken);
                /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
                let idToken = result.idToken.jwtToken;
                console.log(idToken);
                callback(true);
            },

            onFailure: function (err) {
                alert(err);
            },

        });

    }
    signUp = (data, callback) => {

        let attributeList = [];

        let dataEmail = {
            Name: 'email',
            Value: data.email
        };
        let dataPhoneNumber = {
            Name: 'phone_number',
            Value: data.phone_number
        };
        let attributeEmail = new CognitoUserAttribute(dataEmail);
        let attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

        attributeList.push(attributeEmail);
        attributeList.push(attributePhoneNumber);
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
                    throw new Error(err.message || JSON.stringify(err));
                }
                if (result.user != null) {
                    console.log('result.user')
                    console.log(result)
                    console.log(result.user)
                    console.log('result.user != null  ' + result.user != null)
                    self.user = result.user;
                    callback(true);

                }
            });
    }

    deleteUser = (callback) => this.user.deleteUser(callback);

}

export let CognitoUserService = new Service();
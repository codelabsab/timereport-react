import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

export default class CognitoUserService {
    constructor() {
        let poolData = {
            UserPoolId: UserPoolId,
            ClientId: ClientId
        };
        this.userPool = new CognitoUserPool(poolData);
        this.user = this.userPool.getCurrentUser();

    }

    getUser = () => this.user;

    confirmRegistration = (confirmationCode) =>
        this.user.confirmRegistration(confirmationCode, true, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('User Confimed',result);
        });

    signUp = (data) => {

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

                }
            });
    }

    deleteUser = (callback) => this.user.deleteUser(callback);

}
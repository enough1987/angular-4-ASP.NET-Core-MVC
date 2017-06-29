import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";


import { CognitoUserPool, CognitoUserAttribute, CognitoUser, 
    AuthenticationDetails } from 'amazon-cognito-identity-js';


import { SignUp } from "app/services/auth.service";
import * as AWS from "aws-sdk";


@Injectable()
export class AwsService {

	region: string = "eu-central-1";
    userPoolId: string = "eu-central-1_0VWSoKhex";
	clientId: string = "7cjjqbsn3gfcr2bv732kkqovge";
	identitypoolid: string = "eu-central-1:ab39fcdf-e476-45d0-89fd-3c974a48e36a";		
	identityProvider: string = "cognito-idp."+this.region+".amazonaws.com/"+this.userPoolId;

    userPool: CognitoUserPool;
    cognitoUser: CognitoUser;

    constructor(){
        this.setuserPool();
    }

    private setuserPool(){
        let poolData = {
            UserPoolId : this.userPoolId, // Your user pool id here
            ClientId : this.clientId // Your client id here
        };
        this.userPool = new CognitoUserPool(poolData);        
    }

    signUp( formData: SignUp ): Observable<any> {
        let sub = new Observable(observer => {

            let attributeList = [];

            let email = new CognitoUserAttribute({
                Name : 'email',
                Value : formData.email
            });

            attributeList.push(email);


            this.userPool.signUp(formData.fullName, formData.password, attributeList, null, (err, result)=>{
                if (err) {
                    return observer.error(err);
                }
                this.cognitoUser = result.user;
                console.log('user name is ' + this.cognitoUser.getUsername(), this.cognitoUser );
                observer.next(result.user);
            });
        });
        return sub;
    }


    signIn(formData): Observable<any> {
        let sub = new Observable(observer => {
            let authenticationData = {
                Username : formData.fullName,
                Password : formData.password,
            };
            let authenticationDetails = new AuthenticationDetails(authenticationData);

            let userData = {
                Username : formData.fullName,
                Pool : this.userPool
            };
            this.cognitoUser = new CognitoUser(userData);
            this.cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (result) => {
                    console.log('access token + ' + result.getAccessToken().getJwtToken());

                    //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                    AWS.config.region = this.region; //'<region>';

                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId : this.identitypoolid, // your identity pool id here
                        Logins : {
                            // Change the key below according to the specific region your user pool is in.
                            'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : result.getIdToken().getJwtToken()
                        }
                    });

                    // Instantiate aws sdk service objects now that the credentials have been updated.
                    // example: var s3 = new AWS.S3();

                    observer.next(result);

                },
                onFailure: (err) => {
                    return observer.error(err);
                },

            });
        });
        return sub;
    }

    confirmCode(code): Observable<any>{
        let sub = new Observable(observer => {
            let userData = {
                Username : this.cognitoUser.getUsername(),
                Pool : this.userPool
            };

            this.cognitoUser = new CognitoUser(userData);
            this.cognitoUser.confirmRegistration(code, true, (err, result)=> {
                if (err) {
                    return observer.error(err);
                }
                console.log('call result: ' + result);
                observer.next(result);
            });
        });
        return sub;
    }

    resendConfirmationCode(): Observable<any>{  
        let sub = new Observable(observer => {
            let userData = {
                Username : this.cognitoUser.getUsername(),
                Pool : this.userPool
            };
            this.cognitoUser = new CognitoUser(userData);
            this.cognitoUser.resendConfirmationCode((err, result)=> {
                if (err) {
                    return observer.error(err);
                }
                console.log('call result: ' + result);
                observer.next(result);
            });
        });
        return sub;
    }


}
import { Injectable } from '@angular/core';


import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';


@Injectable()
export class FbService {

// https://www.npmjs.com/package/ng2-facebook-sdk

    constructor(private fb: FacebookService) {
        let initParams: InitParams = {
            appId: '242855366200068',
            xfbml: true,
            version: 'v2.8'
        };
        fb.init(initParams);
        console.log(" FB ", fb);
    }

    signInWithFacebook(): void {
        this.fb.login()
            .then((response: LoginResponse) => console.log(response))
            .catch((error: any) => console.error(error));
    }


}
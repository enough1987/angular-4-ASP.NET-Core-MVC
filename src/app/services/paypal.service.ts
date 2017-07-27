import { Injectable } from '@angular/core';


import { HttpService } from "./http.service";


@Injectable()
export class PaypalService {


    private origin = "http://localhost:3000";
    authorizeCode: string;
    userInfo:any = {};


    constructor( public httpService: HttpService) {
    }

    getAuthorizeUrl = () => {
        return this.httpService.post(
            this.origin + "/api/paypal/authorizeUrl"
        ).map((data: any) => {
            console.log( data );
            if (data.authorizeUrl) {
                this.authorizeCode = data.authorizeUrl;
            }
            return data;
        });
    };
 
    login = () => {
        console.log( this.authorizeCode );
        window.location.href = this.authorizeCode;
    };

    getUserInfo = () => {
        console.log( " code ", this.authorizeCode );
        this.httpService.post(
            this.origin + "/api/paypal/tokeninfoCreate", {
                code: this.authorizeCode
            }).map((data: any) => {
                console.log( data );
                if (data.userinfo) {
                    this.userInfo = data.userInfo;
                }
                return data;
            });
    };

    payout = (amount:number) => {
        console.log(" amount ", amount );
        return this.httpService.post(
            this.origin + "/api/paypal/payout", {
                amount: amount,
                currency: "USD",
                email: this.userInfo.email,
                description: "payout",
            });
    };



}
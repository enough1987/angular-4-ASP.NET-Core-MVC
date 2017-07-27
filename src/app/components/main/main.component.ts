import { Component } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http';
import { ActivatedRoute, Params } from "@angular/router";


import { HttpService } from "app/services/http.service";
import { AuthService } from "app/services/auth.service";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  authorizeCode: any;
  access_token: string;
  paypalAccout: string = "tilgaaleksandr-facilitator-3@gmail.com";
  amount: any;
  paypal_id: any;

  constructor( private activatedRoute: ActivatedRoute, public httpService: HttpService, public authService: AuthService) {
    console.log(" constructor of main ");
  }

  ngOnInit() {

      this.authorizeUrl();

      let code =  this.activatedRoute.snapshot.queryParams["code"];;
      console.log( "%c authorizeCode : " + code , 'background: #222; color: #bada55' );
      if ( code ) {
        this.authorizeCode = code;
        this.paypalToken(code);
      }

  }

  authorizeUrl = () => {
    this.httpService.post(
      "http://localhost:3000/api/paypal/authorizeUrl"
    ).subscribe((data: any) => {
        console.log(" authorizeUrl : ", data );
        if ( data.authorizeUrl ) {
          this.authorizeCode = data.authorizeUrl;
          console.log( "%c " + this.authorizeCode , 'background: #ee7; color: #36c');
          //window.location.href = data.authorizeUrl ;
        }
      });
  };

  paypalToken = (code) => {
    this.httpService.post(
      "http://localhost:3000/api/paypal/tokeninfo", {
        code: code
      }).subscribe((data: any) => {
        console.log(" TOKENINFO : ", data );
        //if ( data.tokeninfo , data.tokeninfo.access_token ) this.paypalUser(data.tokeninfo.access_token );
        //if ( data.tokeninfo )this.paypal_id = data.tokeninfo.id_token;
      });
  };

  paypalUser = (token) => {
    this.httpService.post(
      "http://localhost:3000/api/paypal/user", {
        token: token
      }).subscribe((data: any) => {
        console.log(" USER : ", data );
      });
  };

  paypalLogin = () => {
    window.location.href = this.authorizeCode ; 
  };

  paypalGet = () => {
    this.httpService.post(
      "http://localhost:3000/api/paypal/payout", {
        amount: 1,
        currency: "USD",
        email: this.paypalAccout,
        id_token: this.paypal_id,
        description: "payout",
        access_token: this.access_token
      }).subscribe((data: any) => {
        console.log(" PAYPAL : ", data);
        if (data.links && data.links[0]) {
          alert(" yes paypal ");
        }
      });
  };


}

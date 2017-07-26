import { Component } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http';
import { ActivatedRoute, Params } from "@angular/router";


import { HttpService } from "app/services/http.service";
import { AuthService } from "app/services/auth.service";


@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  authorizeCode: any;
  access_token: string;
  paypalAccout: string = "tilgaaleksandr-facilitator-3@gmail.com";
  amount: any;


  constructor( private activatedRoute: ActivatedRoute, public httpService: HttpService, public authService: AuthService) {
    console.log(" constructor of main ");
  }

  ngOnInit() {

      let code =  this.activatedRoute.snapshot.queryParams["code"];;
      console.log( "%c authorizeCode : " + code , 'background: #222; color: #bada55' );
      if ( code ) {
        this.authorizeCode = code;
        this.paypalToken(code);
      }

    
    /*
    
        let CLIENTID = 'AZmRj4HcRTwTtduwY6szT6ObAftuSeRjNzkXffGyXk8TsZvB5dwbT59swGUaaQMd6rbmPcOO_Obu8ufp';
        //CLIENTID = 'tom.vidolov-1_api1.gmail.com';  
    
        let SECRET = 'EHorRh9gHPc6HdpfjEr3XIzsFLOkWgTdd83o3_80Qo3HfZ_vei42bLy84-tsE9cWWbwP5UXozG1cN5uw';
        //SECRET = 'AF29Q7VMUG336NN2';
    
        var basicAuthString = btoa( CLIENTID+':'+SECRET );
        console.log( basicAuthString );
    
        let headers = new Headers();
        headers.append( 'Accept' , 'application/json' );
        headers.append( 'Content-Type' , 'application/x-www-form-urlencoded' );
        headers.append( 'Accept-Language' ,  'en_US' );
        headers.append( 'Authorization' , 'Basic ' + basicAuthString ); 
    
        let data = new URLSearchParams();
        data.append('grant_type', 'client_credentials');
    
        console.log( ' DATA : ', data );
    
        this.httpService.post( 'https://api.sandbox.paypal.com/v1/oauth2/token' , 
          data, { headers : headers } ).subscribe((data: any) => {
          console.log(" TOKEN : ", data);
          this.access_token = data.access_token
        });
      
    */

  }

  paypalToken = (code) => {
    this.httpService.post(
      "http://localhost:3000/api/paypal/tokeninfo", {
        code: code
      }).subscribe((data: any) => {
        console.log(" TOKENINFO : ", data );
        if ( data.tokeninfo.id_token ) this.paypalUser(data.tokeninfo.id_token);
      });
  };

  paypalUser = (token) => {
    this.httpService.post(
      "http://localhost:3000/api/paypal/user", {
        token: token
      }).subscribe((data: any) => {
        console.log(" USER : ", data );

      });
  }

  paypalLogin = () => {
    window.location.href = "https://www.sandbox.paypal.com/signin/authorize?client_id=AZmRj4HcRTwTtduwY6szT6ObAftuSeRjNzkXffGyXk8TsZvB5dwbT59swGUaaQMd6rbmPcOO_Obu8ufp&response_type=code&scope=openid&redirect_uri=http://localhost:4200/welcome" ;
  }

  paypalGet = () => {

    console.log(' paypalAccout ', this.paypalAccout);

    this.httpService.post(
      "http://localhost:3000/api/paypal/payout", {
        amount: 1,
        currency: "USD",
        email: this.paypalAccout,
        description: "payout",
        access_token: this.access_token
      }).subscribe((data: any) => {
        console.log(" PAYPAL : ", data);
        if (data.links && data.links[0]) {
          //window.location.href = data.links[0].href;
        }
      });

  }


}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { PaypalService } from "app/index";


@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss']
})
export class PayoutComponent {

  id: string = ''; 

  constructor( private activatedRoute: ActivatedRoute, private router: Router, public paypalService: PaypalService ) { 
  } 

  ngOnInit(){
     const sub = this.activatedRoute.params.subscribe(params => {
       this.id = params['id']; 
       console.log( 'ID : ' , this.id );
       if ( this.id == 'login' ) {
         this.paypalService.getAuthorizeUrl().subscribe((data)=>{});
       } 
       if( this.id == 'payout' ) {
         this.paypalService.authorizeCode = this.activatedRoute.snapshot.queryParams["code"];
         if ( !this.paypalService.authorizeCode ) {
           alert( " test - no authorizeCode " );
           this.router.navigate(['/paypal/login']);
         }
         this.paypalService.getUserInfo().subscribe((data)=>{
           if ( !this.paypalService.userinfo ) {
             alert( " test - no userinfo " );
             this.router.navigate(['/paypal/login']);
           }
         });;
       }
    });
  }

  login(){
    this.paypalService.login();
  }

  payout(amount: number) {
    console.log( amount , ' || ' , this.paypalService.userinfo );
    if( !amount || !this.paypalService.userinfo ) return;
    this.paypalService.payout(amount).subscribe( (data) => {
      console.log( data );
    });
  }




}
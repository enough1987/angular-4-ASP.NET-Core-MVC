import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { PaypalService } from "app/index";


@Component({
  selector: 'payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss']
})
export class PayoutComponent {

  id: string = ''; 

  constructor( private activatedRoute: ActivatedRoute, public paypalService: PaypalService ) { 
  } 

  ngOnInit(){
     const sub = this.activatedRoute.params.subscribe(params => {
       this.id = params['id']; 
       console.log( 'ID : ' , this.id );
       if ( this.id == 'login' ) {
         this.paypalService.getAuthorizeUrl().subscribe((data)=>{});
       } else if( this.id == 'payout' ) {
         this.paypalService.authorizeCode = this.activatedRoute.snapshot.queryParams["code"];
         this.paypalService.getUserInfo();
       }
    });
  }


}
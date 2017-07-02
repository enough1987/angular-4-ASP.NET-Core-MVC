import { Component, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


import { AuthService } from "app/index";


import { AuthNavType, AuthTemplateCase } from "app/index";


@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  secondViewOfHeader: boolean;


  constructor( public authService: AuthService ){
    console.log(" constructor AuthComponent ");
  }

  ngOnInit(){
  }

  changeSecondViewOfHeader($event){ 
    this.secondViewOfHeader = $event; 
  }



}

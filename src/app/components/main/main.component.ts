import { Component } from '@angular/core';


import { HttpService } from "app/index";


@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  stripeId: string = "";

  constructor(private httpService: HttpService ) {
    console.log(" constructor of main ");
  }

  ngOnInit() {
    this.stripeCreate();
  }

  stripeCreate(){
    this.httpService.get( "http://localhost:3000/api/stripe/create" ).subscribe((data:any) => {
      console.log( data );
      this.stripeId = data.id;
    }, (err) => {
      console.log( err );
    });
  }
  
  process(){
    console.log( " stripeId  ", this.stripeId );
    this.httpService.get( "http://localhost:3000/api/stripe/process?"+ "id="+this.stripeId ).subscribe((data:any) => {
      console.log( data );
      this.stripeId = data.id;
    }, (err) => {
      console.log( err );
    });
  }


}

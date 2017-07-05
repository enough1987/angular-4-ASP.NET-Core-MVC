import { Component } from '@angular/core';


import { HttpService } from "app/index";


@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  stripeId: string = "";
  private stripeServer: string = "http://ec2-52-59-169-152.eu-central-1.compute.amazonaws.com:3000";
  private stripeServerLocal: string = "http://localhost:3000";

  constructor(private httpService: HttpService) {
    console.log(" constructor of main ");
  }

  ngOnInit() {

    this.stripeCreate();
  }

  stripeCreate() {
    this.httpService.get(this.stripeServerLocal + "/api/stripe/create").subscribe((data: any) => {
      console.log(" create ", data);
      this.stripeId = data.id;
    }, (err) => {
      console.log(err);
    });
  }

  process() {
    console.log(" stripeId  ", this.stripeId);
    this.httpService.get(this.stripeServerLocal + "/api/stripe/process?" + "id=" + this.stripeId).subscribe((data: any) => {
      console.log(" process ", data);
      this.stripeId = data.id;
    }, (err) => {
      console.log(err);
    });
  }


}

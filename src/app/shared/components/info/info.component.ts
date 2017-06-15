import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

    constructor(private route: ActivatedRoute,){
    }

    ngOnInit(){
        // it uses for showing template 
        let id = this.route.snapshot.params['id'];
        console.log( " id ", id );
    }

}
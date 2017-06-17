import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {Location} from '@angular/common';


enum InfoTemplateCase {
    Terms,
    Policy
}


@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

    templateCase = InfoTemplateCase;
    templCase: InfoTemplateCase;

    constructor(private route: ActivatedRoute, private location: Location){
    }

    ngOnInit(){
        this.setTemplCase();
    }
 
    // set template for showing
    private setTemplCase(){
       let id = this.route.snapshot.params['id'];
       if (id === "terms") this.templCase = InfoTemplateCase.Terms;
       if (id === "policy") this.templCase = InfoTemplateCase.Policy;
    }
  
    // TODO : bug if we went to this page with link, redirect back, do we want redirect to spesial page?
    navBack(){
        this.location.back();
    }

}
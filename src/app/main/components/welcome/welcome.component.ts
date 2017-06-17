import { Component } from '@angular/core';


import { Observable } from "rxjs/Rx";


import { HttpService } from "app/shared";
import { RequestOptions } from "@angular/http";


@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {


  constructor(private httpService: HttpService) { 
    console.log(" constructor of welcome " );
  }

 // https://stackoverflow.com/questions/40214772/file-upload-in-angular-2
 fileFotoChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        this.httpService.post("assets/test.json", formData, headers)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
                data => console.log('success'),
                error => console.log(error)
            );
    }
}
  


}
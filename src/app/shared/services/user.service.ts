
import { Injectable } from '@angular/core';


import { HttpService } from "./http.service";
import { Observable } from "rxjs/Observable";


@Injectable()
export class UserService {

    private static instance: UserService; // instance of Singleton 

    constructor(private httpService : HttpService){
        return UserService.instance ? UserService.instance : this;
    }

    // https://stackoverflow.com/questions/40214772/file-upload-in-angular-2
    changeFoto(event){
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            let formData:FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            let headers = new Headers();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');
            return this.httpService.post("assets/test.json", formData, headers);
        }
    }

}
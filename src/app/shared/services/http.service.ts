import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpService {

    constructor(private http: Http) { }

    get(url:string):Observable<Response> {
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    post(url:string, body:any):Observable<Response> {
        return this.http.post(url, body)
            .map(this.extractData)
            .catch(this.handleError);
    }

    put(url:string, body:any):Observable<Response> {
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(url:string):Observable<Response> {
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response):any {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any):Observable<Response> {
        console.error(error);
        return Observable.throw(" my error ");
    }

}
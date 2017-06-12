import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    get(url:string):Observable<Response> {
        return this.http.get( url, this.headers )
            .map(this.extractData)
            .catch(this.handleError);
    }

    post(url:string, body:any):Observable<Response> {
        return this.http.post( url, body, this.headers )
            .map(this.extractData)
            .catch(this.handleError);
    }

    put(url:string, body:any):Observable<Response> {
        return this.http.put( url, body, this.headers )
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(url:string):Observable<Response> {
        return this.http.delete( url, this.headers )
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response | any):any {
        console.log( " extractData ", res );
        let data = JSON.parse(res._body);
        return data || {};
    }

    private handleError(error: Response | any):Observable<Response> {
        console.error(error);
        return Observable.throw(" my error ");
    }

}
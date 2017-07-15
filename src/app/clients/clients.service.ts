import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as G from './../app.globals';

@Injectable()
export class ClientsService {
    private url = G.SERVER_API_URl_PREFIX+'/clients';

    constructor(private _http: Http) {}

    findAll(){
        console.log(this.url);
        return this._http.get(this.url)
                .map(res => res.json());
    }

    createNewClient(client){
        console.log('sending...');
        return this._http.post(this.url+'/new', JSON.stringify(client))
                .map(res => res.json());
    }
}
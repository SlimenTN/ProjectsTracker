import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as G from './../app.globals';

@Injectable()
export class ProjectsTypesService {
    private url = G.SERVER_API_URl_PREFIX+'/projects-types';

    constructor(private _http: Http) {}

    findAll(){
        return this._http.get(this.url)
                .map(res => res.json());
    }
}
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as G from './../app.globals';
import {ObjectCrud} from "../interfaces/object-crud.interface";

@Injectable()
export class ProjectsTypesService implements ObjectCrud {
  private url = G.SERVER_API_URl_PREFIX + '/projects-types';

  constructor(private _http: Http) {
  }

  findAll() {
    return this._http.get(this.url)
      .map(res => res.json());
  }

  create(object) {
    return this._http.post(this.url + '/new', JSON.stringify(object))
      .map(res => res.json());
  }

  update(object, identifier) {
    return this._http.post(this.url + '/update/' + identifier, JSON.stringify(object))
      .map(res => res.json());
  }

  deleteObject(identifier) {
    return this._http.get(this.url + '/delete/' + identifier)
      .map(res => res.json());
  }

  find(identifier) {
    return this._http.get(this.url + '/find/' + identifier)
      .map(res => res.json());
  }
}

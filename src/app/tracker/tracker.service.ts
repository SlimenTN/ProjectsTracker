import {Injectable} from '@angular/core';
import * as G from '../app.globals';
import {ObjectCrud} from "../interfaces/object-crud.interface";
import {Http} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable()
export class TrackerService implements ObjectCrud {
  private url = G.SERVER_API_URl_PREFIX+'/interventions';

  constructor(private _http: Http, private _authService: AuthenticationService) {
  }

  findAll() {

    return this._http.get(this.url + '/find-by-user/' + this._authService.getUser().id)
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

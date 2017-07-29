import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as G from './../app.globals';

@Injectable()
export class ClientsService {
  private url = G.SERVER_API_URl_PREFIX + '/clients';

  constructor(private _http: Http) {
  }

  findAll() {
    console.log(this.url);
    return this._http.get(this.url)
      .map(res => res.json());
  }

  createNewClient(client) {
    console.log('sending...');
    return this._http.post(this.url + '/new', JSON.stringify(client))
      .map(res => res.json());
  }

  deleteClient(client) {
    return this._http.get(this.url + '/delete/' + client.id)
      .map(res => res.json());
  }

  findClient(id) {
    return this._http.get(this.url + '/find/' + id)
      .map(res => res.json());
  }

  updateClient(client) {
    return this._http.post(this.url + '/update/' + client.id, JSON.stringify(client))
      .map(res => res.json());
  }
}

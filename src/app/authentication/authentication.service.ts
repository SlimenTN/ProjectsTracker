
import {Injectable} from "@angular/core";
import * as G from '../app.globals';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService{
  private url = G.SERVER_API_URl_PREFIX + '/authentication';

  constructor(private _http: Http){}

  authenticate(credentials){
    console.log('authentication...');
    return this._http.post(this.url, JSON.stringify(credentials))
      .map(res => res.json());
  }

  isUserLogged(){
    console.log('checking');
    return (localStorage.getItem('user') != null);
  }

  logout(){
    localStorage.removeItem('user');
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user'));
  }
}

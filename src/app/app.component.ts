import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./authentication/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  userLogged = false;

  constructor(private _authService: AuthenticationService){}

  ngOnInit(): void {
    this.userLogged = this._authService.isUserLogged();
  }
}

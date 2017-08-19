
import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../authentication/authentication.service";

@Component({
  selector: 'app-container',
  templateUrl: 'container.component.html',
})
export class ContainerComponent implements OnInit{
  user: string = null;
  constructor(private _authService: AuthenticationService){}

  ngOnInit(): void {
    this.user = this._authService.getUser();
  }

  logout(){
    this._authService.logout();
    window.location.href = '/';
  }
}

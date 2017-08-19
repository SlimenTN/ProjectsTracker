
import {Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit{
  form: FormGroup;
  invalidLogin: boolean = false;
  successLogin: boolean = false;
  @ViewChild('btnSubmit') btn;

  constructor(private fb: FormBuilder, private service: AuthenticationService, private _router: Router){}

  ngOnInit(): void {
    this.checkUser();
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required,
      ])],
    });
  }

  checkUser(){
    if(this.service.isUserLogged()) window.location.href = '/traqueur';
  }

  login(){
    this.invalidLogin = false;
    this.btn.nativeElement.innerText = 'Authentification en cours...';
    this.btn.nativeElement.disabled = true;
    this.service.authenticate(this.form.value).subscribe(response => {
      if(response.status == '200'){
        console.log(response);
        if(response.content == null){
          this.invalidLogin = true;
        }else{
          this.successLogin = true;
          localStorage.setItem('user', JSON.stringify(response.content));
          // this._router.navigate(['/traqueur']);
          window.location.href = '/traqueur';
        }
      }else{
        alert(response.content);
      }
      this.btn.nativeElement.innerText = 'Se connecter';
      this.btn.nativeElement.disabled = false;
    })
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ClientsService} from './clients.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  providers: [ClientsService]
})

export class ClientFormComponent implements OnInit {
  form: FormGroup;
  title: string;
  id: number = null;
  @ViewChild('btnSubmit') btn;

  constructor(private fb: FormBuilder,
              private _router: Router,
              private _service: ClientsService,
              private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      denomination: ['', Validators.compose([
        Validators.required
      ])],
      activity: ['', Validators.compose([
        Validators.required,
      ])],
      phone: ['', Validators.compose([
        Validators.required,
      ])],
      address: [],
    });

    this._activatedRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id !== undefined) {
        this.id = id;
        this.title = 'Modification';
        this._service.findClient(this.id).subscribe(client => {
          // console.log('client of id ' + id + ': ', client);
          delete client.id;
          console.log('client after deleting id ' + this.id + ': ', client);
          this.form.setValue(client);
        })
      } else {
        this.title = 'Ajout d\'un nouveau client';
      }
    });
  }

  postClient() {
    const client = this.form.value;
    this.btn.nativeElement.innerText = 'Sauvegarde en cours...';
    this.btn.nativeElement.disabled = true;
    if (this.id == null) {
      this._service.createNewClient(client).subscribe(response => {
        if (response.persisted) {
          this._router.navigate(['/clients']);
          // this.btn.nativeElement.disabled = false;
        }
      });
    }else{
      console.log('updating..');
      client.id = this.id;
      this._service.updateClient(client).subscribe(response => {
        console.log(response);
        if (response.persisted) {
          this._router.navigate(['/clients']);
          // this.btn.nativeElement.disabled = false;
        }else{
          alert(response.message);
        }
      });
    }
  }
}

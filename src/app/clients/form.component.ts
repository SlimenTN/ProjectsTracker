import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ClientsService } from './clients.service';

@Component({
    selector: 'client-form',
    templateUrl: './client-form.component.html',
    providers: [ClientsService]
})

export class ClientFormComponent implements OnInit {
    form: FormGroup;
    title: string;
    @ViewChild('btnSubmit') btn;
    constructor(
        private fb: FormBuilder, 
        private _router: Router, 
        private _service: ClientsService, 
        private _activatedRoute: ActivatedRoute
    ) { }

    ngAfterViewInit() {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        console.log(this.btn);
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
            let id = params['id'];
            if(id !== undefined){
                this.title = 'Modification';
            }else{
                this.title = "Ajout d'un nouveau client";
            }
                
            console.log(id);
        })
    }

    createClient(){
        var client = this.form.value;
        this.btn.nativeElement.innerText = 'Sauvegarde en cours...';
        this.btn.nativeElement.disabled = true;
        this._service.createNewClient(client).subscribe(response => {
            if(response.persisted){
                this._router.navigate(['/clients']);
                // this.btn.nativeElement.disabled = false;
            }
        });
    }
}
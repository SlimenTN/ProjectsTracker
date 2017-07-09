import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';

@Component({
    selector: 'clients',
    templateUrl: './clients.component.html',
    providers: [ClientsService]
})

export class ClientsComponent implements OnInit {
    clients: any[] = [];
    constructor(private _service: ClientsService) { }

    ngOnInit() { 
        this.clients = this._service.findAll();
    }

}
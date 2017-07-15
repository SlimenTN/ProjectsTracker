import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';

@Component({
    selector: 'clients',
    templateUrl: './clients.component.html',
    providers: [ClientsService]
})

export class ClientsComponent implements OnInit {
    clients: any[] = [];
    isLoading = false;
    constructor(private _service: ClientsService) { }

    ngOnInit() { 
        this.isLoading = true;
        this._service.findAll().subscribe(clients => {
                this.isLoading = false;
                this.clients = clients;
            });
    }

}
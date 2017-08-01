import {Component, OnInit} from '@angular/core';
import {ClientsService} from './clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  providers: [ClientsService]
})

export class ClientsComponent implements OnInit {
  clients: any[] = [];
  isLoading = false;

  constructor(private _service: ClientsService) {
  }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.isLoading = true;
    this._service.findAll().subscribe(clients => {
      this.isLoading = false;
      this.clients = clients;
    });
  }

  deleteClient(client) {
    console.log('before deleting: ', client);
    const confirm = window.confirm('Confirmez-vous la suppression du client "' + client.denomination + '" ?');
    if (confirm) {
      this._service.deleteClient(client)
        .subscribe(response => {
          if (response.deleted) {
            this.clients = [];
            this.loadClients();
          } else {
            alert('Erreur: ' + response.message);
          }
        });
    }
  }

}

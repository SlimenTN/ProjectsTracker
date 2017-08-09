import { Component, OnInit } from '@angular/core';
import { TrackerService } from './tracker.service';

@Component({
    selector: 'tracker',
    templateUrl: './tracker.component.html',
    providers: [TrackerService]
})

export class TrackerComponent implements OnInit {
    list: any[] = [];
    isLoading: boolean = true;
    errorMsg: string = null;

    constructor(private _service: TrackerService) { }

    ngOnInit() {
      this.loadInterventions();
    }

    loadInterventions(): void{
      this.isLoading = true;
      this._service.findAll().subscribe(list => {
        this.isLoading = false;
        this.list = list;
      });
    }

  deleteIntervention(intervention){
    const confirm = window.confirm('Confirmez-vous la suppression cette intervention ?');
    if (confirm) {
      this._service.deleteObject(intervention.id)
        .subscribe(response => {
          console.log(response);
          if (response.deleted) {
            this.list = [];
            this.loadInterventions();
          } else {
            this.errorMsg = '<strong>Erreur lors de supression:</strong><br>' + response.message;
          }
        });
    }
  }

}

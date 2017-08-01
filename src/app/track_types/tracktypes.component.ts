import {Component, OnInit} from '@angular/core';
import {TrackTypesService} from './tracktypes.service';

@Component({
  selector: 'track-types',
  templateUrl: './tracktypes.component.html',
  providers: [TrackTypesService]
})

export class TrackTypesComponent implements OnInit {
  types: any[] = [];
  isLoading = false;
  errorMsg: string = null;

  constructor(private _service: TrackTypesService) {
  }

  ngOnInit() {
    this.loadTypes();
  }

  loadTypes(): void {
    this.isLoading = true;
    this.errorMsg = null;
    this._service.findAll().subscribe(types => {
      this.isLoading = false;
      this.types = types;
    });
  }

  deleteType(type) {
    const confirm = window.confirm('Confirmez-vous la suppression du type "' + type.title + '" ?');
    if (confirm) {
      this._service.deleteObject(type.id)
        .subscribe(response => {
          console.log(response);
          if (response.removed) {
            this.types = [];
            this.loadTypes();
          } else {
            this.errorMsg = '<strong>Erreur lors de supression:</strong><br>' + response.message;
          }
        });
    }
  }
}

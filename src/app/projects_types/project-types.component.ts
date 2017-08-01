import { Component, OnInit } from '@angular/core';
import { ProjectsTypesService } from './projects-types.service';

@Component({
    selector: 'projects-types',
    templateUrl: './projects-types.component.html',
    providers: [ProjectsTypesService]
})

export class ProjectsTypesComponent implements OnInit {
    types: any[] = [];
    isLoading = false;
    errorMsg: string = null;
    constructor(private _service: ProjectsTypesService) { }

    ngOnInit() {
        this.loadTypes();
    }

    loadTypes(): void{
      this.isLoading = true;
      this.errorMsg = null;
      this._service.findAll().subscribe(types => {
        this.isLoading = false;
        this.types = types;
      });
    }

    deleteType(type){
      const confirm = window.confirm('Confirmez-vous la suppression du type "' + type.title + '" ?');
      if (confirm) {
        this._service.deleteObject(type.id)
          .subscribe(response => {
            console.log(response);
            if (response.removed) {
              this.types = [];
              this.loadTypes();
            } else {
              this.errorMsg = '<strong>Erreur lors de supression:</strong><br>'+response.message;
            }
          });
      }
    }
}

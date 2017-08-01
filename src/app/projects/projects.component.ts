import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';

@Component({
    selector: 'projects',
    templateUrl: './projects.component.html',
    providers: [ProjectsService],
})

export class ProjectsComponent implements OnInit {
    projects: any[] = [];
    isLoading = false;
    constructor(private _service: ProjectsService) { }

    ngOnInit() {
        this.loadProject();
    }

    loadProject(){
      this.isLoading = true;
      this._service.findAll().subscribe(projects =>{
        this.isLoading = false;
        console.log(projects);
        this.projects = projects;
      }) ;
    }

    deleteProject(project){

      const confirm = window.confirm('Confirmez-vous la suppression du projet "' + project.title + '" ?');
      if (confirm) {
        this._service.deleteObject(project.id)
          .subscribe(response => {
            console.log(response);
            if (response.deleted) {
              this.projects = [];
              this.loadProject();
            } else {
              alert('Erreur: ' + response.message);
            }
          });
      }
    }

}

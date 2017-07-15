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
        this.isLoading = true;
        this._service.findAll().subscribe(projects =>{
            this.isLoading = false;
            console.log(projects);
            this.projects = projects;
        }) ;
    }

}
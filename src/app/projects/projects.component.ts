import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';

@Component({
    selector: 'projects',
    templateUrl: './projects.component.html',
    providers: [ProjectsService],
})

export class ProjectsComponent implements OnInit {
    projects: any[] = [];
    constructor(private _service: ProjectsService) { }

    ngOnInit() { 
        this.projects = this._service.findAll();
    }

}
import { Component, OnInit } from '@angular/core';
import { ProjectsTypesService } from './projects-types.service';

@Component({
    selector: 'projects-types',
    templateUrl: './projects-types.component.html',
    providers: [ProjectsTypesService]
})

export class ProjectsTypesComponent implements OnInit {
    types: any[] = [];
    constructor(private _service: ProjectsTypesService) { }

    ngOnInit() { 
        this.types = this._service.findAll();
    }    
}
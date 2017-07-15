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
    constructor(private _service: ProjectsTypesService) { }

    ngOnInit() { 
        this.isLoading = true;
        this._service.findAll().subscribe(types => {
            this.isLoading = false;
            this.types = types;
        });
    }    
}
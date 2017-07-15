import { Component, OnInit } from '@angular/core';
import { TrackTypesService } from './tracktypes.service';

@Component({
    selector: 'track-types',
    templateUrl: './tracktypes.component.html',
    providers: [TrackTypesService]
})

export class TrackTypesComponent implements OnInit {
    types: any[] = [];
    isLoading = false;

    constructor(private _service: TrackTypesService) { }

    ngOnInit() { 
        this.isLoading = true;
        this._service.findAll().subscribe(types => {
            this.isLoading = false;
            this.types = types;
        });
    }    
}
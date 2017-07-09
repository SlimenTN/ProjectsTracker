import { Component, OnInit } from '@angular/core';
import { TrackerService } from './/tracker.service';

@Component({
    selector: 'tracker',
    templateUrl: './tracker.component.html',
    providers: [TrackerService]
})

export class TrackerComponent implements OnInit {
    list: any[] = [];
    constructor(private _service: TrackerService) { }

    ngOnInit() {
        this.list = this._service.findAll();
    }

}
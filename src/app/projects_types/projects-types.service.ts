import { Injectable } from '@angular/core';

@Injectable()
export class ProjectsTypesService {
    findAll(){
        return [
            {
                id: 1,
                title: 'Site web'
            },
            {
                id: 2,
                title: 'Application web'
            },
            {
                id: 3,
                title: 'Application de bureau'
            },
        ];
    }
}
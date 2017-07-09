import { Injectable } from '@angular/core';

@Injectable()
export class ProjectsService {
    findAll(){
        return [
            {
                id: 1,
                title: 'Site web green-duck.tn',
                description: 'Site web pour notre client Green duck'
            },
            {
                id: 2,
                title: 'Site web stram.tn',
                description: 'Site web pour notre STRAM'
            },
            {
                id: 3,
                title: 'Milano Dmcc',
                description: 'Application web "Gestion commerciale" pour notre client Milano DMCC'
            },
            {
                id: 4,
                title: 'Site web somcas.tn',
                description: 'Site web pour notre client SOAMCS'
            },
            {
                id: 5,
                title: 'Application SAV',
                description: 'Application web de service après vente pour notre client SOAMCS'
            },
        ];
    }
}